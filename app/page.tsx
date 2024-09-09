'use client'
import { usePrivy } from '@privy-io/react-auth'
import AlarmClock from '../components/AlarmClock'
import Login from '../components/Login'

export default function Home() {
  const { ready, authenticated } = usePrivy()

  if (!ready) return null

  return authenticated ? <AlarmClock /> : <Login />
}
