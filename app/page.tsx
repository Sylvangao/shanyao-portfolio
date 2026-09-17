'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/work/`);
  }, []);

  return null;
}
