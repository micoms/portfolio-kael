'use client';

import { IconPicker } from '@/components/admin/IconPicker';
import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

type ConfigValue = Record<string, unknown>;

export default function SettingsPage() {
  const [configs, setConfigs] = useState<Record<string, ConfigValue>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        setConfigs(d);
        setLoading(false);
      });
  }, []);

  const updateConfig = (key: string, value: ConfigValue) => {
    setConfigs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configs),
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

  const tabs = [
    { key: 'hero', label: 'Hero' },
    { key: 'about', label: 'About' },
    { key: 'navbar', label: 'Navbar' },
    { key: 'footer', label: 'Footer' },
    { key: 'topbar', label: 'Topbar' },
    { key: 'cta', label: 'CTA' },
    { key: 'resume', label: 'Resume' },
    { key: 'contact', label: 'Contact' },
    { key: 'testimonial', label: 'Testimonial' },
    { key: 'capabilities', label: 'Capabilities' },
    { key: 'method', label: 'Method' },
    { key: 'labs', label: 'Labs' },
    { key: 'journey', label: 'Journey' },
    { key: 'setupLinks', label: 'Setup Links' },
    { key: 'marquee', label: 'Marquee' },
    { key: 'github', label: 'GitHub' },
    { key: 'siderails', label: 'Side Rails' },
    { key: 'chat', label: 'Chat Bot' },
    { key: 'cat', label: 'Cat' },
  ];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
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
            Configure all aspects of your portfolio.
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

      {/* Tab navigation */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          marginBottom: 24,
          borderBottom: '1px solid var(--line)',
          paddingBottom: 12,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === tab.key ? 'var(--ink)' : 'transparent',
              color: activeTab === tab.key ? 'var(--paper)' : 'var(--ink-mute)',
              fontFamily: 'var(--sans)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {activeTab === 'hero' && (
          <HeroSection
            config={configs.hero || {}}
            onChange={(v) => updateConfig('hero', v)}
          />
        )}
        {activeTab === 'about' && (
          <AboutSection
            config={configs.about || {}}
            onChange={(v) => updateConfig('about', v)}
          />
        )}
        {activeTab === 'navbar' && (
          <NavbarSection
            config={configs.navbar || {}}
            onChange={(v) => updateConfig('navbar', v)}
          />
        )}
        {activeTab === 'footer' && (
          <FooterSection
            config={configs.footer || {}}
            onChange={(v) => updateConfig('footer', v)}
          />
        )}
        {activeTab === 'topbar' && (
          <TopbarSection
            config={configs.topbar || {}}
            onChange={(v) => updateConfig('topbar', v)}
          />
        )}
        {activeTab === 'cta' && (
          <CtaSection
            config={configs.cta || {}}
            onChange={(v) => updateConfig('cta', v)}
          />
        )}
        {activeTab === 'resume' && (
          <ResumeSection
            config={configs.resume || {}}
            onChange={(v) => updateConfig('resume', v)}
          />
        )}
        {activeTab === 'contact' && (
          <ContactSection
            config={configs.contact || {}}
            onChange={(v) => updateConfig('contact', v)}
          />
        )}
        {activeTab === 'testimonial' && (
          <TestimonialSection
            config={configs.testimonial || {}}
            onChange={(v) => updateConfig('testimonial', v)}
          />
        )}
        {activeTab === 'capabilities' && (
          <ArraySection
            config={(configs.capabilities || []) as unknown as ConfigValue}
            onChange={(v) => updateConfig('capabilities', v)}
            title="Capabilities"
            fields={['num', 'tag', 'title', 'desc']}
          />
        )}
        {activeTab === 'method' && (
          <ArraySection
            config={(configs.method || []) as unknown as ConfigValue}
            onChange={(v) => updateConfig('method', v)}
            title="Method Steps"
            fields={['num', 'title', 'desc']}
          />
        )}
        {activeTab === 'labs' && (
          <ArraySection
            config={(configs.labs || []) as unknown as ConfigValue}
            onChange={(v) => updateConfig('labs', v)}
            title="Labs"
            fields={['num', 'year', 'badge', 'title', 'desc', 'category']}
          />
        )}
        {activeTab === 'journey' && (
          <ArraySection
            config={(configs.journey || []) as unknown as ConfigValue}
            onChange={(v) => updateConfig('journey', v)}
            title="Journey Items"
            fields={['name', 'desc', 'href']}
          />
        )}
        {activeTab === 'setupLinks' && (
          <ArraySection
            config={(configs.setupLinks || []) as unknown as ConfigValue}
            onChange={(v) => updateConfig('setupLinks', v)}
            title="Setup Links"
            fields={['name', 'desc', 'href']}
          />
        )}
        {activeTab === 'marquee' && (
          <MarqueeSection
            config={configs.marquee || {}}
            onChange={(v) => updateConfig('marquee', v)}
          />
        )}
        {activeTab === 'github' && (
          <GithubSection
            config={configs.github || {}}
            onChange={(v) => updateConfig('github', v)}
          />
        )}
        {activeTab === 'siderails' && (
          <SiderailsSection
            config={configs.siderails || {}}
            onChange={(v) => updateConfig('siderails', v)}
          />
        )}
        {activeTab === 'chat' && (
          <ChatSection
            config={configs.chat || {}}
            onChange={(v) => updateConfig('chat', v)}
          />
        )}
        {activeTab === 'cat' && (
          <CatSection
            config={configs.cat || {}}
            onChange={(v) => updateConfig('cat', v)}
          />
        )}
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
        padding: '20px 24px',
        background: 'var(--bone)',
        borderRadius: 12,
        border: '1px solid var(--line)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--ink)',
          marginBottom: 16,
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
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
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function HeroSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const skills =
    (c.skills as { name: string; href: string; component: string }[]) || [];
  return (
    <>
      <Section title="Hero Content">
        <div className="admin-grid-3" style={{ marginBottom: 16 }}>
          <Field
            label="Name"
            value={(c.name as string) || ''}
            onChange={(v) => onChange({ ...c, name: v })}
          />
          <Field
            label="Title"
            value={(c.title as string) || ''}
            onChange={(v) => onChange({ ...c, title: v })}
          />
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--sans)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Avatar
            </label>
            <ImageUpload
              value={(c.avatar as string) || ''}
              onChange={(url) => onChange({ ...c, avatar: url })}
              endpoint="avatar"
            />
          </div>
        </div>
        <Field
          label="Description Template"
          value={(c.descriptionTemplate as string) || ''}
          onChange={(v) => onChange({ ...c, descriptionTemplate: v })}
          textarea
        />
      </Section>
      <Section title="Hero Skills">
        {skills.map((skill, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              value={skill.name}
              onChange={(e) => {
                const ns = [...skills];
                ns[i] = { ...ns[i], name: e.target.value };
                onChange({ ...c, skills: ns });
              }}
              placeholder="Name"
            />
            <input
              value={skill.href}
              onChange={(e) => {
                const ns = [...skills];
                ns[i] = { ...ns[i], href: e.target.value };
                onChange({ ...c, skills: ns });
              }}
              placeholder="Href"
            />
            <IconPicker
              value={skill.component || ''}
              onChange={(v) => {
                const ns = [...skills];
                ns[i] = { ...ns[i], component: v };
                onChange({ ...c, skills: ns });
              }}
            />
            <button
              onClick={() => {
                const ns = skills.filter((_, j) => j !== i);
                onChange({ ...c, skills: ns });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...c,
              skills: [...skills, { name: '', href: '', component: '' }],
            })
          }
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Add Skill
        </button>
      </Section>
    </>
  );
}

function AboutSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="About">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field
          label="Name"
          value={(c.name as string) || ''}
          onChange={(v) => onChange({ ...c, name: v })}
        />
        <Field
          label="Description"
          value={(c.description as string) || ''}
          onChange={(v) => onChange({ ...c, description: v })}
          textarea
        />
      </div>
    </Section>
  );
}

function NavbarSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const navItems = (c.navItems as { label: string; href: string }[]) || [];
  return (
    <>
      <Section title="Navbar Brand">
        <div className="admin-grid-4">
          <Field
            label="Brand Name"
            value={(c.brandName as string) || ''}
            onChange={(v) => onChange({ ...c, brandName: v })}
            placeholder="Mikael Macabali"
          />
          <Field
            label="Title"
            value={(c.title as string) || ''}
            onChange={(v) => onChange({ ...c, title: v })}
            placeholder="Full-Stack Developer"
          />
          <Field
            label="Location"
            value={(c.location as string) || ''}
            onChange={(v) => onChange({ ...c, location: v })}
            placeholder="Manila / Remote"
          />
          <Field
            label="GitHub URL"
            value={(c.githubUrl as string) || ''}
            onChange={(v) => onChange({ ...c, githubUrl: v })}
            placeholder="https://github.com/..."
          />
        </div>
      </Section>
      <Section title="Navigation Items">
        {navItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              value={item.label}
              onChange={(e) => {
                const ns = [...navItems];
                ns[i] = { ...ns[i], label: e.target.value };
                onChange({ ...c, navItems: ns });
              }}
              placeholder="Label"
            />
            <input
              value={item.href}
              onChange={(e) => {
                const ns = [...navItems];
                ns[i] = { ...ns[i], href: e.target.value };
                onChange({ ...c, navItems: ns });
              }}
              placeholder="Href"
            />
            <button
              onClick={() => {
                const ns = navItems.filter((_, j) => j !== i);
                onChange({ ...c, navItems: ns });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange({ ...c, navItems: [...navItems, { label: '', href: '' }] })
          }
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Add Nav Item
        </button>
      </Section>
    </>
  );
}

function FooterSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const socialLinks = (c.socialLinks as { name: string; href: string }[]) || [];
  const stackItems = (c.stackItems as string[]) || [];
  const metaItems = (c.metaItems as string[]) || [];
  return (
    <>
      <Section title="Footer Brand">
        <div className="admin-grid-2" style={{ marginBottom: 12 }}>
          <Field
            label="Brand Name"
            value={(c.brandName as string) || ''}
            onChange={(v) => onChange({ ...c, brandName: v })}
            placeholder="Mikael Macabali"
          />
          <Field
            label="Location"
            value={(c.location as string) || ''}
            onChange={(v) => onChange({ ...c, location: v })}
            placeholder="Manila / Remote"
          />
        </div>
        <Field
          label="Description"
          value={(c.description as string) || ''}
          onChange={(v) => onChange({ ...c, description: v })}
          textarea
        />
        <div className="admin-grid-2" style={{ marginTop: 12 }}>
          <Field
            label="Coordinates"
            value={(c.coordinates as string) || ''}
            onChange={(v) => onChange({ ...c, coordinates: v })}
            placeholder="14.55° N · 121.02° E"
          />
        </div>
      </Section>
      <Section title="Social Links">
        {socialLinks.map((link, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              value={link.name}
              onChange={(e) => {
                const ns = [...socialLinks];
                ns[i] = { ...ns[i], name: e.target.value };
                onChange({ ...c, socialLinks: ns });
              }}
              placeholder="Name"
            />
            <input
              value={link.href}
              onChange={(e) => {
                const ns = [...socialLinks];
                ns[i] = { ...ns[i], href: e.target.value };
                onChange({ ...c, socialLinks: ns });
              }}
              placeholder="URL"
            />
            <button
              onClick={() => {
                const ns = socialLinks.filter((_, j) => j !== i);
                onChange({ ...c, socialLinks: ns });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...c,
              socialLinks: [...socialLinks, { name: '', href: '' }],
            })
          }
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Add Social Link
        </button>
      </Section>
      <Section title="Stack Items">
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}
        >
          {stackItems.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 12,
              }}
            >
              {item}
              <button
                onClick={() => {
                  const ns = stackItems.filter((_, j) => j !== i);
                  onChange({ ...c, stackItems: ns });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--coral)',
                  fontSize: 14,
                  padding: 0,
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            id="stack-input"
            placeholder="Add stack item..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) {
                  onChange({ ...c, stackItems: [...stackItems, val] });
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
          <button
            onClick={() => {
              const el = document.getElementById(
                'stack-input',
              ) as HTMLInputElement;
              const val = el?.value?.trim();
              if (val) {
                onChange({ ...c, stackItems: [...stackItems, val] });
                el.value = '';
              }
            }}
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            Add
          </button>
        </div>
      </Section>
    </>
  );
}

function TopbarSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="Topbar">
      <div className="admin-grid-3">
        <Field
          label="Version"
          value={(c.version as string) || ''}
          onChange={(v) => onChange({ ...c, version: v })}
          placeholder="M / 2026"
        />
        <Field
          label="Categories"
          value={(c.categories as string) || ''}
          onChange={(v) => onChange({ ...c, categories: v })}
          placeholder="Code · Design · Engineering"
        />
        <Field
          label="License"
          value={(c.license as string) || ''}
          onChange={(v) => onChange({ ...c, license: v })}
          placeholder="MIT · Made on Earth"
        />
        <Field
          label="GitHub URL"
          value={(c.githubUrl as string) || ''}
          onChange={(v) => onChange({ ...c, githubUrl: v })}
          placeholder="https://github.com/..."
        />
        <Field
          label="Status Text"
          value={(c.statusText as string) || ''}
          onChange={(v) => onChange({ ...c, statusText: v })}
          placeholder="Open · v1.0"
        />
        <Field
          label="Languages"
          value={(c.languages as string) || ''}
          onChange={(v) => onChange({ ...c, languages: v })}
          placeholder="EN · PH"
        />
      </div>
    </Section>
  );
}

function CtaSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="CTA Section">
      <div className="admin-grid-2" style={{ marginBottom: 12 }}>
        <Field
          label="Email"
          value={(c.email as string) || ''}
          onChange={(v) => onChange({ ...c, email: v })}
          placeholder="mikaelmacabali@gmail.com"
        />
        <Field
          label="Title"
          value={(c.title as string) || ''}
          onChange={(v) => onChange({ ...c, title: v })}
        />
      </div>
      <Field
        label="Description"
        value={(c.description as string) || ''}
        onChange={(v) => onChange({ ...c, description: v })}
        textarea
      />
    </Section>
  );
}

function ResumeSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="Resume">
      <Field
        label="Google Drive Embed URL"
        value={(c.url as string) || ''}
        onChange={(v) => onChange({ ...c, url: v })}
        placeholder="https://drive.google.com/file/d/.../preview"
      />
    </Section>
  );
}

function ContactSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="Contact Page">
      <div className="admin-grid-2" style={{ marginBottom: 12 }}>
        <Field
          label="Title"
          value={(c.title as string) || ''}
          onChange={(v) => onChange({ ...c, title: v })}
          placeholder="Contact"
        />
      </div>
      <Field
        label="Description"
        value={(c.description as string) || ''}
        onChange={(v) => onChange({ ...c, description: v })}
        textarea
      />
    </Section>
  );
}

function TestimonialSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const partners = (c.partners as { name: string; category: string }[]) || [];
  return (
    <>
      <Section title="Testimonial">
        <Field
          label="Quote"
          value={(c.quote as string) || ''}
          onChange={(v) => onChange({ ...c, quote: v })}
          textarea
        />
        <div className="admin-grid-2" style={{ marginTop: 12 }}>
          <Field
            label="Author Name"
            value={(c.author as string) || ''}
            onChange={(v) => onChange({ ...c, author: v })}
            placeholder="Sofia Reyes"
          />
          <Field
            label="Author Role"
            value={(c.role as string) || ''}
            onChange={(v) => onChange({ ...c, role: v })}
            placeholder="Product Lead · Northstar Studio"
          />
        </div>
      </Section>
      <Section title="Partners / Tech Stack">
        {partners.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              value={p.name}
              onChange={(e) => {
                const ns = [...partners];
                ns[i] = { ...ns[i], name: e.target.value };
                onChange({ ...c, partners: ns });
              }}
              placeholder="Name"
            />
            <input
              value={p.category}
              onChange={(e) => {
                const ns = [...partners];
                ns[i] = { ...ns[i], category: e.target.value };
                onChange({ ...c, partners: ns });
              }}
              placeholder="Category"
            />
            <button
              onClick={() => {
                const ns = partners.filter((_, j) => j !== i);
                onChange({ ...c, partners: ns });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...c,
              partners: [...partners, { name: '', category: '' }],
            })
          }
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Add Partner
        </button>
      </Section>
    </>
  );
}

function ArraySection({
  config,
  onChange,
  title,
  fields,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
  title: string;
  fields: string[];
}) {
  const items = Array.isArray(config)
    ? (config as Record<string, string>[])
    : [];
  return (
    <Section title={title}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: '12px',
            background: 'var(--paper)',
            borderRadius: 8,
            border: '1px solid var(--line-soft)',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${fields.length}, 1fr) auto`,
              gap: 8,
            }}
          >
            {fields.map((field) => (
              <input
                key={field}
                value={(item as Record<string, string>)[field] || ''}
                onChange={(e) => {
                  const ns = [...items];
                  ns[i] = { ...ns[i], [field]: e.target.value };
                  onChange(ns as unknown as ConfigValue);
                }}
                placeholder={field}
              />
            ))}
            <button
              onClick={() => {
                const ns = items.filter((_, j) => j !== i);
                onChange(ns as unknown as ConfigValue);
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newItem: Record<string, string> = {};
          fields.forEach((f) => {
            newItem[f] = '';
          });
          onChange([...items, newItem] as unknown as ConfigValue);
        }}
        className="btn btn-ghost"
        style={{ fontSize: 12, padding: '6px 14px' }}
      >
        Add {title}
      </button>
    </Section>
  );
}

function MarqueeSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const cities = (c.cities as string[]) || [];
  const contributors =
    (c.contributors as { handle: string; role: string }[]) || [];
  return (
    <>
      <Section title="Cities">
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}
        >
          {cities.map((city, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 12,
              }}
            >
              {city}
              <button
                onClick={() => {
                  const ns = cities.filter((_, j) => j !== i);
                  onChange({ ...c, cities: ns });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--coral)',
                  fontSize: 14,
                  padding: 0,
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            id="city-input"
            placeholder="Add city..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) {
                  onChange({ ...c, cities: [...cities, val] });
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
          <button
            onClick={() => {
              const el = document.getElementById(
                'city-input',
              ) as HTMLInputElement;
              const val = el?.value?.trim();
              if (val) {
                onChange({ ...c, cities: [...cities, val] });
                el.value = '';
              }
            }}
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            Add
          </button>
        </div>
      </Section>
      <Section title="Contributors">
        {contributors.map((contrib, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              value={contrib.handle}
              onChange={(e) => {
                const ns = [...contributors];
                ns[i] = { ...ns[i], handle: e.target.value };
                onChange({ ...c, contributors: ns });
              }}
              placeholder="@handle"
            />
            <input
              value={contrib.role}
              onChange={(e) => {
                const ns = [...contributors];
                ns[i] = { ...ns[i], role: e.target.value };
                onChange({ ...c, contributors: ns });
              }}
              placeholder="Role"
            />
            <button
              onClick={() => {
                const ns = contributors.filter((_, j) => j !== i);
                onChange({ ...c, contributors: ns });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--coral)',
                background: 'transparent',
                color: 'var(--coral)',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              Del
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange({
              ...c,
              contributors: [...contributors, { handle: '', role: '' }],
            })
          }
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Add Contributor
        </button>
      </Section>
    </>
  );
}

function GithubSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="GitHub Contribution Graph">
      <div className="admin-grid-2">
        <Field
          label="Username"
          value={(c.username as string) || ''}
          onChange={(v) => onChange({ ...c, username: v })}
          placeholder="micoms"
        />
        <Field
          label="API URL"
          value={(c.apiUrl as string) || ''}
          onChange={(v) => onChange({ ...c, apiUrl: v })}
          placeholder="https://github-contributions-api.deno.dev"
        />
      </div>
    </Section>
  );
}

function SiderailsSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="Side Rails">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field
          label="Right Rail Text"
          value={(c.rightText as string) || ''}
          onChange={(v) => onChange({ ...c, rightText: v })}
          placeholder="Mikael Macabali — Portfolio · 2026 · MIT"
        />
        <Field
          label="Left Rail Text"
          value={(c.leftText as string) || ''}
          onChange={(v) => onChange({ ...c, leftText: v })}
          placeholder="Full-Stack · Design · Engineering · Manila"
        />
      </div>
    </Section>
  );
}

function ChatSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  const suggestions = (c.suggestions as string[]) || [];
  return (
    <>
      <Section title="Chat Bot">
        <Field
          label="Greeting Message"
          value={(c.greeting as string) || ''}
          onChange={(v) => onChange({ ...c, greeting: v })}
          textarea
          placeholder="Hello! I'm Mikael's Portfolio Assistant..."
        />
        <div style={{ marginTop: 12 }}>
          <Field
            label="Input Placeholder"
            value={(c.placeholder as string) || ''}
            onChange={(v) => onChange({ ...c, placeholder: v })}
            placeholder="Ask me about my work and experience..."
          />
        </div>
      </Section>
      <Section title="Quick Suggestions">
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}
        >
          {suggestions.map((s, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 12,
              }}
            >
              {s}
              <button
                onClick={() => {
                  const ns = suggestions.filter((_, j) => j !== i);
                  onChange({ ...c, suggestions: ns });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--coral)',
                  fontSize: 14,
                  padding: 0,
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            id="suggestion-input"
            placeholder="Add suggestion..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) {
                  onChange({ ...c, suggestions: [...suggestions, val] });
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
          <button
            onClick={() => {
              const el = document.getElementById(
                'suggestion-input',
              ) as HTMLInputElement;
              const val = el?.value?.trim();
              if (val) {
                onChange({ ...c, suggestions: [...suggestions, val] });
                el.value = '';
              }
            }}
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            Add
          </button>
        </div>
      </Section>
    </>
  );
}

function CatSection({
  config,
  onChange,
}: {
  config: ConfigValue;
  onChange: (v: ConfigValue) => void;
}) {
  const c = config as Record<string, unknown>;
  return (
    <Section title="Oneko Cat Easter Egg">
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--sans)',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={(c.enabled as boolean) ?? true}
          onChange={(e) => onChange({ ...c, enabled: e.target.checked })}
        />
        Enable cat animation
      </label>
    </Section>
  );
}
