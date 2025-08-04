import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Snowflake, Thermometer, Settings } from "lucide-react";

interface QuickActionsCardProps {
  onTriggerDefrost: () => void;
  onAdjustTemperature: () => void;
  onRunDiagnostics: () => void;
}

export function QuickActionsCard({ 
  onTriggerDefrost, 
  onAdjustTemperature, 
  onRunDiagnostics 
}: QuickActionsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Zap className="h-4 w-4 text-cooling-primary mr-2" />
        <CardTitle className="text-sm font-medium text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onTriggerDefrost}
          className="w-full justify-start gap-2 bg-secondary hover:bg-secondary/80"
          variant="secondary"
        >
          <Snowflake className="h-4 w-4" />
          Trigger Defrost Cycle
        </Button>
        
        <Button 
          onClick={onAdjustTemperature}
          className="w-full justify-start gap-2 bg-secondary hover:bg-secondary/80"
          variant="secondary"
        >
          <Thermometer className="h-4 w-4" />
          Adjust Temperature
        </Button>
        
        <Button 
          onClick={onRunDiagnostics}
          className="w-full justify-start gap-2 bg-secondary hover:bg-secondary/80"
          variant="secondary"
        >
          <Settings className="h-4 w-4" />
          Run Diagnostics
        </Button>
      </CardContent>
    </Card>
  );
}