import React, { createContext, useContext, useState, ReactNode } from 'react'

interface PrivacyContextType {
  privacyMode: boolean
  togglePrivacy: () => void
  mask: (value: string | number) => string
  maskKr: (value: number, prefix?: string) => string
}

const PrivacyContext = createContext<PrivacyContextType>({
  privacyMode: false,
  togglePrivacy: () => {},
  mask: (v) => String(v),
  maskKr: (v) => String(v),
})

export const PrivacyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [privacyMode, setPrivacyMode] = useState(false)

  const togglePrivacy = () => setPrivacyMode(p => !p)

  // Masks a raw numeric/string value
  const mask = (value: string | number): string => {
    if (!privacyMode) return String(value)
    return '••••'
  }

  // Masks a kr amount, returning formatted string or masked
  const maskKr = (value: number, prefix = ''): string => {
    if (!privacyMode) {
      const formatted = Math.abs(value).toLocaleString('sv-SE')
      const sign = value >= 0 ? (prefix || '') : '−'
      return `${sign}${formatted} kr`
    }
    return '•••• kr'
  }

  return (
    <PrivacyContext.Provider value={{ privacyMode, togglePrivacy, mask, maskKr }}>
      {children}
    </PrivacyContext.Provider>
  )
}

export const usePrivacy = () => useContext(PrivacyContext)
