'use client'

import { useState } from 'react'
import { useAlarms } from '../hooks/useAlarms'
import AlarmForm from './AlarmForm'
import AlarmList from './AlarmList'
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
    <div className="flex flex-col justify-center items-center p-4 w-full min-h-screen bg-background">
      <div className="p-8 w-full max-w-md rounded-3xl shadow-lg bg-card">
        {isAlarmRinging ? (
          <RingingAlarm
            onStop={stopAlarm}
            onSnooze={() => ringingAlarmId && snoozeAlarm(ringingAlarmId)}
            solAmount={0.1} // You can adjust this value or make it dynamic
            duration={60} // Duration in seconds, adjust as needed
          />
        ) : (
          <>
            <AlarmForm onSetAlarm={addAlarm} />
            <div className="my-8 border-t border-gray-800" />
            <AlarmList
              alarms={formattedAlarms}
              onDeleteAlarm={deleteAlarm}
              onToggleAlarm={toggleAlarm}
            />
          </>
        )}
      </div>
      {/* Developer mode toggle and trigger button */}
      {DEV_MODE_ENABLED && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDevModeVisible(!devModeVisible)}
          >
            {devModeVisible ? 'Hide Dev Tools' : 'Show Dev Tools'}
          </Button>
          {devModeVisible && (
            <Button
              variant="destructive"
              size="sm"
              onClick={triggerAlarmForTesting}
              className="ml-2"
            >
              Trigger Alarm
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
