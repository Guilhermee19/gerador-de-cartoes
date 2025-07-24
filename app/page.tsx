"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookForm } from "@/components/book-form";
import { FileUpload } from "@/components/file-upload";
import { BookList } from "@/components/book-list";
import { BookOpen, Upload, List } from "lucide-react";

export interface Book {
  id: string;
  pages: string;
  format: string;
  weight: string;
  publisher: string;
  finish: string;
  isbn: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (book: Omit<Book, "id">) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const addBooks = (newBooks: Omit<Book, "id">[]) => {
    const booksWithIds = newBooks.map((book) => ({
      ...book,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }));
    setBooks((prev) => [...prev, ...booksWithIds]);
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gerador de Cards de Livros
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crie cards profissionais com detalhes de livros. Adicione
            informações manualmente ou importe uma planilha e baixe os cards
            individualmente.
          </p>
        </div>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Adicionar Manual
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar Planilha
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lista de Livros ({books.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Livro Manualmente</CardTitle>
                <CardDescription>
                  Preencha os campos abaixo para adicionar um novo livro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookForm onSubmit={addBook} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Importar Planilha</CardTitle>
                <CardDescription>
                  Faça upload de um arquivo CSV ou Excel com os dados dos
                  livros. As colunas devem ser: páginas, editora,
                  data_publicacao, dimensoes, isbn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onBooksImported={addBooks} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <BookList books={books} onRemoveBook={removeBook} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
