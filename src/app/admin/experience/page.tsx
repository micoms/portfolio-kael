'use client';

import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  isCurrent: boolean;
  isBlur: boolean;
  sortOrder: number;
  technologies: { id: string; name: string; href: string; iconKey: string }[];
}

const emptyExp: Experience = {
  id: '',
  company: '',
  position: '',
  location: '',
  image: '',
  description: [''],
  startDate: '',
  endDate: '',
  website: '',
  x: '',
  linkedin: '',
  github: '',
  isCurrent: false,
  isBlur: false,
  sortOrder: 0,
  technologies: [],
};

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/admin/experience')
      .then((r) => r.json())
      .then((d) => {
        setItems(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async (exp: Experience) => {
    const method = exp.id ? 'PUT' : 'POST';
    const url = exp.id
      ? `/api/admin/experience/${exp.id}`
      : '/api/admin/experience';
    const { id, technologies, ...body } = exp;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        technologies: technologies.map((t) => ({
          name: t.name,
          href: t.href,
          iconKey: t.iconKey,
        })),
      }),
    });
    if (res.ok) {
      const saved = await res.json();
      setItems((prev) =>
        exp.id
          ? prev.map((e) => (e.id === saved.id ? saved : e))
          : [...prev, saved],
      );
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/admin/experience/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) setItems((prev) => prev.filter((e) => e.id !== id));
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

  if (showForm || editing) {
    return (
      <ExperienceForm
        exp={editing || emptyExp}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
      />
    );
  }

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
            Experience
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {items.length} entries
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Experience
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((exp) => (
          <div
            key={exp.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr auto auto',
              gap: 16,
              alignItems: 'center',
              padding: '16px 20px',
              background: 'var(--bone)',
              borderRadius: 12,
              border: '1px solid var(--line)',
            }}
          >
            {exp.image && (
              <div
                style={{
                  width: 60,
                  height: 40,
                  borderRadius: 6,
                  overflow: 'hidden',
                  background: 'var(--paper-dark)',
                }}
              >
                <img
                  src={exp.image}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              >
                {exp.position}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  color: 'var(--coral)',
                  marginTop: 2,
                }}
              >
                {exp.company}
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--ink-faint)',
              }}
            >
              {exp.startDate} - {exp.endDate}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setEditing(exp)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--line)',
                  background: 'transparent',
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--coral)',
                  background: 'transparent',
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  cursor: 'pointer',
                  color: 'var(--coral)',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceForm({
  exp,
  onSave,
  onCancel,
}: {
  exp: Experience;
  onSave: (e: Experience) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(exp);
  const [descInput, setDescInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 24,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: 24,
        }}
      >
        {exp.id ? 'Edit' : 'New'} Experience
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          maxWidth: 700,
        }}
      >
        <F label="Company">
          <input
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </F>
        <F label="Position">
          <input
            value={form.position}
            onChange={(e) => update('position', e.target.value)}
          />
        </F>
        <F label="Location">
          <input
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
          />
        </F>
        <F label="Image">
          <ImageUpload
            value={form.image}
            onChange={(url) => update('image', url)}
            endpoint="companyLogo"
          />
        </F>
        <F label="Start Date">
          <input
            value={form.startDate}
            onChange={(e) => update('startDate', e.target.value)}
            placeholder="August 2025"
          />
        </F>
        <F label="End Date">
          <input
            value={form.endDate}
            onChange={(e) => update('endDate', e.target.value)}
            placeholder="Present"
          />
        </F>
        <F label="Website">
          <input
            value={form.website || ''}
            onChange={(e) => update('website', e.target.value)}
          />
        </F>
        <F label="GitHub">
          <input
            value={form.github || ''}
            onChange={(e) => update('github', e.target.value)}
          />
        </F>
        <F label="X / Twitter">
          <input
            value={form.x || ''}
            onChange={(e) => update('x', e.target.value)}
          />
        </F>
        <F label="LinkedIn">
          <input
            value={form.linkedin || ''}
            onChange={(e) => update('linkedin', e.target.value)}
          />
        </F>
        <div style={{ display: 'flex', gap: 16 }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--sans)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={form.isCurrent}
              onChange={(e) => update('isCurrent', e.target.checked)}
            />
            Current
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--sans)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={form.isBlur}
              onChange={(e) => update('isBlur', e.target.checked)}
            />
            Blur
          </label>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <F label="Description (one per line)">
            {form.description.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input
                  value={d}
                  onChange={(e) => {
                    const nd = [...form.description];
                    nd[i] = e.target.value;
                    update('description', nd);
                  }}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() =>
                    update(
                      'description',
                      form.description.filter((_, j) => j !== i),
                    )
                  }
                  style={{
                    background: 'none',
                    border: '1px solid var(--coral)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    color: 'var(--coral)',
                    padding: '0 8px',
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (descInput.trim()) {
                      update('description', [
                        ...form.description,
                        descInput.trim(),
                      ]);
                      setDescInput('');
                    }
                  }
                }}
                placeholder="Add description..."
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  if (descInput.trim()) {
                    update('description', [
                      ...form.description,
                      descInput.trim(),
                    ]);
                    setDescInput('');
                  }
                }}
              >
                Add
              </button>
            </div>
          </F>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <F label="Technologies (name:href:iconKey)">
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const p = techInput.split(':');
                    if (p[0]) {
                      setForm((prev) => ({
                        ...prev,
                        technologies: [
                          ...prev.technologies,
                          {
                            id: '',
                            name: p[0].trim(),
                            href: p[1]?.trim() || '',
                            iconKey:
                              p[2]?.trim() ||
                              p[0]
                                .trim()
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, ''),
                          },
                        ],
                      }));
                      setTechInput('');
                    }
                  }
                }}
                placeholder="Next.js:https://nextjs.org/:nextjs"
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  const p = techInput.split(':');
                  if (p[0]) {
                    setForm((prev) => ({
                      ...prev,
                      technologies: [
                        ...prev.technologies,
                        {
                          id: '',
                          name: p[0].trim(),
                          href: p[1]?.trim() || '',
                          iconKey:
                            p[2]?.trim() ||
                            p[0]
                              .trim()
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, ''),
                        },
                      ],
                    }));
                    setTechInput('');
                  }
                }}
              >
                Add
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginTop: 8,
              }}
            >
              {form.technologies.map((t, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 999,
                    border: '1px solid var(--line)',
                    fontFamily: 'var(--sans)',
                    fontSize: 10,
                  }}
                >
                  {t.name}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        technologies: prev.technologies.filter(
                          (_, j) => j !== i,
                        ),
                      }))
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--coral)',
                      fontSize: 12,
                      padding: 0,
                    }}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </F>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button className="btn btn-primary" onClick={() => onSave(form)}>
          {exp.id ? 'Update' : 'Create'}
        </button>
        <button className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
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
      {children}
    </div>
  );
}
