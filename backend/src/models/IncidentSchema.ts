export interface Incident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'REPORTED' | 'TRIAGED' | 'DISPATCHED' | 'RESOLVED';
  location: {
    latitude: number;
    longitude: number;
  };
  requiredCapabilities: string[];
  assignedResourceIds: string[];
  reportedAt: string;
  updatedAt: string;
}

export interface DispatchOptimizationRequest {
  incidentId: string;
  priorityScore: number;
  targetLocation: { latitude: number; longitude: number };
  requiredCapabilities: string[];
}

export interface DispatchOptimizationResult {
  incidentId: string;
  recommendedResourceIds: string[];
  estimatedArrivalTimes: Record<string, number>;
  rationale: string;
}