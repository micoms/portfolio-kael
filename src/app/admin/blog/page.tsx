'use client';

import { ImageUpload } from '@/components/admin/ImageUpload';
import React, { useEffect, useState } from 'react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  content: string;
  isPublished: boolean;
}

const emptyPost: BlogPost = {
  id: '',
  slug: '',
  title: '',
  description: '',
  image: '',
  tags: [],
  date: new Date().toISOString().split('T')[0],
  content: '',
  isPublished: true,
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((d) => {
        setPosts(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async (post: BlogPost) => {
    const method = post.id ? 'PUT' : 'POST';
    const url = post.id ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
    const { id, ...body } = post;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      setPosts((prev) =>
        post.id
          ? prev.map((p) => (p.id === saved.id ? saved : p))
          : [...prev, saved],
      );
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
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
      <BlogForm
        post={editing || emptyPost}
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
            Blog Posts
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {posts.length} posts
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Post
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map((post) => (
          <div
            key={post.id}
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
            {post.image && (
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
                  src={post.image}
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
                {post.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  color: 'var(--ink-faint)',
                  marginTop: 2,
                }}
              >
                {post.slug}
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--ink-faint)',
              }}
            >
              {new Date(post.date).toLocaleDateString()}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setEditing(post)}
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
                onClick={() => handleDelete(post.id)}
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

function BlogForm({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  onSave: (p: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(post);
  const [tagInput, setTagInput] = useState('');

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
        {post.id ? 'Edit' : 'New'} Blog Post
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          maxWidth: 800,
        }}
      >
        <F label="Title">
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </F>
        <F label="Slug">
          <input
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
          />
        </F>
        <div style={{ gridColumn: '1 / -1' }}>
          <F label="Description">
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={2}
            />
          </F>
        </div>
        <F label="Date">
          <input
            type="date"
            value={
              typeof form.date === 'string'
                ? form.date.split('T')[0]
                : form.date
            }
            onChange={(e) => update('date', e.target.value)}
          />
        </F>
        <F label="Image">
          <ImageUpload
            value={form.image}
            onChange={(url) => update('image', url)}
            endpoint="blogImage"
          />
        </F>
        <div style={{ gridColumn: '1 / -1' }}>
          <F label="Tags">
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      update('tags', [...form.tags, tagInput.trim()]);
                      setTagInput('');
                    }
                  }
                }}
                placeholder="Add tag..."
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  if (tagInput.trim()) {
                    update('tags', [...form.tags, tagInput.trim()]);
                    setTagInput('');
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
              {form.tags.map((t, i) => (
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
                  {t}
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        'tags',
                        form.tags.filter((_, j) => j !== i),
                      )
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
        <div style={{ gridColumn: '1 / -1' }}>
          <F label="Content (MDX)">
            <textarea
              value={form.content}
              onChange={(e) => update('content', e.target.value)}
              rows={20}
              style={{ fontFamily: 'var(--mono)', fontSize: 13 }}
            />
          </F>
        </div>
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
            checked={form.isPublished}
            onChange={(e) => update('isPublished', e.target.checked)}
          />
          Published
        </label>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button className="btn btn-primary" onClick={() => onSave(form)}>
          {post.id ? 'Update' : 'Create'}
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
