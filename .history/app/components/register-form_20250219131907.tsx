'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [agreed, setAgreed] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const data = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm-password') as string,
      };

      const result = await register(data);

      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        toast.success('アカウントが作成されました');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('エラーが発生しました');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6 ', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="absolute left-4 top-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              ホーム
            </Link>
          </Button>
        </div>
        <Card className="backdrop-blur-sm bg-white/30 border-white/50 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br  blur-3xl rounded-full" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br  blur-3xl rounded-full" />
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
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
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
                className="bg-[#24292F] text-white hover:bg-[#24292F]/90 hover:text-white/90"
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHubで登録
              </Button>
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
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/auth" className="text-primary hover:underline">
            サインイン
          </Link>
        </p>
      </div>
    </div>
  );
}
