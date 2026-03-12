import React, { useState } from 'react'
import { Sparkline } from '../components/Sparkline'
import { usePrivacy } from '../context/PrivacyContext'
import marketData from '../data/market.json'
import portfolioData from '../data/portfolio.json'

const omxSparkData    = [42,44,43,45,43,44,46,44,43,44,45,44.06]
const nasdaqSparkData = [52,51,53,52,50,49,51,50,48,49,47,46.45]
const btcSparkData    = [68,67,69,66,65,67,64,63,65,63,62,61.06]
const brentSparkData  = [72,73,71,74,76,75,77,78,80,82,83,85.07]

const indexSparklines: Record<string, number[]> = {
  omxs30: omxSparkData, nasdaq: nasdaqSparkData,
  bitcoin: btcSparkData, brent: brentSparkData,
}

interface HemProps { onGoToInhehav?: () => void }

export const Hem: React.FC<HemProps> = ({ onGoToInhehav }) => {
  const [activeTab, setActiveTab] = useState<'dig' | 'favoriter'>('dig')
  const { privacyMode, maskKr } = usePrivacy()
  const mainIndices = marketData.indices.slice(0, 2)

  return (
    <div style={{ padding: '4px 0 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 16px', animation: 'fadeUp 0.4s ease forwards' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>Hem</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {privacyMode && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 99,
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.3)',
              fontSize: 11, fontWeight: 600, color: 'var(--positive)',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
              Integritetsläge
            </div>
          )}
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: '#2a2a2a', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 13, fontWeight: 700,
            color: 'var(--text-secondary)', position: 'relative',
          }}>
            WD
            <div style={{ position: 'absolute', top: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', animation: 'fadeUp 0.4s ease 0.04s both' }}>
        {(['dig', 'favoriter'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '7px 16px', borderRadius: 99,
            border: `1.5px solid ${activeTab === tab ? 'var(--text-primary)' : 'var(--border)'}`,
            background: activeTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent',
            color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'inherit', transition: 'all 0.18s',
          }}>
            {tab === 'favoriter' && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
              </svg>
            )}
            {tab === 'dig' ? 'För dig' : 'Favoriter'}
          </button>
        ))}
      </div>

      {/* Index cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px', animation: 'fadeUp 0.4s ease 0.08s both' }}>
        {mainIndices.map(idx => (
          <div key={idx.id} style={{
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)', padding: '14px 14px 12px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: 16 }}>{idx.flag}</span>
              <span style={{ fontWeight: 500 }}>{idx.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: 18, fontWeight: 700,
                color: idx.change >= 0 ? 'var(--positive)' : 'var(--negative)',
                fontFamily: "'DM Mono', monospace",
              }}>
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}%
              </span>
              <Sparkline data={indexSparklines[idx.id] || []} positive={idx.change >= 0} width={72} height={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio performance */}
      <div onClick={onGoToInhehav} style={{
        margin: '14px 16px 0',
        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)', padding: '16px', cursor: 'pointer',
        animation: 'fadeUp 0.4s ease 0.12s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.2px' }}>VÄRDEPAPPERSUTVECKLING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>1 vecka</span>
          <span style={{
            fontSize: 18, fontWeight: 700,
            color: privacyMode ? 'var(--text-secondary)' : 'var(--negative)',
            fontFamily: "'DM Mono', monospace",
            filter: privacyMode ? 'blur(6px)' : 'none',
            userSelect: privacyMode ? 'none' : 'auto',
            transition: 'filter 0.3s ease',
          }}>
            −1 269 kr
          </span>
        </div>
        {portfolioData.funds.map(fund => (
          <div key={fund.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0', borderTop: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `rgba(${fund.color === '#e63946' ? '230,57,70' : '45,106,79'},0.15)`,
                border: `1px solid rgba(${fund.color === '#e63946' ? '230,57,70' : '45,106,79'},0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: fund.color, fontFamily: "'DM Mono', monospace",
              }}>{fund.logo}</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{fund.name.split(' ').slice(0, 3).join(' ')}</span>
            </div>
            <span style={{
              fontSize: 13.5, fontWeight: 600, color: 'var(--negative)',
              fontFamily: "'DM Mono', monospace",
              filter: privacyMode ? 'blur(6px)' : 'none',
              userSelect: privacyMode ? 'none' : 'auto',
              transition: 'filter 0.3s ease',
            }}>
              {fund.id === 'lf-global' ? '−77 kr' : '−154 kr'}
            </span>
          </div>
        ))}
      </div>

      {/* Market summary */}
      <div style={{
        margin: '14px 16px 0',
        background: 'linear-gradient(135deg, #0f0f1a, #0d1117)',
        borderRadius: 'var(--radius-lg)', border: '1px solid rgba(108,99,255,0.15)',
        padding: '16px', animation: 'fadeUp 0.4s ease 0.16s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12 }}>✦</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Marknaden</span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>• 20 min</span>
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-primary)', fontWeight: 400 }}>
          <strong>OMXS30</strong> stängde svagt uppåt efter en dag präglad av kraftig volatilitet och ökade geopolitiska spänningar. Samtidigt backade de amerikanska börserna, däribland <strong>S&P 500</strong>…{' '}
          <span style={{ color: 'var(--positive)' }}>mer</span>
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {marketData.indices.map(idx => (
            <div key={idx.id} style={{
              flexShrink: 0, background: 'rgba(255,255,255,0.04)',
              borderRadius: 12, padding: '8px 12px', minWidth: 90,
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {(idx as any).flag || (idx as any).icon} {idx.name}
              </div>
              <Sparkline data={indexSparklines[idx.id] || []} positive={idx.change >= 0} width={60} height={24} />
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: idx.change >= 0 ? 'var(--positive)' : 'var(--negative)',
                fontFamily: "'DM Mono', monospace", marginTop: 4,
              }}>
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Nyheter för dig</h2>
        {marketData.news.map((n, i) => (
          <div key={n.id} style={{
            padding: '14px 0',
            borderBottom: i < marketData.news.length - 1 ? '1px solid var(--border-light)' : 'none',
            animation: `fadeUp 0.4s ease ${0.2 + i * 0.06}s both`,
          }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: 11.5, color: 'var(--accent)', fontWeight: 600 }}>{n.source}</span>
              <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>• {n.time}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.45, fontWeight: 500 }}>{n.title}</p>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  )
}
