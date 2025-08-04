import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

interface CompressorCyclesCardProps {
  data: Array<{
    day: string;
    cycles: number;
  }>;
}

export function CompressorCyclesCard({ data }: CompressorCyclesCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <BarChart3 className="h-4 w-4 text-status-warning mr-2" />
        <div>
          <CardTitle className="text-sm font-medium text-foreground">Compressor Cycles (7 days)</CardTitle>
          <p className="text-xs text-muted-foreground">Daily compressor usage patterns</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Bar 
                dataKey="cycles" 
                fill="hsl(var(--status-warning))"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}