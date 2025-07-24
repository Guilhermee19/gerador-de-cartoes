"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Book } from "@/app/page";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCard();
  }, [book]);

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const drawCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to 1143x1650 (increased height for 6 fields)
    canvas.width = 1143;
    canvas.height = 1650;

    // Clear canvas with light gray background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load all icons
    try {
      const [
        pagesIcon,
        formatIcon,
        weightIcon,
        publisherIcon,
        finishIcon,
        barcodeIcon,
      ] = await Promise.all([
        loadImage("icons/book-open.png"),
        loadImage("icons/reading.png"),
        loadImage("icons/gallery-vertical-end.png"),
        loadImage("icons/buildings.png"),
        loadImage("icons/book-bookmark.png"),
        loadImage("icons/barcode.png"),
      ]);

      // Title - scaled proportionally
      ctx.font = "bold 92px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "left";
      ctx.fillText("Detalhes do livro", 114, 230);

      let yPosition = 380;

      // Draw each field with its icon
      const fields = [
        { icon: pagesIcon, label: "Número de páginas", value: book.pages },
        { icon: formatIcon, label: "Formato", value: book.format },
        { icon: weightIcon, label: "Peso", value: book.weight },
        { icon: publisherIcon, label: "Editora", value: book.publisher },
        { icon: finishIcon, label: "Acabamento", value: book.finish },
        { icon: barcodeIcon, label: "ISBN", value: book.isbn },
      ];

      fields.forEach((field) => {
        // Draw icon - scaled proportionally
        const iconSize = 95;
        ctx.drawImage(field.icon, 114, yPosition - 67, iconSize, iconSize);

        // Label - scaled proportionally
        ctx.font = "46px Arial";
        ctx.fillStyle = "#666666";
        ctx.fillText(field.label, 267, yPosition - 38);

        // Value - scaled proportionally
        ctx.font = "bold 61px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(field.value, 267, yPosition + 38);

        yPosition += 230;
      });
    } catch (error) {
      console.error("Error loading icons:", error);
      // Fallback to text-only version
      drawTextOnlyCard();
    }
  };

  const drawTextOnlyCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title - scaled proportionally
    ctx.font = "bold 92px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText("Detalhes do livro", 114, 230);

    // Reset font for content
    ctx.font = "46px Arial";
    ctx.fillStyle = "#666666";

    let yPosition = 380;

    // Draw each field with emojis
    const fields = [
      { icon: "📖", label: "Número de páginas", value: book.pages },
      { icon: "📏", label: "Formato", value: book.format },
      { icon: "⚖️", label: "Peso", value: book.weight },
      { icon: "🏢", label: "Editora", value: book.publisher },
      { icon: "📦", label: "Acabamento", value: book.finish },
      { icon: "📊", label: "ISBN", value: book.isbn },
    ];

    fields.forEach((field) => {
      // Emoji icon - scaled proportionally
      ctx.font = "bold 61px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(field.icon, 114, yPosition);

      // Label - scaled proportionally
      ctx.font = "46px Arial";
      ctx.fillStyle = "#666666";
      ctx.fillText(field.label, 267, yPosition - 38);

      // Value - scaled proportionally
      ctx.font = "bold 61px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(field.value, 267, yPosition + 38);

      yPosition += 230;
    });
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `livro-${book.isbn || Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-lg max-w-full h-auto"
        style={{ maxWidth: "300px" }}
      />
      <Button onClick={downloadCard} className="w-full">
        <Download className="h-4 w-4 mr-2" />
        Baixar Card
      </Button>
    </div>
  );
}
