import React from 'react'

interface SparklineProps {
  data: number[]
  positive?: boolean
  width?: number
  height?: number
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  positive = true,
  width = 80,
  height = 36,
}) => {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return [x, y]
  })

  const pathD = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')

  const color = positive ? '#6c63ff' : '#ff4560'
  const fillId = `fill-${positive ? 'pos' : 'neg'}-${Math.random().toString(36).slice(2)}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" overflow="visible">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path
        d={`${pathD} L${width},${height} L0,${height} Z`}
        fill={`url(#${fillId})`}
      />
      <path d={pathD} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
