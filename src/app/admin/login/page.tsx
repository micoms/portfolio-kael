'use client';

import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          padding: '40px 32px',
          background: 'var(--bone)',
          borderRadius: 18,
          boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 24,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          Admin Login
        </h1>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: 13,
            color: 'var(--ink-mute)',
            marginBottom: 28,
          }}
        >
          Sign in to manage your portfolio.
        </p>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(237, 111, 92, 0.1)',
              border: '1px solid var(--coral)',
              borderRadius: 8,
              fontFamily: 'var(--sans)',
              fontSize: 12,
              color: 'var(--coral)',
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--sans)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--ink)',
                background: 'var(--paper)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--sans)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--ink)',
                background: 'var(--paper)',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
