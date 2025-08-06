import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from "lucide-react";

type ModelOption = {
  id: string;
  name: string;
  description: string;
  selected?: boolean;
};

const AIModelSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState<ModelOption[]>([
    {
      id: 'model1',
      name: 'SellerPic Pro',
      description: '24 frames, 1024x576, Amazon & Walmart optimized',
      selected: true,
    },
    {
      id: 'model2',
      name: 'Whatmore Studio',
      description: 'Multiple aspect ratios (1:1, 16:9, 9:16), Shopify integration',
      selected: false,
    },
    {
      id: 'model3',
      name: 'VidAU Social',
      description: 'TikTok & Instagram optimized, vertical 9:16 format',
      selected: false,
    },
    {
      id: 'model4',
      name: 'Fliki Product Showcase',
      description: 'E-commerce focused, supports product tags & CTAs',
      selected: false,
    },
  ]);

  const selectedModel = models.find(model => model.selected) || models[0];

  const handleSelectModel = (id: string) => {
    setModels(models.map(model => ({
      ...model,
      selected: model.id === id,
    })));
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      {/* Selected option display */}
      <div 
        className="w-full border rounded-md p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h4 className="font-medium text-gray-900 m-0 text-lg">{selectedModel.name}</h4>
          <p className="text-sm text-gray-500 m-0">{selectedModel.description}</p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-zinc-50 border border-gray-200 rounded-md shadow-lg">
          {models.map((model) => (
            <div
              key={model.id}
              className={`p-4 cursor-pointer transition-all relative hover:bg-zinc-100 ${
                model.selected ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSelectModel(model.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 m-0 text-lg">{model.name}</h4>
                  <p className="text-sm text-gray-500 m-0">{model.description}</p>
                </div>
                
                {model.selected && (
                  <div className="text-blue-500">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIModelSelector;

