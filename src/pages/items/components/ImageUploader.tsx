
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload } from 'lucide-react';

interface ImageUploaderProps {
  imagePreview: string;
  setImagePreview: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ imagePreview, setImagePreview }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };
  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all hover:bg-gray-50 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        className="hidden" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      {imagePreview ? (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="mx-auto max-h-64 rounded shadow"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setImagePreview('');
            }}
          >
            Change Image
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-sm">
              Drag & drop an image, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF (max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
