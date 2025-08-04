import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Activity } from "lucide-react";

interface CurrentMetricsCardProps {
  temperature: number;
  humidity: number;
  compressorCycles: number;
}

export function CurrentMetricsCard({ temperature, humidity, compressorCycles }: CurrentMetricsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Current Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-cooling-primary" />
            <span className="text-sm text-muted-foreground">Temperature</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {temperature.toFixed(1)}°C
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-cooling-accent" />
            <span className="text-sm text-muted-foreground">Humidity</span>
          </div>
          <span className="text-sm font-medium text-foreground">{humidity}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-status-warning" />
            <span className="text-sm text-muted-foreground">Compressor Cycles</span>
          </div>
          <span className="text-sm font-medium text-foreground">{compressorCycles}</span>
        </div>
      </CardContent>
    </Card>
  );
}