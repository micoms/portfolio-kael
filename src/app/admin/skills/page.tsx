'use client';

import React, { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  iconKey: string;
  href?: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Skill>({
    id: '',
    name: '',
    iconKey: '',
    href: '',
  });

  useEffect(() => {
    fetch('/api/admin/skills')
      .then((r) => r.json())
      .then((d) => {
        setSkills(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/skills/${form.id}` : '/api/admin/skills';
    const { id, ...body } = form;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      setSkills((prev) =>
        form.id
          ? prev.map((s) => (s.id === saved.id ? saved : s))
          : [...prev, saved],
      );
      setShowForm(false);
      setEditing(null);
      setForm({ id: '', name: '', iconKey: '', href: '' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
    if (res.ok) setSkills((prev) => prev.filter((s) => s.id !== id));
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
            Skills
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {skills.length} skills
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({ id: '', name: '', iconKey: '', href: '' });
            setShowForm(true);
          }}
        >
          Add Skill
        </button>
      </div>

      {(showForm || editing) && (
        <div
          style={{
            padding: '20px 24px',
            background: 'var(--bone)',
            borderRadius: 12,
            border: '1px solid var(--line)',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
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
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
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
                Icon Key
              </label>
              <input
                value={form.iconKey}
                onChange={(e) =>
                  setForm((f) => ({ ...f, iconKey: e.target.value }))
                }
              />
            </div>
            <div>
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
                Href
              </label>
              <input
                value={form.href || ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, href: e.target.value }))
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleSave}>
              {form.id ? 'Update' : 'Create'}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {skills.map((skill) => (
          <div
            key={skill.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              gap: 16,
              alignItems: 'center',
              padding: '12px 20px',
              background: 'var(--bone)',
              borderRadius: 10,
              border: '1px solid var(--line)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--ink)',
              }}
            >
              {skill.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--ink-faint)',
              }}
            >
              {skill.iconKey}
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink-faint)',
              }}
            >
              {skill.href || '—'}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  setForm(skill);
                  setEditing(skill);
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--line)',
                  background: 'transparent',
                  fontFamily: 'var(--sans)',
                  fontSize: 10,
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--coral)',
                  background: 'transparent',
                  fontFamily: 'var(--sans)',
                  fontSize: 10,
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
