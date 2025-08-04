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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Snowflake, Clock, Thermometer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DefrostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coolerName: string;
}

export function DefrostDialog({ open, onOpenChange, coolerName }: DefrostDialogProps) {
  const [defrostType, setDefrostType] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const { toast } = useToast();

  const handleStartDefrost = () => {
    if (!defrostType || !duration) {
      toast({
        title: "Missing Information",
        description: "Please select both defrost type and duration.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Defrost Cycle Started",
      description: `${defrostType} defrost cycle initiated for ${coolerName}. Duration: ${duration} minutes.`,
    });

    onOpenChange(false);
    setDefrostType("");
    setDuration("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Snowflake className="h-5 w-5 text-cooling-primary" />
            Trigger Defrost Cycle
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure and start a defrost cycle for {coolerName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="defrost-type" className="text-foreground">Defrost Type</Label>
            <Select value={defrostType} onValueChange={setDefrostType}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select defrost type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="manual">Manual Defrost</SelectItem>
                <SelectItem value="automatic">Automatic Defrost</SelectItem>
                <SelectItem value="emergency">Emergency Defrost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="duration" className="text-foreground">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted rounded-lg p-3 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-cooling-primary" />
              <span className="text-sm font-medium text-foreground">Current Status</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Last defrost was 2 days ago. Current ice buildup: Moderate
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStartDefrost} className="bg-cooling-primary hover:bg-cooling-secondary">
            Start Defrost
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}