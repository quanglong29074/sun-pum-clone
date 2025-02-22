import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface TokenSortProps {
  options: Option[];
  onSortChange: (sortOrder: string) => void; // Nhận callback để thay đổi sortOrder
}

export const TokenSort: React.FC<TokenSortProps> = ({ options, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0].value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSortChange(value); // Gọi hàm truyền từ HomePage để cập nhật sortOrder
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-[#151527] cursor-pointer rounded-lg border border-[#4600CC] text-white font-medium hover:text-[#6001FF] transition-colors"
      >
        <span> {selected}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-[#151527]/60 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-20 border border-[#4600CC]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full px-4 py-2 text-left text-white hover:text-[#6001FF] transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
