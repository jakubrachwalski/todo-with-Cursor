"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, AlertCircle } from "lucide-react"
import { useTodos } from "@/lib/useTodos"
import { TodoItem } from "@/components/TodoItem"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useKeyboardShortcuts } from "@/lib/useKeyboardShortcuts"

export default function TodoApp() {
  const [newTodo, setNewTodo] = useState("")
  const { todos, loading, error, addTodo, updateTodo, toggleComplete, deleteTodo, isFirebaseAvailable } = useTodos()

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo)
      setNewTodo("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onAddTodo: handleAddTodo,
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Todo List App</h1>
          <p className="text-center mt-2 text-primary-foreground/80">
            Stay organized and get things done with Firebase
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Firebase Status */}
          {!isFirebaseAvailable && (
            <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>Firebase not configured - using local storage. See FIREBASE_SETUP.md for setup instructions.</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Todo Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Task
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Press Enter to add, or Ctrl+Enter from anywhere
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  id="new-todo-input"
                  name="newTodo"
                  placeholder="Enter a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={loading}
                />
                <Button 
                  onClick={handleAddTodo} 
                  disabled={!newTodo.trim() || loading}
                >
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {totalCount > 0 && (
            <div className="text-center text-muted-foreground">
              <p>
                {completedCount} of {totalCount} tasks completed
                {completedCount === totalCount && totalCount > 0 && " 🎉"}
              </p>
            </div>
          )}

          {/* Todo List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingSpinner />
              ) : todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleComplete}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-4 px-4 mt-auto">
        <div className="max-w-2xl mx-auto text-center text-muted-foreground">
          <p>Built with Next.js, React & Firebase • Stay productive!</p>
        </div>
      </footer>
    </div>
  )
}
