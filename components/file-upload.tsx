"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle } from "lucide-react";
import type { Book } from "@/app/page";

interface FileUploadProps {
  onBooksImported: (books: Omit<Book, "id">[]) => void;
}

export function FileUpload({ onBooksImported }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const processCSV = (text: string): Omit<Book, "id">[] => {
    const lines = text.split("\n").filter((line) => line.trim());

    // Detecta se usa ponto e vírgula ou vírgula como separador
    const separator = lines[0].includes(";") ? ";" : ",";
    const headers = lines[0]
      .split(separator)
      .map((h) => h.trim().toLowerCase());

    const books: Omit<Book, "id">[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(separator).map((v) => v.trim());
      if (values.length >= 6) {
        books.push({
          pages: values[0] || "",
          format: values[1] || "",
          weight: values[2] || "",
          publisher: values[3] || "",
          finish: values[4] || "",
          isbn: values[5] || "",
        });
      }
    }

    return books;
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const text = await file.text();
      const books = processCSV(text);

      if (books.length === 0) {
        throw new Error("Nenhum livro válido encontrado no arquivo");
      }

      onBooksImported(books);
      setFile(null);

      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar arquivo"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `Páginas;Formato;Peso;Editora;Acabamento;ISBN
560;23 x 16 x 4 cm;750g;EDITORA CARISMA;Capa comum;9786584522152
320;21 x 14 x 2 cm;480g;EDITORA EXEMPLO;Capa dura;9781234567890
450;25 x 18 x 3 cm;620g;EDITORA TESTE;Brochura;9780987654321`;

    // Adiciona BOM para UTF-8 para melhor compatibilidade com Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template-livros.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Selecionar Arquivo CSV</Label>
          <Input
            id="file-upload"
            type="file"
            accept=".csv,.txt"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">{file.name}</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleUpload}
          disabled={!file || isProcessing}
          className="flex-1"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? "Processando..." : "Importar Livros"}
        </Button>

        <Button variant="outline" onClick={downloadTemplate}>
          Baixar Template
        </Button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Formato esperado do CSV:</strong>
        </p>
        <p>
          O arquivo deve ter 6 colunas: Páginas, Formato, Peso, Editora,
          Acabamento, ISBN
        </p>
        <p>
          Baixe o template para ver o formato correto com exemplos organizados
          em colunas
        </p>
      </div>
    </div>
  );
}
