"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Clock } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClockFace } from "./ClockFace"
import { EventTime, Period } from "@/lib/types"

type Props = {
  value: EventTime;
  onSelect: (time: EventTime) => void;
  className?: React.HTMLAttributes<HTMLDivElement>
};

export function SelectTime({
  className, 
  value,
  onSelect
}: Props) {
  const today = new Date(); // Create a new Date object for today's date
  const fromYear = today.getFullYear(); // Get the year component
  const fromMonth = today.getMonth(); // Get the month component
  const fromDay = today.getDate(); // Get the day component

  // const [time, setTime] = React.useState<EventTime | undefined>({
  //   hours: 12, // Set from to today's date
  //   minutes: 0, 
  //   period: Period.AM
  // })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? (
                <>
                   {value.hours} : {value.minutes < 10 ? `0${value.minutes}` : value.minutes} {value.period}
                </>
            ) : (
              <span>Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 h-18">
          {/* <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          /> */}
          <ClockFace value={value} onSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
