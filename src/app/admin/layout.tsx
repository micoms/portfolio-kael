'use client';

import { AiAssistant } from '@/components/admin/AiAssistant';
import { useSession } from '@/lib/auth-client';
import { Link } from 'next-view-transitions';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: 'grid' },
  { label: 'Projects', href: '/admin/projects', icon: 'folder' },
  { label: 'Experience', href: '/admin/experience', icon: 'briefcase' },
  { label: 'Blog', href: '/admin/blog', icon: 'file-text' },
  { label: 'Skills', href: '/admin/skills', icon: 'code' },
  { label: 'Gears', href: '/admin/gears', icon: 'settings' },
  { label: 'Certificates', href: '/admin/certificates', icon: 'award' },
  { label: 'Settings', href: '/admin/settings', icon: 'sliders' },
];

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  folder: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  ),
  briefcase: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  'file-text': (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  code: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  ),
  settings: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  award: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
    </svg>
  ),
  sliders: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (!isPending && !session && !isLogin) {
      router.push('/admin/login');
    }
  }, [session, isPending, isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (isPending) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--sans)',
          color: 'var(--ink-faint)',
          fontSize: 13,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const sidebarContent = (
    <>
      <div
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 16,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: 32,
          padding: '0 8px',
        }}
      >
        Admin Panel
      </div>

      <nav
        style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                textDecoration: 'none',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
                background: isActive ? 'var(--paper)' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {icons[item.icon]}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: '1px solid var(--line)',
          paddingTop: 16,
          marginTop: 16,
        }}
      >
        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 8,
            textDecoration: 'none',
            fontFamily: 'var(--sans)',
            fontSize: 13,
            color: 'var(--ink-mute)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          View Site
        </Link>
      </div>
    </>
  );

  return (
    <div className="admin-layout">
      {/* Mobile top bar */}
      <div
        className="admin-mobile-toggle"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: 'var(--bone)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 8,
            border: '1px solid var(--line)',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--ink)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--ink)',
          }}
        >
          Admin
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Mobile backdrop */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          minHeight: '100vh',
          background: 'var(--paper)',
        }}
      >
        {/* Desktop sidebar */}
        <aside
          className="admin-sidebar"
          style={{
            background: 'var(--bone)',
            borderRight: '1px solid var(--line)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main
          className="admin-main"
          style={{ padding: '32px 40px', overflowY: 'auto' }}
        >
          {children}
        </main>
      </div>

      <AiAssistant />
    </div>
  );
}
