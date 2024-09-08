import { useEffect, useState } from 'react'
import { Alarm } from '../types/alarm'

export function useAlarms() {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [isAlarmRinging, setIsAlarmRinging] = useState(false)
  const [ringingAlarmId, setRingingAlarmId] = useState<string | null>(null)

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date()
      alarms.forEach((alarm) => {
        if (alarm.isActive) {
          const [hours, minutes] = alarm.time.split(':')
          const alarmTime = new Date()
          alarmTime.setHours(parseInt(hours, 10))
          alarmTime.setMinutes(parseInt(minutes, 10))
          alarmTime.setSeconds(0)

          if (alarmTime <= now && now.getTime() - alarmTime.getTime() < 60000) {
            setIsAlarmRinging(true)
            setRingingAlarmId(alarm.id)
          }
        }
      })
    }

    const alarmChecker = setInterval(checkAlarms, 1000)

    return () => clearInterval(alarmChecker)
  }, [alarms])

  const addAlarm = (time: string) => {
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      time,
      isActive: true,
    }
    setAlarms([...alarms, newAlarm])
  }

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
  }

  const snoozeAlarm = (id: string) => {
    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        const [hours, minutes] = alarm.time.split(':')
        const snoozeTime = new Date()
        snoozeTime.setHours(parseInt(hours))
        snoozeTime.setMinutes(parseInt(minutes) + 10)
        return {
          ...alarm,
          time: `${snoozeTime
            .getHours()
            .toString()
            .padStart(2, '0')}:${snoozeTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}`,
          isActive: true,
        }
      }
      return alarm
    })
    setAlarms(updatedAlarms)
    setIsAlarmRinging(false)
    setRingingAlarmId(null)
  }

  const stopAlarm = () => {
    setIsAlarmRinging(false)
    if (ringingAlarmId) {
      setAlarms(
        alarms.map((alarm) =>
          alarm.id === ringingAlarmId ? { ...alarm, isActive: false } : alarm
        )
      )
    }
    setRingingAlarmId(null)
  }

  const toggleAlarm = (id: string) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    )
  }

  return {
    alarms,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    stopAlarm,
    isAlarmRinging,
    ringingAlarmId,
    toggleAlarm,
  }
}
