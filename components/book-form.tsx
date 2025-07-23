"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Book } from "@/app/page"

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void
}

export function BookForm({ onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    pages: "",
    publisher: "",
    publicationDate: "",
    dimensions: "",
    isbn: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).every((value) => value.trim())) {
      onSubmit(formData)
      setFormData({
        pages: "",
        publisher: "",
        publicationDate: "",
        dimensions: "",
        isbn: "",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pages">Número de Páginas</Label>
          <Input
            id="pages"
            placeholder="Ex: 560 páginas"
            value={formData.pages}
            onChange={(e) => handleChange("pages", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher">Editora</Label>
          <Input
            id="publisher"
            placeholder="Ex: EDITORA CARISMA"
            value={formData.publisher}
            onChange={(e) => handleChange("publisher", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publicationDate">Data da Publicação</Label>
          <Input
            id="publicationDate"
            placeholder="Ex: 10 dezembro 2024"
            value={formData.publicationDate}
            onChange={(e) => handleChange("publicationDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dimensions">Dimensões</Label>
          <Input
            id="dimensions"
            placeholder="Ex: 23 x 16 x 4 cm"
            value={formData.dimensions}
            onChange={(e) => handleChange("dimensions", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="isbn">ISBN-13</Label>
          <Input
            id="isbn"
            placeholder="Ex: 978-6584522152"
            value={formData.isbn}
            onChange={(e) => handleChange("isbn", e.target.value)}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Adicionar Livro
      </Button>
    </form>
  )
}
