
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ imagePreview, setImagePreview }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm">Item Image</div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all hover:border-zwm-primary">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto h-48 object-cover rounded-md animate-fade-in"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
              onClick={() => setImagePreview(null)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <>
            <div className="text-zwm-primary mb-2 animate-float">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              Click to upload an image or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG or WEBP (max. 5MB)
            </p>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-4 transition-all hover:border-zwm-primary"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              Select Image
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
