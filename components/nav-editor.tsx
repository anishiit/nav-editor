"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

import { Button } from "@/components/ui/button"
import { AddMenuItemDialog } from "@/components/add-menu-item-dialog"
import { SortableMenuItem } from "@/components/sortable-menu-item"

export type MenuItem = {
  id: string
  label: string
  url: string
}

export function NavEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", label: "Home", url: "/" },
    { id: "2", label: "About", url: "/about" },
    { id: "3", label: "Services", url: "/services" },
    { id: "4", label: "Contact", url: "/contact" },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  function handleAddMenuItem(newItem: Omit<MenuItem, "id">) {
    setMenuItems([...menuItems, { ...newItem, id: crypto.randomUUID() }])
    setIsDialogOpen(false)
  }

  function handleDeleteMenuItem(id: string) {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Navigation Menu</h2>
        <div className="text-sm text-muted-foreground">Drag items to rearrange</div>
      </div>

      <div className="flex items-center gap-1 p-2 bg-muted/40 rounded-md overflow-x-auto">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={menuItems.map((item) => item.id)} strategy={horizontalListSortingStrategy}>
            {menuItems.map((item) => (
              <SortableMenuItem
                key={item.id}
                id={item.id}
                label={item.label}
                onDelete={() => handleDeleteMenuItem(item.id)}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 ml-1 whitespace-nowrap"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      <AddMenuItemDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAdd={handleAddMenuItem} />

      <div className="mt-8">
        <h3 className="text-md font-medium mb-2">Preview:</h3>
        <nav className="flex items-center gap-4 p-4 bg-gray-100 rounded-md">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="text-sm font-medium hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
