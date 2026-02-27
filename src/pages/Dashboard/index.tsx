"use client";

import { useMemo } from "react";

import { DATA_STATUS } from "@/data/status";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_EVENTS } from "@/mocks/event";
import { CalendarCheck, Clock, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Interfaces para eliminar o erro 'any'
interface Client {
  id: number;
  name: string;
  birth: string;
  phone: string;
  email: string;
  gender: number;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  status: number;
  date: string;
  time: string;
  client: number;
}

// Cores para os gráficos (Pendente, Em Andamento, Concluído)
const COLORS = ["#facc15", "#60a5fa", "#22c55e"];

export default function Dashboard() {
  // 1. Carregamento de dados com Fallback Seguro
  const data = useMemo(() => {
    const clientsStr =
      typeof window !== "undefined"
        ? localStorage.getItem("clients_data")
        : null;
    const eventsStr =
      typeof window !== "undefined" ? localStorage.getItem("events") : null;

    const clients: Client[] = clientsStr
      ? JSON.parse(clientsStr)
      : MOCK_CLIENTS;
    const events: Event[] = eventsStr ? JSON.parse(eventsStr) : MOCK_EVENTS;

    return { clients, events };
  }, []);

  // 2. Processamento de Métricas (KPIs)
  const stats = useMemo(() => {
    const totalEvents = data.events.length;
    const completed = data.events.filter((e) => e.status === 3).length;
    const pending = data.events.filter(
      (e) => e.status === 1 || e.status === 2,
    ).length;

    // Evita divisão por zero
    const conversion =
      totalEvents > 0 ? ((completed / totalEvents) * 100).toFixed(1) : "0";

    return {
      totalEvents,
      completed,
      pending,
      conversion,
      totalClients: data.clients.length,
    };
  }, [data]);

  // 3. Dados para Gráfico de Barras (Atendimentos por Mês)
  const chartData = useMemo(() => {
    const months: Record<string, number> = {};
    data.events.forEach((e) => {
      // Usa T00:00:00 para garantir que a data não mude de dia devido ao fuso horário
      const month = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(
        new Date(e.date + "T00:00:00"),
      );
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months).map(([name, total]) => ({ name, total }));
  }, [data]);

  // 4. Dados para Gráfico de Pizza (Distribuição de Status)
  const statusDist = useMemo(() => {
    return DATA_STATUS.map((s) => ({
      name: s.name,
      value: data.events.filter((e) => e.status === s.id).length,
    }));
  }, [data]);

  return (
    <LayoutDefaultDesktop>
      <Header
        title="Dashboard"
        description="Visão geral dos agendamentos e clientes"
      />
      <div className="flex-1 space-y-4 bg-background text-foreground">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Agendamentos
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                Volume total histórico
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clientes Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">
                Base de dados cadastrada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Conclusão
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversion}%</div>
              <p className="text-xs text-muted-foreground">
                Eficiência de atendimentos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Aberto</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Pendentes ou em curso
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão Mensal</CardTitle>
              <CardDescription>
                Quantidade de serviços agendados por mês
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Status dos Agendamentos</CardTitle>
              <CardDescription>
                Distribuição atual de todos os eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDist.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {statusDist.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[i] }}
                      />
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Compromissos</CardTitle>
            <CardDescription>
              Agendamentos pendentes organizados por data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.events
                .filter((e) => e.status === 1)
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(0, 4)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {event.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} às {event.time}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                      Pendente
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDefaultDesktop>
  );
}
