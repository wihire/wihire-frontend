'use client';

import { useCallback } from 'react';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { ACCESS_TOKEN_KEY } from '@/lib/constants/storageKey';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut({
      redirect: false
    });

    deleteCookie(ACCESS_TOKEN_KEY);
    router.replace('/login');
  }, [router]);

  return (
    <button onClick={handleLogout} className="text-error hover:text-error">
      Logout
    </button>
  );
};

export default LogoutButton;
