import React, { useState } from 'react'
import { FundLogo } from '../components/FundLogo'
import sharedData from '../data/sharedPortfolios.json'

interface SharedPortfolioProps {
  shareId: string
  onBack: () => void
}

// Donut chart for allocation
const DonutChart: React.FC<{ segments: { pct: number; color: string; name: string }[] }> = ({ segments }) => {
  const size = 120
  const cx = size / 2
  const cy = size / 2
  const r = 44
  const innerR = 28
  const stroke = r - innerR

  let cumulPct = 0
  const arcs = segments.map(seg => {
    const start = cumulPct * 3.6 * (Math.PI / 180)
    cumulPct += seg.pct
    const end = cumulPct * 3.6 * (Math.PI / 180)
    const x1 = cx + r * Math.sin(start) - stroke / 2 * Math.sin(start)
    const y1 = cy - r * Math.cos(start) + stroke / 2 * Math.cos(start)
    const x2 = cx + r * Math.sin(end) - stroke / 2 * Math.sin(end)
    const y2 = cy - r * Math.cos(end) + stroke / 2 * Math.cos(end)

    // Using stroke-dasharray approach instead
    const circumference = 2 * Math.PI * (r - stroke / 2)
    const dash = (seg.pct / 100) * circumference
    return { ...seg, dash, circumference }
  })

  // Simpler: use stroke-dasharray on circles
  const circleR = 38
  const circleC = 2 * Math.PI * circleR

  let offset = 0
  const circles = segments.map(seg => {
    const dash = (seg.pct / 100) * circleC
    const currentOffset = offset
    offset += dash
    return { ...seg, dash, offset: circleC - currentOffset }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      {circles.map((seg, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={circleR}
          fill="none"
          stroke={seg.color}
          strokeWidth={14}
          strokeDasharray={`${seg.dash} ${circleC - seg.dash}`}
          strokeDashoffset={seg.offset}
          strokeLinecap="butt"
          opacity={0.9}
        />
      ))}
    </svg>
  )
}

export const SharedPortfolio: React.FC<SharedPortfolioProps> = ({ shareId, onBack }) => {
  const portfolio = sharedData.sharedPortfolios.find(p => p.shareId === shareId)
  const [activeTab, setActiveTab] = useState<'oversikt' | 'fonder' | 'analys'>('oversikt')

  if (!portfolio) return (
    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
      Portfölj hittades inte
    </div>
  )

  const donutSegments = portfolio.funds.map(f => ({
    pct: f.allocation,
    color: f.color,
    name: f.name,
  }))

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)' }}>
      {/* Shared badge header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(108,99,255,0.12) 0%, transparent 100%)',
        padding: '8px 20px 20px',
        animation: 'fadeUp 0.4s ease forwards',
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: 'var(--positive)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 0 16px',
            fontFamily: 'inherit',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Tillbaka
        </button>

        {/* Owner info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--positive), #a78bfa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
          }}>
            {portfolio.ownerAlias.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{portfolio.ownerAlias}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>
              Delade sin portfölj med dig
            </div>
          </div>
          <div style={{
            marginLeft: 'auto',
            padding: '5px 10px',
            background: 'rgba(108,99,255,0.15)',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: 99,
            fontSize: 11.5,
            color: 'var(--positive)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Delad portfölj
          </div>
        </div>

        {/* Message */}
        {portfolio.message && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '2px solid var(--positive)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginBottom: 16,
            fontStyle: 'italic',
          }}>
            "{portfolio.message}"
          </div>
        )}

        {/* Privacy notice */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          fontSize: 12,
          color: 'var(--text-tertiary)',
        }}>
          <span>🔒</span>
          <span>Belopp döljs — du ser endast procentuell avkastning</span>
        </div>
      </div>

      {/* Big performance number */}
      <div style={{
        padding: '0 20px 24px',
        animation: 'fadeUp 0.4s ease 0.08s both',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500, letterSpacing: '0.5px' }}>
            TOTALAVKASTNING
          </div>
          <div style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: '-2px',
            color: portfolio.totalReturnPct >= 0 ? 'var(--positive)' : 'var(--negative)',
            fontFamily: "'DM Mono', monospace",
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {portfolio.totalReturnPct >= 0 ? '+' : ''}{portfolio.totalReturnPct.toFixed(2)}%
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
            {[
              { label: '1 vecka', value: portfolio.weekChangePct },
              { label: '1 år', value: portfolio.yearChangePct },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginBottom: 4 }}>{item.label}</div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: item.value >= 0 ? 'var(--positive)' : 'var(--negative)',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {item.value >= 0 ? '+' : ''}{item.value.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allocation donut */}
      <div style={{
        padding: '0 20px 14px',
        animation: 'fadeUp 0.4s ease 0.12s both',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Fördelning</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <DonutChart segments={donutSegments} />
            </div>
            <div style={{ flex: 1 }}>
              {portfolio.funds.map(fund => (
                <div key={fund.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: fund.color,
                    flexShrink: 0,
                  }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {fund.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                  }}>
                    {fund.allocation.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fund breakdown */}
      <div style={{ padding: '0 20px', animation: 'fadeUp 0.4s ease 0.16s both' }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Fonder</div>
        {portfolio.funds.map((fund, i) => (
          <div key={fund.name} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: 10,
            animation: `fadeUp 0.4s ease ${0.2 + i * 0.06}s both`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <FundLogo abbr={fund.logo} color={fund.color} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{fund.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {fund.allocation.toFixed(1)}% av portföljen
                </div>
              </div>
              {/* Return since buy */}
              <div style={{
                padding: '6px 12px',
                background: fund.returnSinceBuyPct >= 0 ? 'var(--positive-soft)' : 'var(--negative-soft)',
                border: `1px solid ${fund.returnSinceBuyPct >= 0 ? 'rgba(108,99,255,0.3)' : 'rgba(255,69,96,0.2)'}`,
                borderRadius: 99,
              }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: fund.returnSinceBuyPct >= 0 ? 'var(--positive)' : 'var(--negative)', fontFamily: "'DM Mono', monospace" }}>
                  {fund.returnSinceBuyPct >= 0 ? '+' : ''}{fund.returnSinceBuyPct.toFixed(2)}%
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textAlign: 'center' }}>sedan köp</div>
              </div>
            </div>

            {/* Performance grid - ONLY percentages */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 8,
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 12,
              padding: '12px',
            }}>
              {[
                { label: 'Igår', value: fund.yesterday },
                { label: '3 mån', value: fund.threeMonths },
                { label: '1 år', value: fund.oneYear },
              ].map(m => (
                <div key={m.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>{m.label}</div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: m.value >= 0 ? 'var(--positive)' : 'var(--negative)',
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {m.value >= 0 ? '+' : ''}{m.value.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA - Follow portfolio */}
      <div style={{ padding: '8px 20px 24px', animation: 'fadeUp 0.4s ease 0.3s both' }}>
        <button style={{
          width: '100%',
          padding: '15px',
          background: 'var(--positive)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Kopiera till min portfölj
        </button>
        <button style={{
          width: '100%',
          padding: '15px',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Bevaka {portfolio.ownerAlias.split(' ')[0]}s portfölj
        </button>
      </div>
    </div>
  )
}
