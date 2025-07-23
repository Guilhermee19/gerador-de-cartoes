"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, BookOpen, Building, Calendar, Ruler, Hash } from "lucide-react"
import type { Book } from "@/app/page"
import { BookCard } from "./book-card"

interface BookListProps {
  books: Book[]
  onRemoveBook: (id: string) => void
}

export function BookList({ books, onRemoveBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum livro cadastrado</h3>
          <p className="text-gray-600 text-center">Adicione livros manualmente ou importe uma planilha para começar</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Livros Cadastrados</h2>
        <Badge variant="secondary" className="text-sm">
          {books.length} {books.length === 1 ? "livro" : "livros"}
        </Badge>
      </div>

      <div className="grid gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Detalhes do Livro</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => onRemoveBook(book.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Número de páginas</p>
                      <p className="font-semibold">{book.pages}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Editora</p>
                      <p className="font-semibold">{book.publisher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Data da publicação</p>
                      <p className="font-semibold">{book.publicationDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Dimensões</p>
                      <p className="font-semibold">{book.dimensions}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">ISBN-13</p>
                      <p className="font-semibold">{book.isbn}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <BookCard book={book} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
