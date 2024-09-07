'use client'

import { useAlarms } from '../hooks/useAlarms'
import { useCurrentTime } from '../hooks/useCurrentTime'

import AlarmForm from './AlarmForm'
import AlarmList from './AlarmList'
import RingingAlarm from './RingingAlarm'

export default function AlarmClock() {
  const { currentTime } = useCurrentTime()
  const {
    alarms,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    stopAlarm,
    isAlarmRinging,
    ringingAlarmId,
  } = useAlarms()

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 p-4 text-gray-200">
      <div className="bg-gray-800 rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center text-blue-400">
          {currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center text-gray-400">
          {currentTime.toLocaleDateString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {isAlarmRinging ? (
          <RingingAlarm
            onStop={stopAlarm}
            onSnooze={() => ringingAlarmId && snoozeAlarm(ringingAlarmId)}
          />
        ) : (
          <>
            <AlarmForm onSetAlarm={addAlarm} />
            <AlarmList
              alarms={alarms}
              onDeleteAlarm={deleteAlarm}
              onSnoozeAlarm={snoozeAlarm}
            />
          </>
        )}
      </div>
    </div>
  )
}
