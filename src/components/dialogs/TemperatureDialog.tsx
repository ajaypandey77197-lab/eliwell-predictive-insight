import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Thermometer, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemperatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coolerName: string;
  currentTemp: number;
}

export function TemperatureDialog({ open, onOpenChange, coolerName, currentTemp }: TemperatureDialogProps) {
  const [targetTemp, setTargetTemp] = useState<number[]>([Math.round(currentTemp)]);
  const { toast } = useToast();

  const handleAdjustTemperature = () => {
    const newTemp = targetTemp[0];
    
    toast({
      title: "Temperature Adjusted",
      description: `Target temperature for ${coolerName} set to ${newTemp}°C`,
    });

    onOpenChange(false);
  };

  const getTempWarning = () => {
    const temp = targetTemp[0];
    if (temp > -10) return "⚠️ High temperature may affect food safety";
    if (temp < -25) return "⚠️ Very low temperature increases energy consumption";
    return "✓ Temperature within optimal range";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Thermometer className="h-5 w-5 text-cooling-primary" />
            Adjust Temperature
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set the target temperature for {coolerName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="current-temp" className="text-foreground">Current Temperature</Label>
            <Input 
              id="current-temp"
              value={`${currentTemp.toFixed(1)}°C`}
              disabled
              className="bg-muted border-border"
            />
          </div>
          
          <div className="grid gap-4">
            <Label htmlFor="target-temp" className="text-foreground">Target Temperature</Label>
            <div className="px-3">
              <Slider
                value={targetTemp}
                onValueChange={setTargetTemp}
                max={0}
                min={-30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>-30°C</span>
                <span className="text-lg font-bold text-cooling-primary">{targetTemp[0]}°C</span>
                <span>0°C</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-status-warning" />
              <span className="text-sm font-medium text-foreground">Temperature Advisory</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {getTempWarning()}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-card rounded p-2 border border-border">
              <div className="text-muted-foreground">Change</div>
              <div className="font-medium text-foreground">
                {targetTemp[0] > currentTemp ? '+' : ''}{(targetTemp[0] - currentTemp).toFixed(1)}°C
              </div>
            </div>
            <div className="bg-card rounded p-2 border border-border">
              <div className="text-muted-foreground">Est. Time</div>
              <div className="font-medium text-foreground">15-30 min</div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdjustTemperature} className="bg-cooling-primary hover:bg-cooling-secondary">
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}