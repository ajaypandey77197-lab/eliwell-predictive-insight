import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

interface MaintenanceInfoCardProps {
  lastDefrost: string;
  location: string;
}

export function MaintenanceInfoCard({ lastDefrost, location }: MaintenanceInfoCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Maintenance Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-cooling-accent" />
            <span className="text-sm text-muted-foreground">Last Defrost</span>
          </div>
          <p className="text-sm font-medium text-foreground">{lastDefrost}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-cooling-primary" />
            <span className="text-sm text-muted-foreground">Location</span>
          </div>
          <p className="text-sm font-medium text-foreground">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}