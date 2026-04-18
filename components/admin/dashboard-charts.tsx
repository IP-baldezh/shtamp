"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequestsByDay {
  date: string;
  contacts: number;
  quotes: number;
}

interface ContentStats {
  name: string;
  cases: number;
  articles: number;
}

interface DashboardChartsProps {
  requestsByDay: RequestsByDay[];
  contentStats: ContentStats[];
}

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        {payload.map((entry: TooltipEntry) => (
          <p key={entry.name} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name === "contacts"
              ? "Заявки"
              : entry.name === "quotes"
                ? "Запросы КП"
                : entry.name}
            : {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts({ requestsByDay, contentStats }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Requests over time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Заявки за 30 дней</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={requestsByDay} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="contactsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="quotesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="contacts"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#contactsGrad)"
              />
              <Area
                type="monotone"
                dataKey="quotes"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#quotesGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Заявки
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Запросы КП
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Контент по категориям</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contentStats} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cases" name="Кейсы" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="articles" name="Статьи" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Кейсы
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Статьи
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
