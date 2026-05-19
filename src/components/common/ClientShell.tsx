'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ChatBubble = dynamic(() => import('@/components/common/ChatBubble'), {
  ssr: false,
  loading: () => null,
});

const OnekoCat = dynamic(() => import('@/components/common/OnekoCat'), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell() {
  return (
    <>
      <OnekoCat />
      <ChatBubble />
    </>
  );
}
