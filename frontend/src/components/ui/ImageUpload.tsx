'use client';

import { useState, useCallback } from 'react';
import Button from './Button';

interface ImageUploadProps {
  onUpload: (file: File, preview: string) => void;
  currentImage?: string;
  label?: string;
  maxSize?: number; // in MB
  aspectRatio?: string;
}

export default function ImageUpload({
  onUpload,
  currentImage,
  label = 'Carregar Imagem',
  maxSize = 5,
  aspectRatio,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Por favor, selecione apenas arquivos de imagem';
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${maxSize}MB`;
    }

    return null;
  };

  const processFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setPreview(previewUrl);
      onUpload(file, previewUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError('');
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}

      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors ${
          dragActive
            ? 'border-gold-500 bg-gold-50'
            : error
            ? 'border-error bg-error/5'
            : 'border-neutral-300 hover:border-neutral-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
              style={aspectRatio ? { aspectRatio } : undefined}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={handleRemove}
                className="p-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                title="Remover imagem"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center p-12 cursor-pointer"
          >
            <svg
              className="w-12 h-12 text-neutral-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-neutral-600 mb-2">
              <span className="font-medium text-gold-500">Clique para fazer upload</span> ou
              arraste uma imagem
            </p>
            <p className="text-xs text-neutral-500">
              PNG, JPG, WEBP até {maxSize}MB
              {aspectRatio && ` • Proporção: ${aspectRatio}`}
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-error">{error}</p>}

      {aspectRatio && (
        <p className="mt-2 text-xs text-neutral-500">
          Recomendado: Imagens com proporção {aspectRatio} para melhor visualização
        </p>
      )}
    </div>
  );
}
