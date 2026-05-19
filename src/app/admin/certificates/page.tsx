'use client';

import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Certificate>({
    id: '',
    title: '',
    issuer: '',
    date: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetch('/api/admin/certificates')
      .then((r) => r.json())
      .then((d) => {
        setCerts(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `/api/admin/certificates/${form.id}`
      : '/api/admin/certificates';
    const { id, ...body } = form;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      setCerts((prev) =>
        form.id
          ? prev.map((c) => (c.id === saved.id ? saved : c))
          : [...prev, saved],
      );
      setShowForm(false);
      setEditing(null);
      setForm({ id: '', title: '', issuer: '', date: '', imageUrl: '' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/admin/certificates/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) setCerts((prev) => prev.filter((c) => c.id !== id));
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
            Certificates
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {certs.length} certificates
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({ id: '', title: '', issuer: '', date: '', imageUrl: '' });
            setShowForm(true);
          }}
        >
          Add Certificate
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
              gridTemplateColumns: '1fr 1fr',
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
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
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
                Issuer
              </label>
              <input
                value={form.issuer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, issuer: e.target.value }))
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
                Date
              </label>
              <input
                type="date"
                value={
                  typeof form.date === 'string'
                    ? form.date.split('T')[0]
                    : form.date
                }
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
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
                Image
              </label>
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                endpoint="certificateImage"
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
        {certs.map((cert) => (
          <div
            key={cert.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 1fr 1fr auto',
              gap: 16,
              alignItems: 'center',
              padding: '12px 20px',
              background: 'var(--bone)',
              borderRadius: 10,
              border: '1px solid var(--line)',
            }}
          >
            {cert.imageUrl && (
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
                  src={cert.imageUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--ink)',
              }}
            >
              {cert.title}
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 12,
                color: 'var(--ink-mute)',
              }}
            >
              {cert.issuer}
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--ink-faint)',
              }}
            >
              {new Date(cert.date).toLocaleDateString()}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  setForm(cert);
                  setEditing(cert);
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
                onClick={() => handleDelete(cert.id)}
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
