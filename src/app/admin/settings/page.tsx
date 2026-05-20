'use client';

import { IconPicker } from '@/components/admin/IconPicker';
import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

type ConfigValue = Record<string, unknown>;

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        padding: '12px 20px',
        borderRadius: 10,
        background: type === 'success' ? 'var(--olive)' : 'var(--coral)',
        color: '#fff',
        fontFamily: 'var(--sans)',
        fontSize: 13,
        fontWeight: 500,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {type === 'success' ? '\u2713 ' : '\u2717 '}
      {message}
    </div>
  );
}

export default function SettingsPage() {
  const [configs, setConfigs] = useState<Record<string, ConfigValue>>({});
  const [originalConfigs, setOriginalConfigs] = useState<
    Record<string, ConfigValue>
  >({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        setConfigs(d);
        setOriginalConfigs(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ message: 'Failed to load settings', type: 'error' });
      });
  }, []);

  const updateConfig = (key: string, value: ConfigValue) => {
    setConfigs((prev) => ({ ...prev, [key]: value }));
  };

  const isDirty = JSON.stringify(configs) !== JSON.stringify(originalConfigs);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configs),
      });
      if (res.ok) {
        setOriginalConfigs(configs);
        setToast({ message: 'Settings saved successfully!', type: 'success' });
      } else {
        const err = await res.json();
        setToast({
          message: err.error || 'Failed to save settings',
          type: 'error',
        });
      }
    } catch {
      setToast({ message: 'Network error - please try again', type: 'error' });
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 13,
            color: 'var(--ink-faint)',
          }}
        >
          Loading settings...
        </div>
      </div>
    );

  const tabs = [
    { key: 'hero', label: 'Hero', icon: '\u2b50' },
    { key: 'about', label: 'About', icon: '\u2139' },
    { key: 'navbar', label: 'Navbar', icon: '\u2630' },
    { key: 'footer', label: 'Footer', icon: '\u2b07' },
    { key: 'topbar', label: 'Topbar', icon: '\u2594' },
    { key: 'cta', label: 'CTA', icon: '\ud83d\udce3' },
    { key: 'resume', label: 'Resume', icon: '\ud83d\udcc4' },
    { key: 'contact', label: 'Contact', icon: '\u2709' },
    { key: 'testimonial', label: 'Testimonial', icon: '\ud83d\udcac' },
    { key: 'capabilities', label: 'Capabilities', icon: '\u2699' },
    { key: 'method', label: 'Method', icon: '\ud83d\udd04' },
    { key: 'labs', label: 'Labs', icon: '\ud83d\udcdd' },
    { key: 'journey', label: 'Journey', icon: '\ud83d\ude80' },
    { key: 'setupLinks', label: 'Setup', icon: '\ud83d\udd27' },
    { key: 'marquee', label: 'Marquee', icon: '\u2728' },
    { key: 'github', label: 'GitHub', icon: '\ud83d\udc31' },
    { key: 'siderails', label: 'Side Rails', icon: '\u2194' },
    { key: 'chat', label: 'Chat Bot', icon: '\ud83e\udd16' },
    { key: 'cat', label: 'Cat', icon: '\ud83d\udc31' },
  ];

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
            Customize every aspect of your portfolio website.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isDirty && (
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--mustard)',
                fontWeight: 600,
              }}
            >
              Unsaved changes
            </span>
          )}
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || !isDirty}
            style={{ opacity: saving || !isDirty ? 0.6 : 1 }}
          >
            {saving ? 'Saving...' : isDirty ? 'Save Changes' : 'Saved'}
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginBottom: 24,
          background: 'var(--bone)',
          borderRadius: 10,
          padding: 4,
          border: '1px solid var(--line)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background:
                activeTab === tab.key ? 'var(--paper)' : 'transparent',
              color: activeTab === tab.key ? 'var(--ink)' : 'var(--ink-mute)',
              fontFamily: 'var(--sans)',
              fontSize: 12,
              fontWeight: activeTab === tab.key ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow:
                activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
  description,
  children,
}: {
  title: string;
  description?: string;
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
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink-faint)',
              marginTop: 4,
            }}
          >
            {description}
          </p>
        )}
      </div>
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
  helpText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
  helpText?: string;
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
      {helpText && (
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: 11,
            color: 'var(--ink-faint)',
            marginTop: 2,
          }}
        >
          {helpText}
        </p>
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
      <Section
        title="Hero Content"
        description="Main hero section on the landing page."
      >
        <div className="admin-grid-3" style={{ marginBottom: 16 }}>
          <Field
            label="Name"
            value={(c.name as string) || ''}
            onChange={(v) => onChange({ ...c, name: v })}
            placeholder="Mikael"
          />
          <Field
            label="Title"
            value={(c.title as string) || ''}
            onChange={(v) => onChange({ ...c, title: v })}
            placeholder="A Full Stack Web Developer"
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
          helpText="Use {skills:0}, {skills:1} etc. to reference skills. Use <b>text</b> for bold."
        />
      </Section>
      <Section
        title="Hero Skills"
        description="Skills shown in the hero description."
      >
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
              placeholder="URL"
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
          + Add Skill
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
    <Section
      title="About Section"
      description="The about section on the landing page."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field
          label="Name"
          value={(c.name as string) || ''}
          onChange={(v) => onChange({ ...c, name: v })}
          placeholder="Mikael Macabali"
        />
        <Field
          label="Description"
          value={(c.description as string) || ''}
          onChange={(v) => onChange({ ...c, description: v })}
          textarea
          placeholder="A short bio about yourself..."
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
      <Section
        title="Navbar Brand"
        description="Brand name and metadata shown in the navigation bar."
      >
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
      <Section
        title="Navigation Items"
        description="Links shown in the navbar and footer."
      >
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
              placeholder="/path"
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
          + Add Nav Item
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
  return (
    <>
      <Section
        title="Footer Brand"
        description="Brand info shown in the footer."
      >
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
            placeholder="14.55\u00b0 N \u00b7 121.02\u00b0 E"
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
          + Add Social Link
        </button>
      </Section>
      <Section title="Tech Stack">
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
        <AddItemRow
          placeholder="Add tech..."
          onAdd={(val) => onChange({ ...c, stackItems: [...stackItems, val] })}
        />
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
    <Section
      title="Top Bar"
      description="The thin bar at the very top of the page."
    >
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
          placeholder="Code \u00b7 Design \u00b7 Engineering"
        />
        <Field
          label="License"
          value={(c.license as string) || ''}
          onChange={(v) => onChange({ ...c, license: v })}
          placeholder="MIT \u00b7 Made on Earth"
        />
        <Field
          label="GitHub URL"
          value={(c.githubUrl as string) || ''}
          onChange={(v) => onChange({ ...c, githubUrl: v })}
        />
        <Field
          label="Status Text"
          value={(c.statusText as string) || ''}
          onChange={(v) => onChange({ ...c, statusText: v })}
          placeholder="Open \u00b7 v1.0"
        />
        <Field
          label="Languages"
          value={(c.languages as string) || ''}
          onChange={(v) => onChange({ ...c, languages: v })}
          placeholder="EN \u00b7 PH"
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
    <Section
      title="CTA Section"
      description="The call-to-action section near the bottom of the landing page."
    >
      <div className="admin-grid-2" style={{ marginBottom: 12 }}>
        <Field
          label="Email"
          value={(c.email as string) || ''}
          onChange={(v) => onChange({ ...c, email: v })}
          placeholder="hello@example.com"
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
    <Section
      title="Resume"
      description="Google Drive embed URL for your resume."
    >
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
    <Section
      title="Contact Page"
      description="Content shown on the /contact page."
    >
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
      <Section
        title="Testimonial"
        description="Featured testimonial on the landing page."
      >
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
            placeholder="Product Lead \u00b7 Northstar Studio"
          />
        </div>
      </Section>
      <Section
        title="Partners / Tech Stack"
        description="Technologies shown in the testimonial section."
      >
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
          + Add Partner
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
                value={item[field] || ''}
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
        + Add Item
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
      <Section
        title="Cities"
        description="City names shown in the marquee ticker."
      >
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
        <AddItemRow
          placeholder="Add city..."
          onAdd={(val) => onChange({ ...c, cities: [...cities, val] })}
        />
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
          + Add Contributor
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
    <Section
      title="GitHub Contribution Graph"
      description="Settings for the GitHub activity section."
    >
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
    <Section
      title="Side Rails"
      description="Text shown on the fixed side rails."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field
          label="Right Rail Text"
          value={(c.rightText as string) || ''}
          onChange={(v) => onChange({ ...c, rightText: v })}
          placeholder="Name \u2014 Portfolio \u00b7 2026 \u00b7 MIT"
        />
        <Field
          label="Left Rail Text"
          value={(c.leftText as string) || ''}
          onChange={(v) => onChange({ ...c, leftText: v })}
          placeholder="Full-Stack \u00b7 Design \u00b7 Engineering \u00b7 Manila"
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
      <Section
        title="Chat Bot"
        description="The AI chat assistant on the public site."
      >
        <Field
          label="Greeting Message"
          value={(c.greeting as string) || ''}
          onChange={(v) => onChange({ ...c, greeting: v })}
          textarea
          placeholder="Hello! I'm your Portfolio Assistant..."
        />
        <div style={{ marginTop: 12 }}>
          <Field
            label="Input Placeholder"
            value={(c.placeholder as string) || ''}
            onChange={(v) => onChange({ ...c, placeholder: v })}
            placeholder="Ask me about my work..."
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
        <AddItemRow
          placeholder="Add suggestion..."
          onAdd={(val) =>
            onChange({ ...c, suggestions: [...suggestions, val] })
          }
        />
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
    <Section
      title="Oneko Cat Easter Egg"
      description="The cat that follows your cursor on the site."
    >
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

function AddItemRow({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (val: string) => void;
}) {
  const [val, setVal] = useState('');
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && val.trim()) {
            onAdd(val.trim());
            setVal('');
          }
        }}
      />
      <button
        onClick={() => {
          if (val.trim()) {
            onAdd(val.trim());
            setVal('');
          }
        }}
        className="btn btn-ghost"
        style={{ fontSize: 12, padding: '6px 14px' }}
      >
        + Add
      </button>
    </div>
  );
}
