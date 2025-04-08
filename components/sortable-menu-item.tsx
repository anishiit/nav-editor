"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SortableMenuItemProps {
  id: string
  label: string
  onDelete: () => void
}

export function SortableMenuItem({ id, label, onDelete }: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 bg-white rounded-md border px-3 py-1.5 text-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span>{label}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 ml-1 text-muted-foreground hover:text-foreground"
        onClick={onDelete}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
