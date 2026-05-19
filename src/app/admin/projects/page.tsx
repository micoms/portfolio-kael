'use client';

import { ImageUpload } from '@/components/admin/ImageUpload';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  link?: string;
  github?: string;
  live?: string;
  slug: string;
  status: string;
  featured: boolean;
  isPublished: boolean;
  sortOrder: number;
  technologies: { id: string; name: string; iconKey: string }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProject = {
    id: '',
    title: '',
    description: '',
    image: '',
    video: '',
    link: '',
    github: '',
    live: '',
    slug: '',
    status: 'completed',
    featured: false,
    isPublished: true,
    sortOrder: 0,
    technologies: [],
  };

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (project: Project) => {
    const method = project.id ? 'PUT' : 'POST';
    const url = project.id
      ? `/api/admin/projects/${project.id}`
      : '/api/admin/projects';

    const { id, technologies, ...body } = project;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        technologies: technologies.map((t) => ({
          name: t.name,
          iconKey: t.iconKey,
        })),
      }),
    });

    if (res.ok) {
      const saved = await res.json();
      if (project.id) {
        setProjects((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      } else {
        setProjects((prev) => [...prev, saved]);
      }
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (loading) {
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
  }

  if (showForm || editing) {
    return (
      <ProjectForm
        project={editing || emptyProject}
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
            Projects
          </h1>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              marginTop: 4,
            }}
          >
            {projects.length} projects
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Project
          <span className="arrow">
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {projects.map((project) => (
          <div
            key={project.id}
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
            {project.image && (
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
                  src={project.image}
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
                {project.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  color: 'var(--ink-faint)',
                  marginTop: 2,
                }}
              >
                {project.slug}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  fontFamily: 'var(--sans)',
                  fontSize: 10,
                  color: project.isPublished ? 'var(--olive)' : 'var(--coral)',
                }}
              >
                {project.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setEditing(project)}
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
                onClick={() => handleDelete(project.id)}
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

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(project);
  const [techInput, setTechInput] = useState('');

  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addTech = () => {
    if (!techInput.trim()) return;
    const parts = techInput.split(':');
    const name = parts[0]?.trim() || '';
    const iconKey =
      parts[1]?.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (name) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, { id: '', name, iconKey }],
      }));
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

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
        {project.id ? 'Edit Project' : 'New Project'}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          maxWidth: 700,
        }}
      >
        <FormField label="Title">
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </FormField>
        <FormField label="Slug">
          <input
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
          />
        </FormField>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Description">
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
            />
          </FormField>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Image">
            <ImageUpload
              value={form.image}
              onChange={(url) => update('image', url)}
              endpoint="projectImage"
            />
          </FormField>
        </div>
        <FormField label="Video URL">
          <input
            value={form.video || ''}
            onChange={(e) => update('video', e.target.value)}
          />
        </FormField>
        <FormField label="GitHub URL">
          <input
            value={form.github || ''}
            onChange={(e) => update('github', e.target.value)}
          />
        </FormField>
        <FormField label="Live URL">
          <input
            value={form.live || ''}
            onChange={(e) => update('live', e.target.value)}
          />
        </FormField>
        <FormField label="Link">
          <input
            value={form.link || ''}
            onChange={(e) => update('link', e.target.value)}
          />
        </FormField>
        <FormField label="Status">
          <select
            value={form.status}
            onChange={(e) => update('status', e.target.value)}
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>
        <FormField label="Sort Order">
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => update('sortOrder', parseInt(e.target.value) || 0)}
          />
        </FormField>
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
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            Featured
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
              checked={form.isPublished}
              onChange={(e) => update('isPublished', e.target.checked)}
            />
            Published
          </label>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Technologies (name:iconKey)">
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addTech())
                }
                placeholder="Next.js:nextjs"
              />
              <button
                type="button"
                onClick={addTech}
                className="btn btn-ghost"
                style={{ flexShrink: 0 }}
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
                    onClick={() => removeTech(i)}
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
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button className="btn btn-primary" onClick={() => onSave(form)}>
          {project.id ? 'Update' : 'Create'}
        </button>
        <button className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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
      {children}
    </div>
  );
}
