import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface TemperatureTrendCardProps {
  data: Array<{
    time: string;
    value: number;
  }>;
}

export function TemperatureTrendCard({ data }: TemperatureTrendCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <TrendingUp className="h-4 w-4 text-cooling-primary mr-2" />
        <div>
          <CardTitle className="text-sm font-medium text-foreground">Temperature Trend (24h)</CardTitle>
          <p className="text-xs text-muted-foreground">Recent temperature variations</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--cooling-primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--cooling-primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--cooling-primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}