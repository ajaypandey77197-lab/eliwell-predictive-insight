import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagnosticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coolerName: string;
}

interface DiagnosticTest {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  message: string;
}

export function DiagnosticsDialog({ open, onOpenChange, coolerName }: DiagnosticsDialogProps) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tests, setTests] = useState<DiagnosticTest[]>([
    { name: "Temperature Sensor", status: "pending", message: "Checking sensor accuracy..." },
    { name: "Compressor Function", status: "pending", message: "Testing compressor cycles..." },
    { name: "Refrigerant Levels", status: "pending", message: "Monitoring pressure..." },
    { name: "Electrical Systems", status: "pending", message: "Verifying connections..." },
    { name: "Door Seals", status: "pending", message: "Testing seal integrity..." },
  ]);
  const { toast } = useToast();

  const runDiagnostics = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: "pending" as const })));
    
    // Simulate running diagnostics
    const totalTests = tests.length;
    let currentTest = 0;
    
    const runNextTest = () => {
      if (currentTest >= totalTests) {
        setIsRunning(false);
        toast({
          title: "Diagnostics Complete",
          description: `Diagnostic scan completed for ${coolerName}`,
        });
        return;
      }
      
      // Update current test to running
      setTests(prev => prev.map((test, index) => 
        index === currentTest 
          ? { ...test, status: "running" as const }
          : test
      ));
      
      // Simulate test duration
      setTimeout(() => {
        // Determine random result
        const results = ['passed', 'failed', 'warning'] as const;
        const result = currentTest === 1 ? 'warning' : results[Math.floor(Math.random() * results.length)];
        
        let message = "";
        switch (result) {
          case 'passed':
            message = "✓ All parameters within normal range";
            break;
          case 'warning':
            message = "⚠ Minor issues detected - monitor closely";
            break;
          case 'failed':
            message = "✗ Critical issue found - requires attention";
            break;
        }
        
        setTests(prev => prev.map((test, index) => 
          index === currentTest 
            ? { ...test, status: result, message }
            : test
        ));
        
        currentTest++;
        setProgress((currentTest / totalTests) * 100);
        
        setTimeout(runNextTest, 800);
      }, 1500);
    };
    
    runNextTest();
  };

  const getStatusIcon = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-status-excellent" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-status-critical" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-status-warning" />;
      case 'running':
        return <div className="h-4 w-4 rounded-full bg-cooling-primary animate-pulse" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-cooling-primary" />
            Run Diagnostics
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Comprehensive system diagnostics for {coolerName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Progress</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {tests.map((test, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <div className="font-medium text-foreground">{test.name}</div>
                  <div className="text-sm text-muted-foreground">{test.message}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm font-medium text-foreground mb-1">Diagnostic Summary</div>
            <div className="text-sm text-muted-foreground">
              {isRunning 
                ? "Running comprehensive system checks..." 
                : "Click 'Start Diagnostics' to begin system analysis"
              }
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Close"}
          </Button>
          <Button 
            onClick={runDiagnostics} 
            disabled={isRunning}
            className="bg-cooling-primary hover:bg-cooling-secondary"
          >
            {isRunning ? "Running..." : "Start Diagnostics"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}