export interface CoolerData {
  id: string;
  name: string;
  location: string;
  healthScore: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  currentMetrics: {
    temperature: number;
    humidity: number;
    compressorCycles: number;
  };
  temperatureTrend: Array<{
    time: string;
    value: number;
  }>;
  compressorCycles7Days: Array<{
    day: string;
    cycles: number;
  }>;
  lastDefrost: string;
  estimatedTimeToFailure: {
    days: number;
    confidence: number;
  };
  recommendations: string[];
  maintenanceHistory: Array<{
    date: string;
    action: string;
    technician: string;
  }>;
}

export const mockCoolerData: CoolerData[] = [
  {
    id: "A1",
    name: "Cooler Unit A1",
    location: "Warehouse Section 1",
    healthScore: 97,
    status: 'excellent',
    currentMetrics: {
      temperature: -14.532469559728956,
      humidity: 65,
      compressorCycles: 14
    },
    temperatureTrend: [
      { time: "00:00", value: -18.1 },
      { time: "04:00", value: -18.3 },
      { time: "08:00", value: -17.8 },
      { time: "12:00", value: -18.2 },
      { time: "16:00", value: -18.1 },
      { time: "20:00", value: -18.4 }
    ],
    compressorCycles7Days: [
      { day: "Mon", cycles: 42 },
      { day: "Tue", cycles: 38 },
      { day: "Wed", cycles: 45 },
      { day: "Thu", cycles: 41 },
      { day: "Fri", cycles: 43 },
      { day: "Sat", cycles: 39 },
      { day: "Sun", cycles: 37 }
    ],
    lastDefrost: "05/08/2025, 09:26:56",
    estimatedTimeToFailure: {
      days: 847,
      confidence: 89
    },
    recommendations: [
      "Schedule routine inspection in 2 weeks",
      "Monitor temperature stability"
    ],
    maintenanceHistory: [
      { date: "2025-01-15", action: "Routine maintenance", technician: "John Smith" },
      { date: "2024-12-10", action: "Filter replacement", technician: "Maria Garcia" }
    ]
  },
  {
    id: "B2",
    name: "Cooler Unit B2",
    location: "Warehouse Section 2",
    healthScore: 72,
    status: 'good',
    currentMetrics: {
      temperature: -15.2,
      humidity: 68,
      compressorCycles: 18
    },
    temperatureTrend: [
      { time: "00:00", value: -17.9 },
      { time: "04:00", value: -18.0 },
      { time: "08:00", value: -17.5 },
      { time: "12:00", value: -17.8 },
      { time: "16:00", value: -17.6 },
      { time: "20:00", value: -17.9 }
    ],
    compressorCycles7Days: [
      { day: "Mon", cycles: 52 },
      { day: "Tue", cycles: 48 },
      { day: "Wed", cycles: 55 },
      { day: "Thu", cycles: 51 },
      { day: "Fri", cycles: 53 },
      { day: "Sat", cycles: 49 },
      { day: "Sun", cycles: 47 }
    ],
    lastDefrost: "03/08/2025, 14:15:22",
    estimatedTimeToFailure: {
      days: 234,
      confidence: 76
    },
    recommendations: [
      "Check evaporator coils for ice buildup",
      "Consider replacing door seals",
      "Schedule defrost cycle optimization"
    ],
    maintenanceHistory: [
      { date: "2025-01-20", action: "Coil cleaning", technician: "David Wilson" },
      { date: "2024-11-28", action: "Temperature sensor calibration", technician: "Sarah Lee" }
    ]
  },
  {
    id: "C3",
    name: "Cooler Unit C3",
    location: "Warehouse Section 3",
    healthScore: 34,
    status: 'critical',
    currentMetrics: {
      temperature: -12.8,
      humidity: 75,
      compressorCycles: 28
    },
    temperatureTrend: [
      { time: "00:00", value: -16.5 },
      { time: "04:00", value: -16.8 },
      { time: "08:00", value: -15.9 },
      { time: "12:00", value: -16.2 },
      { time: "16:00", value: -15.7 },
      { time: "20:00", value: -16.1 }
    ],
    compressorCycles7Days: [
      { day: "Mon", cycles: 75 },
      { day: "Tue", cycles: 82 },
      { day: "Wed", cycles: 79 },
      { day: "Thu", cycles: 88 },
      { day: "Fri", cycles: 91 },
      { day: "Sat", cycles: 85 },
      { day: "Sun", cycles: 83 }
    ],
    lastDefrost: "28/07/2025, 11:42:18",
    estimatedTimeToFailure: {
      days: 12,
      confidence: 94
    },
    recommendations: [
      "URGENT: Schedule immediate maintenance",
      "Replace compressor motor",
      "Check refrigerant levels",
      "Inspect electrical connections"
    ],
    maintenanceHistory: [
      { date: "2024-12-15", action: "Emergency repair", technician: "Mike Johnson" },
      { date: "2024-10-05", action: "Compressor inspection", technician: "Anna Rodriguez" }
    ]
  }
];