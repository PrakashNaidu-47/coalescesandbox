// src/App.tsx - Interactive Web Application for CUSTOM-44YT
// Summary: create a website for Game like Chrome Dino.

import React, { useState } from 'react';

interface WorkspaceItem {
  id: number;
  title: string;
  category: string;
  status: 'Active' | 'Completed';
}

export default function GeneratedApplication() {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [items, setItems] = useState<WorkspaceItem[]>([
    { id: 1, title: 'Initialize core workflow state', category: 'Core', status: 'Completed' },
    { id: 2, title: 'Configure interactive controls & filters', category: 'UI', status: 'Active' },
    { id: 3, title: 'Verify domain validation rules', category: 'Quality', status: 'Active' },
  ]);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setItems((prev) => [
      { id: Date.now(), title: trimmed, category: 'Custom', status: 'Active' },
      ...prev,
    ]);
    setNewTitle('');
  };

  const toggleStatus = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Completed' : 'Active' }
          : item,
      ),
    );
  };

  const bg = darkMode ? '#090d16' : '#f8fafc';
  const card = darkMode ? '#111827' : '#ffffff';
  const fg = darkMode ? '#e2e8f0' : '#0f172a';
  const border = darkMode ? '#1f2937' : '#e2e8f0';

  return (
    <div style={{ minHeight: '100vh', background: bg, color: fg, fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#38bdf8' }}>TICKET CUSTOM-44YT</div>
            <h1 style={{ margin: '4px 0', fontSize: '22px' }}>create a website for Game like Chrome Dino.</h1>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.75 }}>Implementation request for ticket CUSTOM-44YT</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: card, color: fg, border: `1px solid ${border}`, borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontWeight: 600 }}
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '11px', opacity: 0.65 }}>TOTAL ITEMS</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{items.length}</div>
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '11px', opacity: 0.65 }}>ACTIVE</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#38bdf8' }}>{items.filter((i) => i.status === 'Active').length}</div>
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '11px', opacity: 0.65 }}>COMPLETED</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>{items.filter((i) => i.status === 'Completed').length}</div>
          </div>
        </div>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add new action item or task..."
            style={{ flex: 2, minWidth: '200px', background: card, color: fg, border: `1px solid ${border}`, borderRadius: '8px', padding: '10px 12px' }}
          />
          <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>
            + Add Entry
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter..."
            style={{ flex: 1, minWidth: '140px', background: card, color: fg, border: `1px solid ${border}`, borderRadius: '8px', padding: '10px 12px' }}
          />
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, textDecoration: item.status === 'Completed' ? 'line-through' : 'none', opacity: item.status === 'Completed' ? 0.65 : 1 }}>{item.title}</div>
                <div style={{ fontSize: '11px', opacity: 0.65 }}>{item.category}</div>
              </div>
              <button
                onClick={() => toggleStatus(item.id)}
                style={{ background: item.status === 'Completed' ? '#16a34a' : '#1e293b', color: '#fff', border: 'none', borderRadius: '999px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}
              >
                {item.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
