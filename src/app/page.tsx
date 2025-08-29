"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2, Check, X, Plus } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ])
      setNewTodo("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() && editingId) {
      setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editingText.trim() } : todo)))
      setEditingId(null)
      setEditingText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Todo List App</h1>
          <p className="text-center mt-2 text-primary-foreground/80">Stay organized and get things done</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Add Todo Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTodo()}
                  className="flex-1"
                />
                <Button onClick={addTodo} disabled={!newTodo.trim()}>
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
              {todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        todo.completed ? "bg-muted/50" : "bg-card"
                      }`}
                    >
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          todo.completed
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground hover:border-primary"
                        }`}
                      >
                        {todo.completed && <Check className="h-3 w-3" />}
                      </button>

                      {editingId === todo.id ? (
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={saveEdit}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span
                            className={`flex-1 ${
                              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {todo.text}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => startEditing(todo.id, todo.text)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
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
          <p>Built with React & Next.js • Stay productive!</p>
        </div>
      </footer>
    </div>
  )
}
