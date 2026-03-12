import React, { useState } from 'react'
import { FundLogo } from '../components/FundLogo'
import { usePrivacy } from '../context/PrivacyContext'
import portfolioData from '../data/portfolio.json'

// ─── Portfolio chart ─────────────────────────────────────────────────────────
const PortfolioChart: React.FC = () => {
  const data = portfolioData.chartData.map(d => d.value)
  const min = Math.min(...data), max = Math.max(...data)
  const w = 358, h = 160
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min)) * (h - 20) - 10,
  ])
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6c63ff" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <line x1="0" y1={h-8} x2={w} y2={h-8} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4"/>
      <path d={`${pathD} L${w},${h} L0,${h} Z`} fill="url(#pf)"/>
      <path d={pathD} stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill="#6c63ff"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="8" fill="rgba(108,99,255,0.2)"/>
    </svg>
  )
}

// ─── Blurred amount ───────────────────────────────────────────────────────────
const Amount: React.FC<{
  value: number; prefix?: string; suffix?: string
  style?: React.CSSProperties; colorPositive?: boolean
}> = ({ value, prefix = '', suffix = ' kr', style, colorPositive }) => {
  const { privacyMode } = usePrivacy()
  const sign = value >= 0 ? prefix : '−'
  const color = colorPositive ? (value >= 0 ? 'var(--positive)' : 'var(--negative)') : undefined
  return (
    <span style={{
      filter: privacyMode ? 'blur(7px)' : 'none',
      userSelect: privacyMode ? 'none' : 'auto',
      transition: 'filter 0.35s cubic-bezier(0.4,0,0.2,1)',
      display: 'inline-block', color, ...style,
    }}>
      {sign}{Math.abs(value).toLocaleString('sv-SE')}{suffix}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
interface InhehavProps {
  onViewShared: (id: string) => void
  onOpenShare: () => void
}

export const Innehav: React.FC<InhehavProps> = ({ onViewShared, onOpenShare }) => {
  const [activeTab, setActiveTab] = useState('innehav')
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const { account, funds } = portfolioData
  const { privacyMode, togglePrivacy } = usePrivacy()

  const tabs = ['Innehav', 'Ordrar', 'Analys', 'Transaktioner', 'Konton']

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>

      {/* ── Header ── */}
      <div style={{ padding: '4px 20px 0', animation: 'fadeUp 0.4s ease forwards' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: '#1a1a2e', border: '1px solid rgba(108,99,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: 'var(--positive)',
            }}>ISK</div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>{account.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              padding: '6px 12px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: 10,
              color: 'var(--text-primary)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>kr</button>
            <button
              onClick={() => setShowActionsMenu(true)}
              style={{
                width: 34, height: 34, background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: 10,
                color: 'var(--text-secondary)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
              }}
            >
              {[0,1,2].map(i => <div key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'currentColor' }}/>)}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 99,
              border: `1.5px solid ${activeTab === tab.toLowerCase() ? 'var(--text-primary)' : 'var(--border)'}`,
              background: activeTab === tab.toLowerCase() ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeTab === tab.toLowerCase() ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.18s', whiteSpace: 'nowrap',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 0', animation: 'fadeUp 0.4s ease 0.06s both' }}>

        {/* ── Total value card ── */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: `1px solid ${privacyMode ? 'rgba(108,99,255,0.25)' : 'var(--border)'}`,
          padding: '18px 20px 4px', marginBottom: 14,
          transition: 'border-color 0.35s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-1px', fontFamily: "'DM Mono', monospace" }}>
                <Amount value={account.totalValue} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                <Amount value={account.available} suffix=" kr tillgängligt" />
              </div>
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>Sedan start</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                <Amount value={account.totalReturn} prefix="+" style={{ color: 'var(--positive)' }} />
              </div>
            </div>
          </div>
          <PortfolioChart />
        </div>

        {/* ── Funds ── */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)', padding: '16px', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Fonder</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: "'DM Mono', monospace" }}>
                <Amount value={account.totalValue - account.available} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--negative)', fontFamily: "'DM Mono', monospace" }}>−0,06%</span>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>1 dag</span>
            </div>
          </div>

          {funds.map((fund, i) => (
            <div key={fund.id} style={{ paddingTop: i === 0 ? 0 : 14, borderTop: i === 0 ? 'none' : '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <FundLogo abbr={fund.logo} color={fund.color} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.3 }}>{fund.name}</div>
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                  <Amount value={fund.value} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                {[
                  { label: 'Igår',      value: fund.yesterday,      pct: true },
                  { label: '3 mån',     value: fund.threeMonths,    pct: true },
                  { label: 'Sedan köp', value: fund.returnSinceBuy, money: true },
                  { label: 'Värde',     value: fund.value },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{m.label}</div>
                    {m.pct ? (
                      <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: m.value >= 0 ? 'var(--positive)' : 'var(--negative)' }}>
                        {m.value >= 0 ? '+' : ''}{m.value.toFixed(2)}%
                      </div>
                    ) : (
                      <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                        <Amount value={m.value} prefix={m.money && m.value >= 0 ? '+' : ''} colorPositive={!!m.money} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Share CTA ── */}
        <div
          onClick={onOpenShare}
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(108,99,255,0.06))',
            border: '1px solid rgba(108,99,255,0.25)', borderRadius: 'var(--radius-lg)',
            padding: '16px', display: 'flex', alignItems: 'center', gap: 14,
            marginBottom: 14, cursor: 'pointer',
            animation: 'fadeUp 0.4s ease 0.2s both',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Dela din portfölj</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Vänner ser % uppgång — aldrig belopp</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>

        {/* ── Shortcuts ── */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 14,
        }}>
          <div style={{ padding: '16px 16px 8px' }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Genvägar</span>
          </div>
          {[
            { icon: '↓', label: 'Sätt in pengar' },
            { icon: '↑', label: 'Ta ut pengar' },
            { icon: '⇄', label: 'Intern överföring' },
            { icon: '↺', label: 'Skapa nytt autospar' },
            { icon: '⤓', label: 'Flytta från annan bank' },
            { icon: '⚙', label: 'Kontoinställningar' },
            { icon: null, label: 'Integritetsläge', isPrivacy: true },
            { icon: '+', label: 'Öppna nytt konto' },
          ].map((item, i) => (
            <div
              key={item.label}
              onClick={item.isPrivacy ? togglePrivacy : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderTop: '1px solid var(--border-light)',
                cursor: 'pointer',
                background: item.isPrivacy && privacyMode ? 'rgba(108,99,255,0.07)' : 'transparent',
                transition: 'background 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Icon box */}
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: item.isPrivacy && privacyMode ? 'rgba(108,99,255,0.22)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${item.isPrivacy && privacyMode ? 'rgba(108,99,255,0.4)' : 'transparent'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  {item.isPrivacy ? (
                    privacyMode ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )
                  ) : (
                    <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{item.icon}</span>
                  )}
                </div>
                <span style={{
                  fontSize: 15, fontWeight: 400,
                  color: item.isPrivacy && privacyMode ? 'var(--positive)' : 'var(--text-primary)',
                  transition: 'color 0.3s',
                }}>{item.label}</span>
              </div>

              {/* Right side: toggle for privacy, chevron for others */}
              {item.isPrivacy ? (
                <div style={{
                  width: 40, height: 22, borderRadius: 99, position: 'relative',
                  background: privacyMode ? 'var(--positive)' : '#333',
                  transition: 'background 0.3s',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: 3,
                    left: privacyMode ? 21 : 3,
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
                  }}/>
                </div>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* ── Actions dropdown ── */}
      {showActionsMenu && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 140 }} onClick={() => setShowActionsMenu(false)}>
          <div style={{
            position: 'absolute', top: 70, right: 20,
            background: '#1c1c1e', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)', overflow: 'hidden', minWidth: 220,
            animation: 'scaleIn 0.18s ease forwards', transformOrigin: 'top right',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }} onClick={e => e.stopPropagation()}>
            {['Sätt in pengar','Ta ut pengar','Intern överföring','Skapa nytt autospar','Flytta från annan bank','Kontoinställningar','Öppna nytt konto'].map((label, i) => (
              <div key={label} style={{
                padding: '14px 18px', borderTop: i > 0 ? '1px solid var(--border-light)' : 'none',
                cursor: 'pointer', fontSize: 15,
              }}>{label}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
