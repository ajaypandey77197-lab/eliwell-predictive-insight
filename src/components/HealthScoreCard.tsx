import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Shield } from "lucide-react";

interface HealthScoreCardProps {
  score: number;
  status: string;
}

export function HealthScoreCard({ score, status }: HealthScoreCardProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'EXCELLENT';
      case 'good':
        return 'GOOD';
      case 'warning':
        return 'WARNING';
      case 'critical':
        return 'CRITICAL';
      default:
        return 'UNKNOWN';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-status-excellent';
      case 'good':
        return 'text-status-good';
      case 'warning':
        return 'text-status-warning';
      case 'critical':
        return 'text-status-critical';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Shield className="h-4 w-4 text-cooling-primary mr-2" />
        <CardTitle className="text-sm font-medium text-foreground">Health Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-6">
        <ProgressCircle value={score} className="mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{score}%</div>
          </div>
        </ProgressCircle>
        <div className={`text-sm font-semibold ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </CardContent>
    </Card>
  );
}