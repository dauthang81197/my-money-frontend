'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const t = localStorage.getItem('access_token');
    if (t) {
      router.push('/vi/dashboard');
    } else {
      router.push('/vi/login');
    }
  }, [router]);
  return <>{children}</>;
}
