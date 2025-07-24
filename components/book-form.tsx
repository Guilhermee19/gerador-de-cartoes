"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Book } from "@/app/page";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
}

export function BookForm({ onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    pages: "",
    format: "",
    weight: "",
    publisher: "",
    finish: "",
    isbn: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every((value) => value.trim())) {
      onSubmit(formData);
      setFormData({
        pages: "",
        format: "",
        weight: "",
        publisher: "",
        finish: "",
        isbn: "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pages">Número de Páginas</Label>
          <Input
            id="pages"
            placeholder="Ex: 560"
            value={formData.pages}
            onChange={(e) => handleChange("pages", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Formato</Label>
          <Input
            id="format"
            placeholder="Ex: 23 x 16 x 4 cm"
            value={formData.format}
            onChange={(e) => handleChange("format", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Peso</Label>
          <Input
            id="weight"
            placeholder="Ex: 750g"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
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
          <Label htmlFor="finish">Acabamento</Label>
          <Input
            id="finish"
            placeholder="Ex: Capa comum"
            value={formData.finish}
            onChange={(e) => handleChange("finish", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            placeholder="Ex: 9786584522152"
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
  );
}
