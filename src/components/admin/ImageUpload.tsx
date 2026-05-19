'use client';

import type { UploadRouter } from '@/lib/uploadthing';
import { UploadDropzone } from '@uploadthing/react';
import Image from 'next/image';
import React from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  endpoint:
    | 'projectImage'
    | 'blogImage'
    | 'companyLogo'
    | 'certificateImage'
    | 'avatar';
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  endpoint,
  className,
}: ImageUploadProps) {
  if (value) {
    return (
      <div className={className} style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--line)',
            background: 'var(--bone)',
          }}
        >
          <Image
            src={value}
            alt="Uploaded image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          &times;
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <UploadDropzone<UploadRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={(res: { ufsUrl: string }[]) => {
          if (res?.[0]) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          console.error('Upload error:', error);
        }}
        appearance={{
          button: {
            background: 'var(--ink)',
            color: 'var(--paper)',
            borderRadius: 8,
            fontSize: 13,
            fontFamily: 'var(--sans)',
          },
          container: {
            border: '1px dashed var(--line)',
            borderRadius: 12,
            background: 'var(--bone)',
          },
          allowedContent: {
            color: 'var(--ink-faint)',
            fontSize: 11,
            fontFamily: 'var(--sans)',
          },
          label: {
            color: 'var(--ink)',
            fontFamily: 'var(--sans)',
            fontSize: 13,
          },
        }}
      />
    </div>
  );
}
