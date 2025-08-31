import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any;
  updatedAt: any;
}

// Local storage fallback when Firebase is not configured
const LOCAL_STORAGE_KEY = 'todos-app-data';

// Utility function to clear corrupted localStorage data
const clearCorruptedStorage = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored && stored !== 'null' && stored !== 'undefined') {
      // Try to parse the stored data
      try {
        const parsed = JSON.parse(stored);
        // If it's not an array, clear it
        if (!Array.isArray(parsed)) {
          console.warn('Clearing corrupted localStorage data (not an array)');
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (parseError) {
        console.warn('Clearing corrupted localStorage data (invalid JSON)');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  } catch (error) {
    console.error('Error checking localStorage:', error);
  }
};

// Clear any corrupted data on module load
clearCorruptedStorage();

const getLocalTodos = (): Todo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored || stored === 'null' || stored === 'undefined') return [];
    
    // Validate that the stored data is a valid JSON string
    if (typeof stored !== 'string') {
      console.warn('Invalid data type in localStorage, clearing...');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    }
    
    const parsed = JSON.parse(stored);
    
    // Validate that parsed data is an array
    if (!Array.isArray(parsed)) {
      console.warn('Invalid data structure in localStorage, clearing...');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    }
    
    // Convert date strings back to Date objects
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: todo.createdAt ? new Date(todo.createdAt) : null,
      updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : null
    }));
  } catch (error) {
    console.error('Failed to parse JSON from localStorage:', error);
    // Clear corrupted data
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (clearError) {
      console.error('Failed to clear localStorage:', clearError);
    }
    return [];
  }
};

const setLocalTodos = (todos: Todo[]) => {
  if (typeof window === 'undefined') return;
  
  // Additional validation to ensure todos is an array
  if (!Array.isArray(todos)) {
    console.error('Invalid todos data: expected array, got', typeof todos);
    return;
  }
  
  try {
    // Convert Date objects to ISO strings for storage
    const serializedTodos = todos.map(todo => {
      // Validate each todo object
      if (!todo || typeof todo !== 'object') {
        console.warn('Invalid todo object:', todo);
        return null;
      }
      
      return {
        ...todo,
        createdAt: todo.createdAt ? (todo.createdAt instanceof Date ? todo.createdAt.toISOString() : String(todo.createdAt)) : null,
        updatedAt: todo.updatedAt ? (todo.updatedAt instanceof Date ? todo.updatedAt.toISOString() : String(todo.updatedAt)) : null
      };
    }).filter(Boolean); // Remove any null entries
    
    // Double-check that we have valid data before stringifying
    if (!Array.isArray(serializedTodos)) {
      console.error('Failed to serialize todos: result is not an array');
      return;
    }
    
    const jsonString = JSON.stringify(serializedTodos);
    
    // Validate the JSON string before storing
    if (typeof jsonString !== 'string') {
      console.error('JSON.stringify failed: result is not a string');
      return;
    }
    
    // Test parse to ensure it's valid JSON
    try {
      JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Generated invalid JSON:', parseError);
      return;
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseAvailable, setIsFirebaseAvailable] = useState(false);

  // Check if Firebase is available
  useEffect(() => {
    setIsFirebaseAvailable(!!db);
  }, []);

  // Subscribe to todos collection or use local storage
  useEffect(() => {
    if (!isFirebaseAvailable) {
      // Use local storage fallback
      const localTodos = getLocalTodos();
      setTodos(localTodos);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const todosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Todo[];
        setTodos(todosData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isFirebaseAvailable]);

  // Add new todo
  const addTodo = async (text: string) => {
    try {
      setError(null);
      
      if (!isFirebaseAvailable) {
        // Use local storage
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        setLocalTodos(updatedTodos);
        return;
      }

      await addDoc(collection(db, 'todos'), {
        text: text.trim(),
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
    }
  };

  // Update todo
  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      setError(null);
      
      if (!isFirebaseAvailable) {
        // Use local storage
        const updatedTodos = todos.map(todo => 
          todo.id === id 
            ? { ...todo, ...updates, updatedAt: new Date() }
            : todo
        );
        setTodos(updatedTodos);
        setLocalTodos(updatedTodos);
        return;
      }

      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    }
  };

  // Toggle todo completion
  const toggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      
      if (!isFirebaseAvailable) {
        // Use local storage
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        setLocalTodos(updatedTodos);
        return;
      }

      await deleteDoc(doc(db, 'todos', id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
    isFirebaseAvailable
  };
}
