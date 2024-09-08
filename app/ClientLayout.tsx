'use client'
import { usePrivy } from '@privy-io/react-auth'
import HamburgerMenu from '../components/HamburgerMenu'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { ready, authenticated } = usePrivy()

  if (!ready) return null

  return (
    <>
      {authenticated && (
        <div className="absolute top-4 right-4">
          <HamburgerMenu />
        </div>
      )}
      {children}
    </>
  )
}
