import React from 'react'

export const Bevaka: React.FC = () => (
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
    <div style={{
      width: 64,
      height: 64,
      borderRadius: 20,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
    </div>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Bevaka</h2>
    <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.5 }}>
      Lägg till fonder och aktier du vill följa.
    </p>
  </div>
)

export const Upptack: React.FC = () => (
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
    <div style={{
      width: 64,
      height: 64,
      borderRadius: 20,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    </div>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Upptäck</h2>
    <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.5 }}>
      Hitta nya fonder och portföljer att inspireras av.
    </p>
  </div>
)
