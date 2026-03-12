import React from 'react'

interface StatusBarProps {
  time?: string
  battery?: number
}

export const StatusBar: React.FC<StatusBarProps> = ({ time = '18:35', battery = 72 }) => {
  return (
    <div style={{
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="6" width="3" height="6" rx="1" opacity="0.3"/>
          <rect x="4.5" y="4" width="3" height="8" rx="1" opacity="0.5"/>
          <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 3C10.2 3 12.2 3.9 13.7 5.4L15.1 4C13.2 2.1 10.7 1 8 1C5.3 1 2.8 2.1 0.9 4L2.3 5.4C3.8 3.9 5.8 3 8 3Z" opacity="0.5"/>
          <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C12 4.4 10.1 3.5 8 3.5C5.9 3.5 4 4.4 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z"/>
          <circle cx="8" cy="10" r="1.5"/>
        </svg>
        <div style={{
          background: 'var(--text-primary)',
          borderRadius: 4,
          padding: '2px 6px',
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
          color: '#000',
        }}>{battery}</div>
      </div>
    </div>
  )
}
