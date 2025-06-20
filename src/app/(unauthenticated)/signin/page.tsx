import SignIn from '@/components/auth/sign-in';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}
