"use client";

import { type FormEvent, useState } from "react";

import { DATA_GENDER } from "@/data/gender";
import { MOCK_CLIENTS } from "@/mocks/clients";
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

interface AddSchedulingFormProps {
  onSuccess: (newData: EventData) => void;
}

const AddSchedulingForm = ({ onSuccess }: AddSchedulingFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientId, setClientId] = useState<string>("");

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
            <SelectTrigger className="w-full bg-transparent border-input text-foreground">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_CLIENTS.map((client) => {
                const genderName =
                  DATA_GENDER.find((g) => g.id === client.gender)?.name ||
                  "N/A";

                const [year, month, day] = client.birth.split("-");
                const formattedDate = `${day}/${month}/${year.slice(-2)}`;

                return (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name} | {genderName} | {formattedDate}
                  </SelectItem>
                );
              })}
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
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="time">Horário</FieldLabel>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </Field>
        </div>
      </FieldGroup>

      <Button type="submit" className="w-full bg-primary">
        Confirmar Agendamento
      </Button>
    </form>
  );
};

export default AddSchedulingForm;
