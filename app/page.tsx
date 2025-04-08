"use client"
import { NavEditor } from "@/components/nav-editor"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Navigation Editor</h1>
      <NavEditor />
    </main>
  )
}
