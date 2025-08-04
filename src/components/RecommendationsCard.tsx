import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: string[];
  status: string;
}

export function RecommendationsCard({ recommendations, status }: RecommendationsCardProps) {
  const getIconColor = (status: string) => {
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
        <AlertTriangle className={`h-4 w-4 mr-2 ${getIconColor(status)}`} />
        <CardTitle className="text-sm font-medium text-foreground">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                recommendation.includes('URGENT') 
                  ? 'bg-status-critical' 
                  : 'bg-status-good'
              }`} />
              <span className="text-sm text-foreground">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}