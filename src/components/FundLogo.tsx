import React from 'react'

interface FundLogoProps {
  abbr: string
  color: string
  size?: number
}

export const FundLogo: React.FC<FundLogoProps> = ({ abbr, color, size = 40 }) => {
  // Make a subtle gradient bg from the color
  const hex = color
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: `rgba(${r},${g},${b},0.18)`,
      border: `1px solid rgba(${r},${g},${b},0.3)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: abbr.length > 2 ? 9 : 11,
      fontWeight: 700,
      fontFamily: "'DM Mono', monospace",
      color: color,
      letterSpacing: '-0.5px',
      flexShrink: 0,
    }}>
      {abbr}
    </div>
  )
}
