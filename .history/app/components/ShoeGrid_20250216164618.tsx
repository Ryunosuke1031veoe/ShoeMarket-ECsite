// 'use client';

// import { motion } from 'framer-motion';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
// import { Shoe } from '../types/shoe';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '../contexts/CartContext';
// import { toast } from 'sonner';

// interface ShoeGridProps {
//   shoes: Shoe[];
// }

// export default function ShoeGrid({ shoes }: ShoeGridProps) {
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const itemsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(shoes.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentShoes = shoes.slice(startIndex, endIndex);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((current) => current + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((current) => current - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleShoeClick = (shoeId: number) => {
//     router.push(`/shoes/${shoeId}`);
//   };

//   const handleAddToCart = (shoe: Shoe) => {
//     addToCart({
//       id: shoe.id,
//       name: shoe.name,
//       brand: shoe.brand,
//       price: shoe.price,
//       image: shoe.image,
//       quantity: 1,
//     });
//     toast.success('カートに追加しました');
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentShoes.map((shoe, index) => (
//           <motion.div
//             key={shoe.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//               <CardContent className="p-0">
//                 <div
//                   className="aspect-square relative cursor-pointer"
//                   onClick={() => handleShoeClick(shoe.id)}
//                 >
//                   <img
//                     src={shoe.image}
//                     alt={shoe.name}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter className="flex flex-col items-start p-4">
//                 <div className="flex justify-between w-full items-start mb-2">
//                   <div>
//                     <h3
//                       className="font-semibold text-lg cursor-pointer hover:text-blue-600"
//                       onClick={() => handleShoeClick(shoe.id)}
//                     >
//                       {shoe.name}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       {shoe.brand}
//                     </p>
//                   </div>
//                   <span className="font-bold text-lg">
//                     ¥{shoe.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   {shoe.description}
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 w-full">
//                   <Button
//                     variant="outline"
//                     className="flex items-center justify-center gap-2"
//                     onClick={() => handleAddToCart(shoe)}
//                   >
//                     <ShoppingCart className="h-4 w-4" />
//                     カートに入れる
//                   </Button>
//                   <Button onClick={() => handleShoeClick(shoe.id)}>
//                     購入する
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center gap-4 mt-8 pb-8">
//         <Button
//           variant="outline"
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="flex items-center gap-2"
//         >
//           <ChevronLeft className="h-4 w-4" />
//           前のページ
//         </Button>

//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">
//             {currentPage} / {totalPages} ページ
//           </span>
//         </div>

//         <Button
//           variant="outline"
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className="flex items-center gap-2"
//         >
//           次のページ
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Shoe } from '../types/shoe';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ShoeGridProps {
  shoes: Shoe[];
}


export default function ShoeGrid({ shoes }: ShoeGridProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // 認証状態を取得
  const [showAuthDialog, setShowAuthDialog] = useState(false); // モーダルの状態
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(shoes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShoes = shoes.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((current) => current - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShoeClick = (shoeId: number) => {
    router.push(`/shoes/${shoeId}`);
  };

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
      quantity: 1,
    });
    toast.success('カートに追加しました');
  };

  const handlePurchase = (shoeId: number) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true); // 認証ダイアログを表示
      return;
    }

    router.push(`/checkout?shoe=${shoeId}`);
  };

  return (
    <>
      {/* 認証が必要な場合のダイアログ */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              サインインまたは新規登録が必要です
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-red-500 font-semibold">
            今新規登録すると40%オフクーポンプレゼント！
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => router.push('/auth/signin')}>
              サインイン
            </Button>
            <Button variant="outline" onClick={() => router.push('/auth')}>
              新規登録
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentShoes.map((shoe, index) => (
            <motion.div
              key={shoe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div
                    className="aspect-square relative cursor-pointer"
                    onClick={() => handleShoeClick(shoe.id)}
                  >
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="flex justify-between w-full items-start mb-2">
                    <div>
                      <h3
                        className="font-semibold text-lg cursor-pointer hover:text-blue-600"
                        onClick={() => handleShoeClick(shoe.id)}
                      >
                        {shoe.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {shoe.brand}
                      </p>
                    </div>
                    <span className="font-bold text-lg">
                      ¥{shoe.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {shoe.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => handleAddToCart(shoe)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      カートに入れる
                    </Button>
                    <Button onClick={() => handlePurchase(shoe.id)}>
                      購入する
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8 pb-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            前のページ
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {currentPage} / {totalPages} ページ
            </span>
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            次のページ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
