'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';
import { useRouter } from 'next/router';

interface Shoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  image: string;
  description: string;
  url: string;
}

const allShoes: Shoe[] = [
  {
    id: 1,
    name: 'クラシックランナー',
    brand: 'Nike',
    price: 12999,
    sizes: [24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description:
      '最新のコンフォートテクノロジーを搭載したクラシックなランニングシューズ',
    url: '#',
  },
  {
    id: 2,
    name: 'アーバンウォーカー',
    brand: 'Adidas',
    price: 14999,
    sizes: [24.5, 25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    description: '日常使いに最適なスタイリッシュなスニーカー',
    url: '#',
  },
  {
    id: 3,
    name: 'スポーツエリート',
    brand: 'Puma',
    price: 8999,
    sizes: [25.5, 26, 26.5, 27, 27.5],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    description: '高性能スポーツシューズ',
    url: '#',
  },
  {
    id: 4,
    name: 'コンフォートプラス',
    brand: 'New Balance',
    price: 11999,
    sizes: [24.5, 25, 25.5, 26, 26.5],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: '長時間の着用でも快適な履き心地',
    url: '#',
  },
  {
    id: 5,
    name: 'ストリートスタイル',
    brand: 'Converse',
    price: 7999,
    sizes: [24, 24.5, 25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    description: 'モダンなアレンジを加えたクラシックなストリートスタイル',
    url: '#',
  },
  {
    id: 6,
    name: 'プロアスリート',
    brand: 'Nike',
    price: 15999,
    sizes: [25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
    description: 'プロフェッショナルグレードのアスリート向けシューズ',
    url: '#',
  },
  {
    id: 7,
    name: 'エアフロー',
    brand: 'Nike',
    price: 13999,
    sizes: [24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
    description: '通気性抜群の軽量ランニングシューズ',
    url: '#',
  },
  {
    id: 8,
    name: 'ブースト',
    brand: 'Adidas',
    price: 16999,
    sizes: [25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
    description: '最新のブーストテクノロジー搭載モデル',
    url: '#',
  },
  {
    id: 9,
    name: 'クラウドステップ',
    brand: 'Puma',
    price: 9999,
    sizes: [24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1608379743498-0837c3164542',
    description: '雲の上を歩くような履き心地',
    url: '#',
  },
  {
    id: 10,
    name: 'フレッシュフォーム',
    brand: 'New Balance',
    price: 12999,
    sizes: [25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: '新素材フォームで快適な履き心地',
    url: '#',
  },
  {
    id: 11,
    name: 'ハイトップクラシック',
    brand: 'Converse',
    price: 8999,
    sizes: [24, 24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    description: '定番のハイトップデザイン',
    url: '#',
  },
  {
    id: 12,
    name: 'ズームエリート',
    brand: 'Nike',
    price: 17999,
    sizes: [25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: '高速ランニング向け最新モデル',
    url: '#',
  },
  {
    id: 13,
    name: 'ウルトラブースト',
    brand: 'Adidas',
    price: 18999,
    sizes: [24.5, 25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
    description: '究極のクッショニング',
    url: '#',
  },
  {
    id: 14,
    name: 'スピードキャット',
    brand: 'Puma',
    price: 13999,
    sizes: [25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    description: '軽量レーシングモデル',
    url: '#',
  },
  {
    id: 15,
    name: 'トレイルランナー',
    brand: 'New Balance',
    price: 14999,
    sizes: [24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: 'トレイルランニング専用設計',
    url: '#',
  },
  {
    id: 16,
    name: 'スケートプロ',
    brand: 'Converse',
    price: 9999,
    sizes: [24, 24.5, 25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    description: 'スケーター向け耐久モデル',
    url: '#',
  },
  {
    id: 17,
    name: 'エアマックス',
    brand: 'Nike',
    price: 16999,
    sizes: [25.5, 26.5, 27.5, 28.5],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
    description: '伝説的なエアクッショニング',
    url: '#',
  },
  {
    id: 18,
    name: 'テラインスパイア',
    brand: 'Adidas',
    price: 15999,
    sizes: [24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
    description: 'アウトドア向け高機能モデル',
    url: '#',
  },
  {
    id: 19,
    name: 'フューチャーライダー',
    brand: 'Puma',
    price: 11999,
    sizes: [25.5, 26, 26.5],
    image: 'https://images.unsplash.com/photo-1608379743498-0837c3164542',
    description: 'レトロフューチャーデザイン',
    url: '#',
  },
  {
    id: 20,
    name: 'ライフスタイル247',
    brand: 'New Balance',
    price: 13999,
    sizes: [24.5, 25.5, 26.5, 27.5],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: '24時間7日間快適な履き心地',
    url: '#',
  },
  {
    id: 21,
    name: 'ウェーブライダー',
    brand: 'Mizuno',
    price: 14999,
    sizes: [25.0, 25.5, 26.0, 26.5, 27.0, 27.5],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    description: '長距離ランニング向けの高機能モデル',
    url: '#',
  },
  {
    id: 22,
    name: 'ゲルカヤノ',
    brand: 'Asics',
    price: 15999,
    sizes: [24.5, 25.0, 25.5, 26.0, 26.5, 27.0],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    description: '安定性と快適性を両立したランニングシューズ',
    url: '#',
  },
  {
    id: 23,
    name: 'クラウドフロー',
    brand: 'On',
    price: 16999,
    sizes: [25.0, 25.5, 26.0, 26.5, 27.0],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    description: '革新的なクッショニングシステム搭載',
    url: '#',
  },
  {
    id: 24,
    name: 'フレッシュフォーム',
    brand: 'New Balance',
    price: 13999,
    sizes: [24.5, 25.0, 25.5, 26.0, 26.5],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: '快適な履き心地のランニングシューズ',
    url: '#',
  },
  {
    id: 25,
    name: 'ズームペガサス',
    brand: 'Nike',
    price: 12999,
    sizes: [25.0, 25.5, 26.0, 26.5, 27.0, 27.5],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'オールラウンドに使える定番モデル',
    url: '#',
  },
];

function ShoeSearchBar({ shoes = allShoes }: { shoes?: Shoe[] }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ shoes: Shoe[] } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const debouncedQuery = useDebounce(query, 200);
  const router = useRouter();

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery) {
      // 検索クエリがない場合も3件までに制限
      setResult({ shoes: allShoes.slice(0, 3) });
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredShoes = allShoes
      .filter((shoe) => {
        const searchableText =
          `${shoe.name} ${shoe.brand} ${shoe.description}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 3); // 検索結果を3件までに制限

    setResult({ shoes: filteredShoes });
  }, [debouncedQuery, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Reset selectedAction when focusing the input
  const handleFocus = () => {
    setSelectedShoe(null);
    setIsFocused(true);
  };

  const handleShoeClick = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    router.push(`/shoes/${shoe.id}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto pb-0 mb-0">
      <div className="relative flex flex-col justify-start items-center min-h-[300px]">
        <div className="w-full max-w-sm sticky top-0 bg-background z-10 pt-4 pb-1">
          <label
            className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block"
            htmlFor="search"
          >
            シューズを検索
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="シューズ名、ブランドで検索..."
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <AnimatePresence mode="popLayout">
                {query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <AnimatePresence>
            {isFocused && result && !selectedShoe && (
              <motion.div
                className="w-full border rounded-md shadow-sm overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul>
                  {result.shoes.map((shoe) => (
                    <motion.li
                      key={shoe.id}
                      className="px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer rounded-md"
                      variants={item}
                      layout
                      onClick={() => handleShoeClick(shoe)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={shoe.image || '/placeholder.svg'}
                          alt={shoe.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {shoe.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {shoe.brand} - ¥{shoe.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {shoe.sizes.length} サイズ
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-2 px-3 py-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-500"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ShoeSearchBar;
