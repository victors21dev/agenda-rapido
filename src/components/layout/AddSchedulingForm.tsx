"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { DATA_GENDER } from "@/data/gender";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_HOURS_OPEN_CLOSE } from "@/mocks/time-list-open-close";
import { Search } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EventData {
  id: string;
  title: string;
  status: number;
  date: string;
  time: string;
  client: number;
  clientName: string;
  statusName: string;
}

interface BusinessHour {
  id: number;
  dayweek: string;
  open: string | null;
  close: string | null;
}

interface AddSchedulingFormProps {
  onSuccess: (newData: EventData) => void;
}

const AddSchedulingForm = ({ onSuccess }: AddSchedulingFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientId, setClientId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredClients = MOCK_CLIENTS.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ).sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [searchTerm]);

  const availableSlots = useMemo(() => {
    if (!date) return [];

    const storedHours =
      typeof window !== "undefined"
        ? localStorage.getItem("business_hours")
        : null;
    const businessHours: BusinessHour[] = storedHours
      ? JSON.parse(storedHours)
      : MOCK_HOURS_OPEN_CLOSE;

    const selectedDate = new Date(date + "T00:00:00");
    const dayNames = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const dayName = dayNames[selectedDate.getDay()];

    const configDay = businessHours.find((h) => h.dayweek === dayName);

    if (!configDay || !configDay.open || !configDay.close) return [];

    const slots: string[] = [];
    let current =
      parseInt(configDay.open.split(":")[0]) * 60 +
      parseInt(configDay.open.split(":")[1]);
    const end =
      parseInt(configDay.close.split(":")[0]) * 60 +
      parseInt(configDay.close.split(":")[1]);

    while (current < end) {
      const h = Math.floor(current / 60)
        .toString()
        .padStart(2, "0");
      const m = (current % 60).toString().padStart(2, "0");
      slots.push(`${h}:${m}`);
      // A cada 30min
      current += 30;
    }
    return slots;
  }, [date]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedClient = MOCK_CLIENTS.find((c) => c.id === Number(clientId));

    const newEvent: EventData = {
      id: uuidv4(),
      title,
      status: 1,
      statusName: "Pendente",
      date,
      time,
      client: Number(clientId),
      clientName: selectedClient?.name || "Cliente não encontrado",
    };

    onSuccess(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup className="space-y-4">
        <Field>
          <FieldLabel htmlFor="client">Cliente</FieldLabel>
          <Select
            onValueChange={(value) => setClientId(value)}
            value={clientId}
            required
          >
            <SelectTrigger className="w-full bg-transparent border-input text-foreground overflow-hidden">
              <SelectValue placeholder="Selecione um cliente">
                {clientId &&
                MOCK_CLIENTS.find((c) => c.id.toString() === clientId)
                  ? (() => {
                      const c = MOCK_CLIENTS.find(
                        (c) => c.id.toString() === clientId,
                      )!;
                      const gName =
                        DATA_GENDER.find((g) => g.id === c.gender)?.name ||
                        "N/A";
                      const [year, month, day] = c.birth.split("-");
                      return `${c.name} | ${gName} | ${day}/${month}/${year.slice(-2)}`;
                    })()
                  : "Selecione um cliente"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="w-(--radix-select-trigger-width) min-w-[320px] bg-popover"
            >
              <div className="flex items-center border-b px-3 pb-2 pt-1">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                  ref={inputRef}
                  placeholder="Pesquisar cliente..."
                  className="flex h-8 w-full bg-transparent py-3 text-sm outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-y-auto p-1">
                {filteredClients.map((client) => {
                  const genderName =
                    DATA_GENDER.find((g) => g.id === client.gender)?.name ||
                    "N/A";
                  const [year, month, day] = client.birth.split("-");
                  return (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} | {genderName} | {day}/${month}/$
                      {year.slice(-2)}
                    </SelectItem>
                  );
                })}
              </div>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="title">Título do Serviço</FieldLabel>
          <Input
            id="title"
            placeholder="Ex: Corte de Cabelo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="date">Data</FieldLabel>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="time">Horário</FieldLabel>
            <Select
              onValueChange={(value) => setTime(value)}
              value={time}
              disabled={availableSlots.length === 0}
              required
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !date
                      ? "Data..."
                      : availableSlots.length === 0
                        ? "Fechado"
                        : "Selecione"
                  }
                />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-60 overflow-y-auto"
              >
                {availableSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>

      <Button type="submit" className="w-full bg-primary" disabled={!time}>
        Confirmar Agendamento
      </Button>
    </form>
  );
};

export default AddSchedulingForm;
