import React, { useState, useRef } from 'react';

const ImageUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`bg-zinc-50 border border-dashed rounded-md p-10 flex flex-col items-center justify-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <button onClick={handleClick} className="relative h-12 overflow-hidden cursor-pointer rounded-md border border-neutral-200 bg-transparent px-6 text-neutral-950 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:-translate-y-full before:bg-neutral-100 before:transition-transform hover:before:translate-y-0"><span className="relative">Upload image</span></button>
      <p className="mt-4 text-sm text-gray-600">
        or drag 'n' drop an image here
      </p>
      
      {file && (
        <div className="mt-4 text-sm text-green-600">
          Selected: {file.name}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
