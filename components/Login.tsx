'use client'
import { usePrivy } from '@privy-io/react-auth'

export default function Login() {
  const { login } = usePrivy()

  return (
    <div className="text-center">
      <h1 className="mb-6 text-4xl font-bold text-white">Alarm Clock App</h1>
      <div className="space-y-4">
        <button
          onClick={login}
          className="px-4 py-2 w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login with Privy
        </button>
      </div>
    </div>
  )
}
