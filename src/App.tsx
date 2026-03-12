import React, { useState } from 'react'
import { StatusBar } from './components/StatusBar'
import { BottomNav } from './components/BottomNav'
import { Hem } from './pages/Hem'
import { Innehav } from './pages/Innehav'
import { SharedPortfolio } from './pages/SharedPortfolio'
import { ShareModal } from './pages/ShareModal'
import { Bevaka, Upptack } from './pages/Other'
import { PrivacyProvider, usePrivacy } from './context/PrivacyContext'

type Tab = 'hem' | 'innehav' | 'bevaka' | 'upptack'

function AppInner() {
  const [activeTab, setActiveTab] = useState<Tab>('hem')
  const [sharedPortfolioId, setSharedPortfolioId] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const { privacyMode } = usePrivacy()

  const renderContent = () => {
    if (sharedPortfolioId) {
      return <SharedPortfolio shareId={sharedPortfolioId} onBack={() => setSharedPortfolioId(null)} />
    }
    switch (activeTab) {
      case 'hem':     return <Hem onGoToInhehav={() => setActiveTab('innehav')} />
      case 'innehav': return <Innehav onViewShared={setSharedPortfolioId} onOpenShare={() => setShowShareModal(true)} />
      case 'bevaka':  return <Bevaka />
      case 'upptack': return <Upptack />
    }
  }

  return (
    <div style={{
      width: 390, height: 844, background: 'var(--bg)', borderRadius: 44,
      overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 50px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)',
    }}>
      {privacyMode && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 200,
          background: 'linear-gradient(90deg, var(--positive), #a78bfa, var(--positive))',
          backgroundSize: '200% 100%', animation: 'privacyPulse 2.5s linear infinite',
          borderRadius: '44px 44px 0 0',
        }} />
      )}
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', paddingBottom: 72 }}>
        {renderContent()}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Modal is a sibling to the scroll container — always covers the full phone */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          onViewShared={(id) => { setShowShareModal(false); setSharedPortfolioId(id) }}
        />
      )}
      <style>{`
        @keyframes privacyPulse { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  )
}

export default function App() {
  return <PrivacyProvider><AppInner /></PrivacyProvider>
}
