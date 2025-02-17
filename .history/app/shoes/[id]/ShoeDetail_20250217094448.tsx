'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shoes } from '@/app/data/shoes';
import { useRouter } from 'next/navigation';
import { Shoe } from '@/app/types/shoe';
import Header from '@/app/components/Header';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCart } from '@/app/contexts/CartContext';

  interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// サンプルレビューデータ
const sampleReviews: Review[] = [
  {
    id: 1,
    userName: '山田太郎',
    rating: 5,
    comment:
      'とても履き心地が良く、デザインも気に入っています。サイズも丁度良かったです。',
    date: '2024-03-15',
  },
  {
    id: 2,
    userName: '佐藤花子',
    rating: 4,
    comment:
      'デザインは素晴らしいですが、少し値段が高いと感じました。でも品質は確かです。',
    date: '2024-03-10',
  },
  {
    id: 3,
    userName: '鈴木一郎',
    rating: 5,
    comment:
      'ランニング用に購入しましたが、期待以上の商品でした。クッション性が特に良いです。',
    date: '2024-03-05',
  },
];

export default function ShoeDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false); // モーダルの状態
  const [averageRating, setAverageRating] = useState(0);
  const { isAuthenticated } = useAuth(); 
  const { addToCart } = useCart();

  const shoe = shoes.find((s) => s.id === parseInt(params.id));

  const handleAddToCart = (shoe: Shoe) => {
      if (!isAuthenticated) {
        setShowAuthDialog(true); // 認証ダイアログを表示
        return;
      }

      addToCart({
        id: shoe.id,
        name: shoe.name,
        brand: shoe.brand,
        price: shoe.price,
        image: shoe.image,
        url: `/shoes/${shoe.id}`,
        quantity: 1,
      });

  };
  
  useEffect(() => {
    if (!shoe) {
      router.push('/');
      return;
    }

    // レビューの平均評価を計算
    const average =
      sampleReviews.reduce((acc, review) => acc + review.rating, 0) /
      sampleReviews.length;
    setAverageRating(average);
  }, [shoe, router]);

  if (!shoe) return null;

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div>
      <Header />
      <div className=" pl-4 pt-4">
        <Button
          variant="ghost"
          className="text-lg py-4 px-6 text-muted-foreground hover:text-primary"
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          戻る
        </Button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* 商品画像 */}
          <div className="relative  aspect-square rounded-lg overflow-hidden">
            <img
              src={shoe.image}
              alt={shoe.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* 商品情報 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{shoe.name}</h1>
              <p className="text-lg text-muted-foreground">{shoe.brand}</p>
            </div>

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({sampleReviews.length}件のレビュー)
              </span>
            </div>

            <p className="text-2xl font-bold">¥{shoe.price.toLocaleString()}</p>

            <div>
              <h3 className="text-lg font-semibold mb-2">商品説明</h3>
              <p className="text-gray-600">{shoe.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">サイズ</h3>
              <div className="grid grid-cols-4 gap-2">
                {shoe.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">数量</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="w-full"
                variant="outline"
                disabled={!selectedSize}
                onClick={() => handleAddToCart(shoe)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                カートに追加
              </Button>
              <Button className="w-full" disabled={!selectedSize}>
                今すぐ購入
              </Button>
            </div>
          </div>
        </motion.div>

        {/* レビューセクション */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">カスタマーレビュー</h2>
          <div className="space-y-6">
            {sampleReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
