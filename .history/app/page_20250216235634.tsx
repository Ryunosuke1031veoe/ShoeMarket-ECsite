'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ShoeGrid from './components/ShoeGrid';
import AdCarousel from './components/AdCarousel';
import ShoeSearchBar from './components/action-search-bar';
import { shoes } from './data/shoes';
import { Shoe } from './types/shoe';
import FooterDemo from './components/demo';

export default function Home() {
  const [filteredShoes, setFilteredShoes] = useState<Shoe[]>(shoes);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      console.log('ユーザー情報がセッションストレージに保存されています:', JSON.parse(userData));
    }
  }, []);

  const handleFilterChange = (filters: {
    brands: string[];
    sizes: number[];
    priceRange: [number, number];
  }) => {
    const filtered = shoes.filter((shoe) => {
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(shoe.brand);
      const sizeMatch =
        filters.sizes.length === 0 ||
        shoe.sizes.some((size) => filters.sizes.includes(size));
      const priceMatch =
        shoe.price >= filters.priceRange[0] &&
        shoe.price <= filters.priceRange[1];

      return brandMatch && sizeMatch && priceMatch;
    });

    setFilteredShoes(filtered);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="pt-3">
          <AdCarousel />
        </div>
        <div className="flex">
          <Sidebar onFilterChange={handleFilterChange} />
          <div className="flex-1 p-6 ">
            <div className="pb-0">{/* <ShoeSearchBar /> */}</div>
            <ShoeGrid shoes={filteredShoes} />
          </div>
        </div>
      </main>
      <div className="bg-gray-200">
        <FooterDemo />
      </div>
    </div>
  );
}
