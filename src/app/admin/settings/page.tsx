'use client';

import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

interface SiteSettings {
  hero: {
    name: string;
    title: string;
    avatar: string;
    skills: { name: string; href: string; component: string }[];
    descriptionTemplate: string;
    buttons: { variant: string; text: string; href: string; icon: string }[];
  };
  about: { name: string; description: string };
  socialLinks: { name: string; href: string; iconKey: string }[];
  cta: { title: string; description: string; calLink: string };
  footer: { text: string };
  meta: Record<string, { title: string; description: string; image?: string }>;
}

const defaultSettings: SiteSettings = {
  hero: {
    name: '',
    title: '',
    avatar: '',
    skills: [],
    descriptionTemplate: '',
    buttons: [],
  },
  about: { name: '', description: '' },
  socialLinks: [],
  cta: { title: '', description: '', calLink: '' },
  footer: { text: '' },
  meta: {},
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        setSettings((prev) => ({
          ...prev,
          hero: d.hero || prev.hero,
          about: d.about || prev.about,
          socialLinks: d.socialLinks || prev.socialLinks,
          cta: d.cta || prev.cta,
          footer: d.footer || prev.footer,
          meta: d.meta || prev.meta,
        }));
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) alert('Settings saved!');
  };

  if (loading)
    return (
      <div
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 13,
          color: 'var(--ink-faint)',
        }}
      >
        Loading...
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 24,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Site Settings
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            Configure your portfolio content.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Section title="Hero">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            <Field
              label="Name"
              value={settings.hero.name}
              onChange={(v) =>
                setSettings((s) => ({ ...s, hero: { ...s.hero, name: v } }))
              }
            />
            <Field
              label="Title"
              value={settings.hero.title}
              onChange={(v) =>
                setSettings((s) => ({ ...s, hero: { ...s.hero, title: v } }))
              }
            />
            <div style={{ gridColumn: '1 / -1' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                }}
              >
                Avatar
              </label>
              <ImageUpload
                value={settings.hero.avatar}
                onChange={(url) =>
                  setSettings((s) => ({
                    ...s,
                    hero: { ...s.hero, avatar: url },
                  }))
                }
                endpoint="avatar"
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field
                label="Description Template"
                value={settings.hero.descriptionTemplate}
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    hero: { ...s.hero, descriptionTemplate: v },
                  }))
                }
                textarea
              />
            </div>
          </div>
        </Section>

        <Section title="About">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <Field
              label="Name"
              value={settings.about.name}
              onChange={(v) =>
                setSettings((s) => ({ ...s, about: { ...s.about, name: v } }))
              }
            />
            <Field
              label="Description"
              value={settings.about.description}
              onChange={(v) =>
                setSettings((s) => ({
                  ...s,
                  about: { ...s.about, description: v },
                }))
              }
              textarea
            />
          </div>
        </Section>

        <Section title="CTA">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            <Field
              label="Title"
              value={settings.cta.title}
              onChange={(v) =>
                setSettings((s) => ({ ...s, cta: { ...s.cta, title: v } }))
              }
            />
            <Field
              label="Cal.com Link"
              value={settings.cta.calLink}
              onChange={(v) =>
                setSettings((s) => ({ ...s, cta: { ...s.cta, calLink: v } }))
              }
            />
            <div style={{ gridColumn: '1 / -1' }}>
              <Field
                label="Description"
                value={settings.cta.description}
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    cta: { ...s.cta, description: v },
                  }))
                }
                textarea
              />
            </div>
          </div>
        </Section>

        <Section title="Footer">
          <Field
            label="Text"
            value={settings.footer.text}
            onChange={(v) =>
              setSettings((s) => ({ ...s, footer: { ...s.footer, text: v } }))
            }
            textarea
          />
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: '24px',
        background: 'var(--bone)',
        borderRadius: 14,
        border: '1px solid var(--line)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
          marginBottom: 20,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--sans)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: 6,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
