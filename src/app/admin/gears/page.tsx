'use client';

import React, { useEffect, useState } from 'react';

interface Gear {
  id: string;
  name: string;
  iconKey?: string;
  href?: string;
  category: string;
}

export default function GearsPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Gear | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Gear>({
    id: '',
    name: '',
    iconKey: '',
    href: '',
    category: 'device',
  });

  useEffect(() => {
    fetch('/api/admin/gears')
      .then((r) => r.json())
      .then((d) => {
        setGears(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/gears/${form.id}` : '/api/admin/gears';
    const { id, ...body } = form;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      setGears((prev) =>
        form.id
          ? prev.map((g) => (g.id === saved.id ? saved : g))
          : [...prev, saved],
      );
      setShowForm(false);
      setEditing(null);
      setForm({ id: '', name: '', iconKey: '', href: '', category: 'device' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/admin/gears/${id}`, { method: 'DELETE' });
    if (res.ok) setGears((prev) => prev.filter((g) => g.id !== id));
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

  const categories = ['device', 'extension', 'software'];

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
            Gears
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {gears.length} items
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({
              id: '',
              name: '',
              iconKey: '',
              href: '',
              category: 'device',
            });
            setShowForm(true);
          }}
        >
          Add Gear
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
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
                value={form.iconKey || ''}
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
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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

      {categories.map((cat) => {
        const items = gears.filter((g) => g.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 10,
              }}
            >
              {cat}s
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map((gear) => (
                <div
                  key={gear.id}
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
                    {gear.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--ink-faint)',
                    }}
                  >
                    {gear.iconKey || '—'}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 11,
                      color: 'var(--ink-faint)',
                    }}
                  >
                    {gear.href || '—'}
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        setForm(gear);
                        setEditing(gear);
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
                      onClick={() => handleDelete(gear.id)}
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
      })}
    </div>
  );
}
