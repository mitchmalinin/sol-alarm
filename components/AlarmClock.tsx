'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { useAlarms } from '../hooks/useAlarms'
import AlarmForm from './AlarmForm'
import AlarmList from './AlarmList'
import { MenuIcon, SolanaIcon, WalletIcon } from './icons'
import RingingAlarm from './RingingAlarm'
import { Button } from './ui/button'

const DEV_MODE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === 'true'

export default function AlarmClock() {
  const {
    alarms,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    stopAlarm,
    isAlarmRinging,
    ringingAlarmId,
    toggleAlarm,
    triggerAlarmForTesting,
  } = useAlarms()

  const [devModeVisible, setDevModeVisible] = useState(false)
  const [solBalance, setSolBalance] = useState(1.23)

  const { login, logout, authenticated } = usePrivy()

  const formatTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(':')
    let hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`
  }

  const formattedAlarms = alarms.map((alarm) => ({
    ...alarm,
    time: formatTo12Hour(alarm.time),
  }))

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="flex relative justify-between items-center p-4 bg-card">
        <Button variant="ghost" size="icon">
          <MenuIcon className="w-6 h-6" />
        </Button>
        {authenticated ? (
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center"
          >
            <div className="mr-2 w-2 h-2 bg-green-500 rounded-full" />
            Disconnect
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={login}>
            <WalletIcon className="mr-2 w-4 h-4" />
            Connect Wallet
          </Button>
        )}

        {/* SOL Balance Bubble */}
        {authenticated && (
          <div className="flex absolute -bottom-6 left-1/2 items-center px-4 py-1 space-x-2 rounded-full shadow-lg transform -translate-x-1/2 bg-primary text-primary-foreground">
            <SolanaIcon className="w-4 h-4" />
            <span className="font-bold">{solBalance.toFixed(2)} SOL</span>
          </div>
        )}
      </nav>

      {/* Spacer to push content below the SOL balance bubble */}
      <div className="h-8" />

      {isAlarmRinging ? (
        <div className="flex flex-1 justify-center items-center">
          <RingingAlarm
            onStop={stopAlarm}
            onSnooze={() => ringingAlarmId && snoozeAlarm(ringingAlarmId)}
            solAmount={0.1} // You can adjust this value or make it dynamic
            duration={60} // Duration in seconds, adjust as needed
          />
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 p-4">
          <AlarmForm onSetAlarm={addAlarm} />
          <div className="my-4 border-t border-gray-800" />
          <AlarmList
            alarms={formattedAlarms}
            onDeleteAlarm={deleteAlarm}
            onToggleAlarm={toggleAlarm}
          />
        </div>
      )}

      {/* Developer mode toggle and trigger button */}
      {DEV_MODE_ENABLED && (
        <div className="p-4 border-t border-gray-800 bg-card">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDevModeVisible(!devModeVisible)}
            className="mb-2 w-full"
          >
            {devModeVisible ? 'Hide Dev Tools' : 'Show Dev Tools'}
          </Button>
          {devModeVisible && (
            <Button
              variant="destructive"
              size="sm"
              onClick={triggerAlarmForTesting}
              className="w-full"
            >
              Trigger Alarm
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
