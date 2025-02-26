
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../contexts/AuthContext';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [agreed, setAgreed] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(sessionStorage.getItem('username') || '');
  const [email, setEmail] = React.useState<string>(sessionStorage.getItem('email') || '');
  const router = useRouter();
  const { signIn } = useAuth();

  // const showCouponToast = () => {
  //   toast.custom(
  //     (t) => (
  //       <motion.div
  //         initial={{ opacity: 0, y: 50 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         exit={{ opacity: 0, y: -50 }}
  //         className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto"
  //       >
  //         <div className="flex items-center justify-between mb-4">
  //           <div className="flex items-center">
  //             <Gift className="h-6 w-6 text-pink-500 mr-2" />
  //             <h3 className="text-lg font-semibold">新規登録特典クーポン</h3>
  //           </div>
  //           <button
  //             onClick={() => toast.dismiss(t)}
  //             className="text-gray-400 hover:text-gray-600"
  //           >
  //             ✕
  //           </button>
  //         </div>
  //         <div className="space-y-4">
  //           <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg">
  //             <p className="text-2xl font-bold text-center text-pink-600">
  //               ¥3,000 OFF
  //             </p>
  //             <p className="text-sm text-center text-gray-600">
  //               初回購入時に使用可能
  //             </p>
  //           </div>
  //           <div className="text-sm text-gray-600">
  //             <p>• 有効期限：登録日から30日間</p>
  //             <p>• 10,000円以上のお買い物で使用可能</p>
  //             <p>• 他のクーポンとの併用不可</p>
  //           </div>
  //           <Button
  //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
  //             onClick={() => toast.dismiss(t)}
  //           >
  //             クーポンを受け取る
  //           </Button>
  //         </div>
  //       </motion.div>
  //     ),
  //     {
  //       duration: 10000,
  //       position: 'top-center',
  //     }
  //   );
  // };

  React.useEffect(() => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
  }, [username, email]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        username: formData.get('username') as string,
        email: formData.get('email') as string,
      };

      // セッションストレージにユーザー情報を保存
      sessionStorage.setItem('username', userData.username);
      sessionStorage.setItem('email', userData.email);

      // Sign in the user
      signIn(userData);

      // Show the coupon toast after successful registration
      // showCouponToast();

      // Delay the redirect to allow the user to see the coupon
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="absolute left-4 top-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={() => router.push('/')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            ホーム
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/30 border-white/50 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 blur-3xl rounded-full opacity-20" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-red-500 blur-3xl rounded-full opacity-20" />
            </div>

            <CardHeader className="space-y-1 relative pt-8">
              <CardTitle className="text-2xl">アカウント作成</CardTitle>
              <CardDescription>
                必要な情報を入力してアカウントを作成してください
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 relative">
              <div className="grid gap-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  disabled={isLoading}
                  className="backdrop-blur-sm bg-white/50 border-black/50"
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  className="backdrop-blur-sm bg-white/50 border-black/50"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={isLoading}
                  className="backdrop-blur-sm bg-white/50 border-black/50"
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  8文字以上で、大文字、小文字、数字を含める必要があります
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">パスワード（確認）</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  disabled={isLoading}
                  className="backdrop-blur-sm bg-white/50 border-black/50"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="border-black/50 data-[state=checked]:bg-indigo-600"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Link href="/terms" className="text-primary hover:underline">
                    利用規約
                  </Link>
                  に同意します
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 relative">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-black to-blue-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                disabled={isLoading || !agreed}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                アカウント作成
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    または
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-gray-50 border-gray-300"
                >
                  <Icons.google className="mr-2 h-4 w-4 text-[#4285F4]" />
                  Googleで登録
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            サインイン
          </Link>
        </p>
      </div>
    </div>
  );
}

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// // import { useToast } from "@/components/ui/use-toast"

// export function SignUpForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   // const { toast } = useToast()
//   const router = useRouter()

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(event.currentTarget)
//     const name = formData.get("name") as string
//     const email = formData.get("email") as string
//     const password = formData.get("password") as string

//     try {
//       // セッションストレージにユーザー情報を保存
//       sessionStorage.setItem(
//         "user",
//         JSON.stringify({
//           name,
//           email,
//           isLoggedIn: true,
//         }),
//       )

//     //   toast({
//     //     title: "アカウントを作成しました",
//     //     description: "ようこそ！",
//     //   })

//     //   router.push("/dashboard")
//     // } catch (error) {
//     //   toast({
//     //     variant: "destructive",
//     //     title: "エラーが発生しました",
//     //     description: "もう一度お試しください。",
//     //   })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-6 pt-6">
//       <div className="space-y-2">
//         <Label htmlFor="name">名前</Label>
//         <Input id="name" name="name" placeholder="山田 太郎" required disabled={isLoading} />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="email">メールアドレス</Label>
//         <Input id="email" name="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="password">パスワード</Label>
//         <Input id="password" name="password" type="password" required disabled={isLoading} />
//       </div>
//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? "アカウント作成中..." : "アカウント作成"}
//       </Button>
//     </form>
//   )
// }


