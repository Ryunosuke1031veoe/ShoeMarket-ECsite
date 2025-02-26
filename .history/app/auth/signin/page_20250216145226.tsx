

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
import { ChevronLeft } from 'lucide-react';
import { useState,useEffect } from 'react';
// import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import {auth} from "@/auth";  
// import {SignIn} from "@/components/auth/signin-button";


export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const callbackUrl = useSearchParams.apply('callbackUrl') || '/profile';

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

     
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white bg-cover pt-16"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(18, 18, 18, 0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="w-full max-w-md p-6 space-y-8">
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
                <CardTitle className="text-2xl">サインイン</CardTitle>
                <CardDescription>
                  アカウント情報を入力してサインインしてください
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 relative">
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
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 relative">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-black to-blue-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  サインイン
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
                  {/* <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="bg-[#24292F] text-white hover:bg-[#24292F]/90 hover:text-white/90"
                  >
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    GitHubでサインイン
                  </Button> */}
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="bg-white text-black hover:bg-gray-50 border-gray-300"
                  >
                    <Icons.google className="mr-2 h-4 w-4 text-[#4285F4]" />
                    Googleでサインイン
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            アカウントをお持ちでない方は{' '}
            <Link href="/auth" className="text-primary hover:underline">
              新規登録
            </Link>
          </p>
        </div>
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

// export default function SignInForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   // const { toast } = useToast()
//   const router = useRouter()

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(event.currentTarget)
//     const email = formData.get("email") as string
//     const password = formData.get("password") as string

//     try {
//       // セッションストレージにユーザー情報を保存
//       sessionStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: "テストユーザー", // サインインの場合はダミーの名前を使用
//           email,
//           isLoggedIn: true,
//         }),
//       )

//   //     toast({
//   //       title: "サインインしました",
//   //       description: "ようこそ戻ってきました！",
//   //     })

//     router.push("/dashboard")
//   } catch (error) {
//     console.error("Error during sign-in:", error);
//     // toast({
//     //   variant: "destructive",
//     //   title: "エラーが発生しました",
//     //   description: "もう一度お試しください。",
//     // })
//   } finally {
//     setIsLoading(false);
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-6 pt-6">
//       <div className="space-y-2">
//         <Label htmlFor="email">メールアドレス</Label>
//         <Input id="email" name="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="password">パスワード</Label>
//         <Input id="password" name="password" type="password" required disabled={isLoading} />
//       </div>
//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? "サインイン中..." : "サインイン"}
//       </Button>
//     </form>
//   )
// }
//   };

