'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
import { toast } from 'sonner';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get('callbackUrl') || '/admin'; // デフォルトリダイレクト先

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false, // 自前でリダイレクトするため false
        email,
        password,
      });

      if (result?.error) {
        setError('メールアドレスまたはパスワードが正しくありません。');
        toast.error('ログインに失敗しました');
      } else if (result?.ok) {
        toast.success('ログインしました');
        // ログイン成功後、指定されたコールバックURLまたはデフォルトにリダイレクト
        // 役割によるリダイレクト先変更はミドルウェアまたは認証コールバックで行う想定
        router.push(callbackUrl);
      } else {
        setError('予期せぬエラーが発生しました。');
        toast.error('ログイン中にエラーが発生しました');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('ログイン中にエラーが発生しました。');
      toast.error('ログイン中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>ログイン</CardTitle>
          <CardDescription>
            登録済みのメールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='grid gap-4'>
            {error && <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>{error}</div>}
            <div className='grid gap-2'>
              <Label htmlFor='email'>メールアドレス</Label>
              <Input
                id='email'
                type='email'
                placeholder='mail@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>パスワード</Label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
