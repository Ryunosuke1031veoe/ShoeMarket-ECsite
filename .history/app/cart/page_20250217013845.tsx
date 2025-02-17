'use client';

import { useCart } from '../contexts/CartContext';
import Image from 'next/image';
import { Minus, Plus, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">カートは空です</h2>
              <p className="text-muted-foreground mb-4">
                商品をカートに追加してください。
              </p>
              <Button onClick={() => router.push('/')}>
                ショッピングを続ける
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleCheckout = () => {
    items.forEach((item) => {
      window.open(item.url, '_blank');
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">ショッピングカート</h1>
        <div className="pl-0 pt-4">
          <Button
            variant="ghost"
            className="text-lg py-4 px-6 text-muted-foreground hover:text-primary"
            onClick={() => router.push('/')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border"
                >
                  <div className="relative w-full sm:w-40 h-40">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                        {item.size && (
                          <p className="text-sm">サイズ: {item.size}cm</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border sticky top-4">
              <h2 className="text-lg font-semibold mb-4">注文サマリー</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>¥{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>配送料</span>
                  <span>¥550</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>合計</span>
                    <span>¥{(calculateTotal() + 550).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={handleCheckout}>
                レジに進む
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}