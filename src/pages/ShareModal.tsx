import React, { useState } from 'react'

interface ShareModalProps {
  onClose: () => void
  onViewShared: (id: string) => void
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose, onViewShared }) => {
  const shareId = 'abc123'
  const shareUrl = `savr.se/dela/${shareId}`
  const [copied, setCopied] = useState(false)

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        zIndex: 150, display: 'flex', alignItems: 'flex-end',
        animation: 'fadeIn 0.2s ease forwards',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', background: '#111',
          borderRadius: '28px 28px 0 0',
          border: '1px solid var(--border)', borderBottom: 'none',
          padding: '12px 24px 40px',
          animation: 'slideUp 0.3s cubic-bezier(0.32,0.72,0,1) forwards',
          maxHeight: '88%', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 24px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'var(--positive-soft)', border: '1px solid rgba(108,99,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Dela portfölj</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Vänner ser % men inga belopp</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: 'var(--radius-md)', padding: '12px 14px', margin: '20px 0',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🔒</span>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 3 }}>Integritetsskyddad delning</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Mottagaren kan se fondutveckling i procent och fördelning — men aldrig dina faktiska belopp.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 10 }}>DE SER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['📈 % Avkastning', '🥧 Fördelning', '📛 Fondnamn', '🕒 Tidsperioder'].map(item => (
              <div key={item} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 99, fontSize: 12.5, color: 'var(--text-secondary)' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--negative)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 10 }}>DE SER INTE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['🚫 Totalt belopp', '🚫 Inköpspris', '🚫 Avkastning i kr'].map(item => (
              <div key={item} style={{ padding: '5px 12px', background: 'var(--negative-soft)', borderRadius: 99, fontSize: 12.5, color: 'rgba(255,69,96,0.7)' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '12px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Delningslänk</div>
            <div style={{ fontSize: 14, fontFamily: "'DM Mono', monospace" }}>{shareUrl}</div>
          </div>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            style={{
              padding: '8px 16px',
              background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${copied ? 'rgba(108,99,255,0.4)' : 'var(--border)'}`,
              borderRadius: 10, color: copied ? 'var(--positive)' : 'var(--text-primary)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >{copied ? '✓ Kopierad' : 'Kopiera'}</button>
        </div>

        <button
          onClick={() => onViewShared(shareId)}
          style={{
            width: '100%', padding: '15px', background: 'var(--positive)',
            border: 'none', borderRadius: 'var(--radius-md)', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          Förhandsgranska delad vy
        </button>
      </div>
    </div>
  )
}
