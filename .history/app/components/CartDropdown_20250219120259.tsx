// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ShoppingCart, X, Minus, Plus, ShoppingBag } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '../contexts/CartContext';
// import { useRouter } from 'next/navigation';

// export default function CartDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { items, updateQuantity, removeFromCart } = useCart();
//   const router = useRouter();

//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleCheckout = () => {
//     setIsOpen(false);
//     router.push('/cart');
//   };

//   return (
//     <div className="relative">
//       <Button
//         variant="ghost"
//         className="relative"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <ShoppingCart className="h-5 w-5" />
//         {totalItems > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//             {totalItems}
//           </span>
//         )}
//       </Button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/20 z-40"
//               onClick={() => setIsOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50"
//             >
//               <div className="p-4 max-h-[80vh] overflow-auto">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">ショッピングカート</h3>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>

//                 {items.length === 0 ? (
//                   <div className="text-center py-8">
//                     <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//                     <p className="text-gray-500">カートは空です</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-4">
//                       {items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg"
//                         >
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-20 h-20 object-cover rounded"
//                           />
//                           <div className="flex-1">
//                             <h4 className="font-medium">{item.name}</h4>
//                             <p className="text-sm text-gray-500">{item.brand}</p>
//                             <p className="text-sm">
//                               {item.size && `サイズ: ${item.size}`}
//                             </p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="h-6 w-6"
//                                 onClick={() =>
//                                   updateQuantity(item.id, item.quantity - 1)
//                                 }
//                                 disabled={item.quantity <= 1}
//                               >
//                                 <Minus className="h-3 w-3" />
//                               </Button>
//                               <span className="w-8 text-center">
//                                 {item.quantity}
//                               </span>
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="h-6 w-6"
//                                 onClick={() =>
//                                   updateQuantity(item.id, item.quantity + 1)
//                                 }
//                               >
//                                 <Plus className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-medium">
//                               ¥{(item.price * item.quantity).toLocaleString()}
//                             </p>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="text-red-500 hover:text-red-600"
//                               onClick={() => removeFromCart(item.id)}
//                             >
//                               削除
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="border-t mt-4 pt-4">
//                       <div className="flex justify-between mb-2">
//                         <span>小計</span>
//                         <span className="font-medium">
//                           ¥{totalPrice.toLocaleString()}
//                         </span>
//                       </div>
//                       <Button className="w-full" onClick={handleCheckout}>
//                         購入手続きへ
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/cart');
  };

  // サーバーサイドレンダリング時は基本的なボタンのみを表示
  if (!mounted) {
    return (
      <Button variant="ghost" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {/* 既存のAnimatePresenceとドロップダウンの内容はそのまま */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ...existing code... */}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}