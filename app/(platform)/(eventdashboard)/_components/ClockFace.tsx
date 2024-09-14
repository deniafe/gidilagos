import { Button } from '@/components/ui/button';
import { EventTime, Period } from '@/lib/types';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

type Props = {
  value: EventTime;
  onSelect: (time: EventTime) => void;
};

export const ClockFace = ({
  value,
  onSelect
}: Props) => {
  const { theme } = useTheme()
  const [hours, setHours] = useState(value.hours);
  const [minutes, setMinutes] = useState(value.minutes);
  const [period, setPeriod] = useState(value.period);
  const [pickingMinutes, setPickingMinutes] = useState(false);

  const hourNum = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minNum = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const handleHourChange = (newHour: number) => {
    setHours(newHour);
    setPickingMinutes(true);
    const time: EventTime = {
      hours: newHour,
      minutes,
      period: period as Period
    }
    onSelect(time)
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinutes(newMinute);
    const time: EventTime = {
      hours,
      minutes: newMinute,
      period: period as Period
    }
    onSelect(time)
  };

  const handlePeriodToggle = (c: Period) => {
    setPeriod(c);
    const time: EventTime = {
      hours,
      minutes,
      period: c
    }
    onSelect(time)
  };

  const handleSpanClick = () => {
    setPickingMinutes(false);
  };

  const handleMinuteSpanClick = () => {
    setPickingMinutes(true);
  };

  const handleClear = () => {
    setHours(12);
    setMinutes(0);
    setPeriod(Period.AM);
    setPickingMinutes(false);
    const time: EventTime = {
      hours: 12,
      minutes: 0,
      period: Period.AM
    }
    onSelect(time)
  };

  const handleCancel = () => {
    // Define what should happen when the cancel button is clicked
    // For example, close the clock or reset state
  };

  const handleDone = () => {
    // Define what should happen when the done button is clicked
    // For example, finalize the time selection and close the clock
  };

  const radius = 90;
  const center = 150;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-card p-2 pb-12 rounded-lg shadow-lg w-80">
        <div className="text-center text-2xl font-medium mb-1 relative z-10">
          <span
            className={`${!pickingMinutes ? 'text-primary' : ''} cursor-pointer`}
            onClick={handleSpanClick}
          >
            {hours}
          </span>
          {' '}: {' '}
          <span
            className={`${pickingMinutes ? 'text-primary' : ''} cursor-pointer`}
            onClick={handleMinuteSpanClick}
          >
            {minutes < 10 ? `0${minutes}` : minutes}
          </span>
          <span className="ml-2 text-sm">{period}</span>
        </div>
        <div className="relative w-full h-64 flex justify-center items-center">
          <svg width="400" height="400" viewBox="0 0 300 300" className="z-0">
            <circle cx={center} cy={center} r={120} fill="none" stroke="gray" strokeWidth="1" className="opacity-30" />
            <circle cx={center} cy={center} r={radius} fill="none" />
            {(pickingMinutes ? minNum : hourNum).map((num, i) => {
              const angle = ((i * 30 - 90) * Math.PI) / 180;
              const x = center + radius * Math.cos(angle);
              const y = center + radius * Math.sin(angle);
              return (
                <g key={i} onClick={() => (pickingMinutes ? handleMinuteChange(num) : handleHourChange(num))}>
                  {(!pickingMinutes && hours === num) || (pickingMinutes && minutes === num) ? (
                    <circle cx={x} cy={y} r={20} fill="skyblue" opacity={0.4} />
                  ) : null}
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="16"
                    className="cursor-pointer"
                    fill={((!pickingMinutes && hours === num) || (pickingMinutes && minutes === num)) && theme === 'dark' ? 'skyblue' : (theme === 'dark' ? 'white' : 'black')}
                  >
                    {num}
                  </text>
                </g>
              );
            })}
            <circle cx={center} cy={center} r={2} fill="green" />
            <line
              x1={center}
              y1={center}
              x2={
                center +
                radius *
                  Math.cos(
                    ((pickingMinutes ? (minutes / 5) * 30 : hours * 30) - 90) * (Math.PI / 180)
                  )
              }
              y2={
                center +
                radius *
                  Math.sin(
                    ((pickingMinutes ? (minutes / 5) * 30 : hours * 30) - 90) * (Math.PI / 180)
                  )
              }
              stroke="skyblue"
              strokeWidth="1"
              opacity={0.5}
            />
          </svg>
          <div className="absolute bottom-[-2rem] left-1/4 transform -translate-x-1/2">
            <button
              className={`w-10 h-10 rounded-full text-xs ${period === Period.AM ? 'bg-muted' : 'bg-secondary text-muted-foreground'}`}
              onClick={() => handlePeriodToggle(Period.AM)}
            >
              AM
            </button>
          </div>
          <div className="absolute bottom-[-2rem] right-1/4 transform translate-x-1/2">
            <button
              className={`w-10 h-10 rounded-full text-xs ${period === Period.PM ? 'bg-muted' : 'bg-secondary text-muted-foreground' }`}
              onClick={() => handlePeriodToggle(Period.PM)}
            >
              PM
            </button>
          </div>
        </div>
        {/* <div className="flex justify-between mt-8">
          <Button variant='ghost' size="sm" onClick={handleClear}>Clear</Button>
          <Button variant='ghost' size="sm"  onClick={handleCancel}>Cancel</Button>
          <Button variant='ghost' size="sm"  onClick={handleDone}>Done</Button>
        </div> */}
      </div>
    </div>
  );
};
