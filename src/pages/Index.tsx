import React, { useState } from "react";
import { CoolerSelector } from "@/components/CoolerSelector";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { CurrentMetricsCard } from "@/components/CurrentMetricsCard";
import { TemperatureTrendCard } from "@/components/TemperatureTrendCard";
import { CompressorCyclesCard } from "@/components/CompressorCyclesCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { MaintenanceInfoCard } from "@/components/MaintenanceInfoCard";
import { RecommendationsCard } from "@/components/RecommendationsCard";
import { TimeToFailureCard } from "@/components/TimeToFailureCard";
import { DefrostDialog } from "@/components/dialogs/DefrostDialog";
import { TemperatureDialog } from "@/components/dialogs/TemperatureDialog";
import { DiagnosticsDialog } from "@/components/dialogs/DiagnosticsDialog";
import { mockCoolerData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import eliwellLogo from "@/assets/eliwell-logo.jpg";

const Index = () => {
  const [selectedCoolerId, setSelectedCoolerId] = useState<string>(mockCoolerData[0].id);
  const [defrostDialogOpen, setDefrostDialogOpen] = useState(false);
  const [temperatureDialogOpen, setTemperatureDialogOpen] = useState(false);
  const [diagnosticsDialogOpen, setDiagnosticsDialogOpen] = useState(false);
  
  const selectedCooler = mockCoolerData.find(cooler => cooler.id === selectedCoolerId) || mockCoolerData[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={eliwellLogo} 
                alt="Eliwell" 
                className="h-10 w-auto rounded"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Eliwell CoolSight Predict</h1>
                <p className="text-sm text-muted-foreground">Industrial Refrigerator Predictive Maintenance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-status-excellent text-white">
                ● Online
              </Badge>
              <span className="text-sm text-muted-foreground">Last updated: 00:30:33</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <CoolerSelector
          coolers={mockCoolerData}
          selectedCooler={selectedCoolerId}
          onCoolerSelect={setSelectedCoolerId}
        />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Health & Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <HealthScoreCard
              score={selectedCooler.healthScore}
              status={selectedCooler.status}
            />
            <CurrentMetricsCard
              temperature={selectedCooler.currentMetrics.temperature}
              humidity={selectedCooler.currentMetrics.humidity}
              compressorCycles={selectedCooler.currentMetrics.compressorCycles}
            />
            <TimeToFailureCard
              estimatedTimeToFailure={selectedCooler.estimatedTimeToFailure}
            />
          </div>

          {/* Center Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <TemperatureTrendCard data={selectedCooler.temperatureTrend} />
            <CompressorCyclesCard data={selectedCooler.compressorCycles7Days} />
          </div>

          {/* Right Column - Actions & Info */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActionsCard
              onTriggerDefrost={() => setDefrostDialogOpen(true)}
              onAdjustTemperature={() => setTemperatureDialogOpen(true)}
              onRunDiagnostics={() => setDiagnosticsDialogOpen(true)}
            />
            <MaintenanceInfoCard
              lastDefrost={selectedCooler.lastDefrost}
              location={selectedCooler.location}
            />
            <RecommendationsCard
              recommendations={selectedCooler.recommendations}
              status={selectedCooler.status}
            />
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <DefrostDialog
        open={defrostDialogOpen}
        onOpenChange={setDefrostDialogOpen}
        coolerName={selectedCooler.name}
      />
      
      <TemperatureDialog
        open={temperatureDialogOpen}
        onOpenChange={setTemperatureDialogOpen}
        coolerName={selectedCooler.name}
        currentTemp={selectedCooler.currentMetrics.temperature}
      />
      
      <DiagnosticsDialog
        open={diagnosticsDialogOpen}
        onOpenChange={setDiagnosticsDialogOpen}
        coolerName={selectedCooler.name}
      />
    </div>
  );
};

export default Index;
