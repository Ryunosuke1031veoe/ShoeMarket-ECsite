// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';

// interface CartSummaryProps {
//   subtotal: number;
//   shipping: number;
//   total: number;
//   onCheckout: () => void;
// }

// export function CartSummary({
//   subtotal,
//   shipping,
//   total,
//   onCheckout,
// }: CartSummaryProps) {
//   return (
//     <div className="rounded-lg border p-6">
//       <h2 className="text-lg font-medium">注文内容</h2>
//       <div className="mt-4 space-y-4">
//         <div className="flex justify-between">
//           <span className="text-muted-foreground">小計</span>
//           <span>¥{subtotal.toLocaleString()}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-muted-foreground">配送料</span>
//           <span>¥{shipping.toLocaleString()}</span>
//         </div>
//         <Separator />
//         <div className="flex justify-between font-medium">
//           <span>合計</span>
//           <span>¥{total.toLocaleString()}</span>
//         </div>
//         <Button className="w-full" size="lg" onClick={onCheckout}>
//           レジに進む
//         </Button>
//       </div>
//     </div>
//   );
// }
