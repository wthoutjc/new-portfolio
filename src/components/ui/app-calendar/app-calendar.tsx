"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function AppCalendar({ selected, onSelect, disabled }: Props) {
  const [date, setDate] = useState<Date | undefined>(selected);
  const [year, setYear] = useState<number | undefined>(date?.getFullYear());
  const [month, setMonth] = useState<number | undefined>(date?.getMonth());
  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("00");

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - 40 + i
  );

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onSelect(newDate);
      setDate(newDate);
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return dayjs(date).locale("es").format("DD-MM-YYYY HH:mm");
  };

  useEffect(() => {
    if (year && month) {
      setDate(new Date(year, month));
    }
  }, [year, month]);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div className="w-full lg:w-1/3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          month={year && month ? new Date(year, month) : undefined}
          onMonthChange={(newMonth: Date) => {
            setMonth(newMonth.getMonth());
            onSelect(newMonth);
          }}
          className="rounded-md border shadow"
          disabled={disabled}
        />
      </div>
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:space-x-4 gap-2">
          <div className="w-full md:w-1/2">
            <Label htmlFor="year-select">Año</Label>
            <Select
              value={year?.toString()}
              onValueChange={(value) => setYear(Number.parseInt(value))}
            >
              <SelectTrigger id="year-select">
                <SelectValue>{year?.toString()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="month-select">Mes</Label>
            <Select
              value={month?.toString()}
              onValueChange={(value) => setMonth(Number.parseInt(value))}
            >
              <SelectTrigger id="month-select">
                <SelectValue>
                  {months[month ?? new Date().getMonth()]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((m, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 gap-2">
          <div className="w-full md:w-1/2">
            <Label htmlFor="hour-select">Hora</Label>
            <Select value={hour} onValueChange={setHour}>
              <SelectTrigger id="hour-select">
                <SelectValue>{hour}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) =>
                  i.toString().padStart(2, "0")
                ).map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="minute-select">Minuto</Label>
            <Select value={minute} onValueChange={setMinute}>
              <SelectTrigger id="minute-select">
                <SelectValue>{minute}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) =>
                  i.toString().padStart(2, "0")
                ).map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">
            Fecha y hora seleccionada:
          </Label>
          <p>
            {date
              ? formatDate(
                  new Date(
                    date.setHours(
                      Number.parseInt(hour),
                      Number.parseInt(minute)
                    )
                  )
                )
              : "No se ha seleccionado fecha"}
          </p>
        </div>
      </div>
    </div>
  );
}
