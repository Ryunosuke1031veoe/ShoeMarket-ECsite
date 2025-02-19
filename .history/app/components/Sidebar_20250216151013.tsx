'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { brands, sizes, priceRange } from '../data/shoes';
import { shoes } from '../data/shoes';
import ShoeSearchBar from '../components/action-search-bar';
import { useRouter } from 'next/navigation';

// 人気ランキングの計算（実際のアプリケーションではデータベースから取得）
const popularShoes = [...shoes]
  .sort((a, b) => b.price - a.price) // この例では価格が高い順をランキングとして使用
  .slice(0, 10);

interface SidebarProps {
  onFilterChange: (filters: {
    brands: string[];
    sizes: number[];
    priceRange: [number, number];
  }) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [price, setPrice] = useState<[number, number]>([
    priceRange.min,
    priceRange.max,
  ]);

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateFilters(newBrands, selectedSizes, price);
  };

  const handleSizeChange = (size: number) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    updateFilters(selectedBrands, newSizes, price);
  };

  const handlePriceChange = (newPrice: number[]) => {
    const priceRange = [newPrice[0], newPrice[1]] as [number, number];
    setPrice(priceRange);
    updateFilters(selectedBrands, selectedSizes, priceRange);
  };

  const updateFilters = (
    brands: string[],
    sizes: number[],
    price: [number, number]
  ) => {
    onFilterChange({ brands, sizes, priceRange: price });
  };

  // const Sidebar = () => {
  //   const router = useRouter(); // ここで router を定義

  return (
    <div className="relative ">
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-4 z-50 border-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-background border-r p-6"
          >
            <div className="space-y-6">
              <ShoeSearchBar />
              {/* 人気ランキング */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  人気ランキング
                </h3>
                <div className="space-y-3">
                  {popularShoes.map((shoe, index) => (
                    <a
                      key={shoe.id}
                      onClick={() => router.push(`/shoes/${shoe.id}`)}
                      className="cursor-pointer"
                    >
                      <motion.div
                        key={shoe.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <span
                          className={`font-bold ${
                            index < 3 ? 'text-yellow-500' : 'text-gray-500'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">
                            {shoe.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {shoe.brand}
                          </p>
                        </div>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">ブランド</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">サイズ</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedSizes.includes(size) ? 'default' : 'outline'
                      }
                      className="w-full"
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">価格帯</h3>
                <Slider
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1000}
                  value={[price[0], price[1]]}
                  onValueChange={handlePriceChange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span>¥{price[0].toLocaleString()}</span>
                  <span>¥{price[1].toLocaleString()}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-lg text-white"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-bold">セール中！</span>
                </div>
                <p className="text-sm mb-2">春の新作シューズが最大50%オフ！</p>
                <Button variant="secondary" className="w-full">
                  セール商品を見る
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
