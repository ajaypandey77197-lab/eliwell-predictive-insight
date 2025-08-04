import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CoolerData } from "@/data/mockData";
import { Snowflake } from "lucide-react";

interface CoolerSelectorProps {
  coolers: CoolerData[];
  selectedCooler: string;
  onCoolerSelect: (coolerId: string) => void;
}

export function CoolerSelector({ coolers, selectedCooler, onCoolerSelect }: CoolerSelectorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-status-excellent text-white';
      case 'good':
        return 'bg-status-good text-white';
      case 'warning':
        return 'bg-status-warning text-white';
      case 'critical':
        return 'bg-status-critical text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Snowflake className="h-5 w-5 text-cooling-primary" />
        <h2 className="text-xl font-semibold text-foreground">Select Cooler Unit</h2>
      </div>
      
      <Select value={selectedCooler} onValueChange={onCoolerSelect}>
        <SelectTrigger className="w-full max-w-md bg-card border-border">
          <SelectValue placeholder="Choose a cooler unit" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {coolers.map((cooler) => (
            <SelectItem key={cooler.id} value={cooler.id} className="hover:bg-muted">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-medium">{cooler.name}</span>
                  <span className="text-sm text-muted-foreground">{cooler.location}</span>
                </div>
                <Badge className={getStatusColor(cooler.status)}>
                  {cooler.status.toUpperCase()}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}