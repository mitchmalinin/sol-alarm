import { usePrivy } from '@privy-io/react-auth'
import { WalletIcon } from './icons'
import { Button } from './ui/button'

export default function Login() {
  const { login } = usePrivy()

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="flex flex-col flex-1 justify-center items-center p-4">
        <div className="mb-8 text-4xl font-bold text-primary">
          <span className="text-white">Welcome to </span>
          <span className="text-primary">SolAlarm</span>
        </div>
        <div className="mb-8 text-xl text-center text-muted-foreground">
          Connect your wallet to start actually waking up
        </div>
        <Button onClick={login} size="lg" className="flex items-center">
          <WalletIcon className="mr-2 w-5 h-5" />
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
