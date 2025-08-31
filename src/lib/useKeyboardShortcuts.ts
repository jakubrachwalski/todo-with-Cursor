import { useEffect } from 'react'

interface KeyboardShortcutsProps {
  onAddTodo?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts({ onAddTodo, onEscape }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter to add todo
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        onAddTodo?.()
      }
      
      // Escape key
      if (event.key === 'Escape') {
        onEscape?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onAddTodo, onEscape])
}
