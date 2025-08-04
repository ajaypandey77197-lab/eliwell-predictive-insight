import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeToFailureCardProps {
  estimatedTimeToFailure: {
    days: number;
    confidence: number;
  };
}

export function TimeToFailureCard({ estimatedTimeToFailure }: TimeToFailureCardProps) {
  const getDaysText = (days: number) => {
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.round(days / 30)} months`;
    return `${Math.round(days / 365)} years`;
  };

  const getStatusColor = (days: number) => {
    if (days < 30) return 'text-status-critical';
    if (days < 90) return 'text-status-warning';
    return 'text-status-good';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Clock className="h-4 w-4 text-cooling-primary mr-2" />
        <CardTitle className="text-sm font-medium text-foreground">Estimated Time to Failure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-2xl font-bold mb-2 ${getStatusColor(estimatedTimeToFailure.days)}`}>
            {getDaysText(estimatedTimeToFailure.days)}
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Based on current degradation patterns
          </p>
          <div className="text-xs text-muted-foreground">
            Confidence: {estimatedTimeToFailure.confidence}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}