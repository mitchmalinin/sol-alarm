'use client'
import { usePrivy } from '@privy-io/react-auth'
import AlarmClock from '../components/AlarmClock'
import Login from '../components/Login'

export default function Home() {
  const { ready, authenticated } = usePrivy()

  if (!ready) return null

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      {authenticated ? <AlarmClock /> : <Login />}
    </main>
  )
}
