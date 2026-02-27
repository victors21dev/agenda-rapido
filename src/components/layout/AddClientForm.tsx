"use client";

import { type FormEvent, useState } from "react";

import { DATA_GENDER } from "@/data/gender";
import type { Clients } from "@/pages/Clients/columns";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientFormProps {
  onSuccess: (data: Clients) => void;
  initialData?: Clients | null;
}

const ClientForm = ({ onSuccess, initialData }: ClientFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [birth, setBirth] = useState(initialData?.birth || "");
  const [gender, setGender] = useState<string>(
    initialData?.gender?.toString() || "",
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const clientData: Clients = {
      id: initialData?.id || Date.now(),
      name,
      email,
      phone,
      birth,
      gender: Number(gender),
      genderName:
        DATA_GENDER.find((g) => g.id === Number(gender))?.name || "N/A",
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSuccess(clientData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup className="space-y-4 text-foreground text-left">
        <Field>
          <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
          <Input
            id="name"
            placeholder="Ex: Victor Santos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-transparent"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="gender">Gênero</FieldLabel>
            <Select onValueChange={setGender} value={gender} required>
              <SelectTrigger
                id="gender"
                className="bg-transparent border-input"
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              {/* Z-index alto para garantir que o menu apareça à frente do modal */}
              <SelectContent className="z-110 bg-popover text-popover-foreground">
                {DATA_GENDER.map((g) => (
                  <SelectItem key={g.id} value={g.id.toString()}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="birth">Nascimento</FieldLabel>
            <Input
              id="birth"
              type="date"
              className="bg-transparent block"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Telefone</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="bg-transparent"
          />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
      >
        {initialData ? "Salvar Alterações" : "Cadastrar Cliente"}
      </Button>
    </form>
  );
};

export default ClientForm;
