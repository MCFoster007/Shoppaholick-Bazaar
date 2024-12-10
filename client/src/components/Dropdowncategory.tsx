import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface DropDownCategoryProps {
  onSelectCategory: (category: string) => void;
}

const Dropdowncategory = ({ onSelectCategory }: DropDownCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="dropdown-container">
      <select
        className="fluid search dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
    </div>
  );
};

export default Dropdowncategory;