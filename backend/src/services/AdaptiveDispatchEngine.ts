interface DispatchOptimizationRequest {
  incidentId: string;
  priorityScore: number;
  targetLocation: { latitude: number; longitude: number };
  requiredCapabilities: string[];
}

interface DispatchOptimizationResult {
  incidentId: string;
  recommendedResourceIds: string[];
  estimatedArrivalTimes: Record<string, number>;
  rationale: string;
}

export class AdaptiveDispatchEngine {
  public optimizeDispatch(request: DispatchOptimizationRequest, availableResources: any[]): DispatchOptimizationResult {
    const eligible = availableResources.filter(r => 
      r.status === 'AVAILABLE' && 
      request.requiredCapabilities.every(cap => r.capabilities?.includes(cap))
    );

    const scored = eligible.map(r => {
      const dist = Math.hypot(
        r.currentLocation.latitude - request.targetLocation.latitude,
        r.currentLocation.longitude - request.targetLocation.longitude
      );
      return { resource: r, score: dist };
    });

    scored.sort((a, b) => a.score - b.score);

    const topResources = scored.slice(0, 2);
    const recommendedResourceIds = topResources.map(s => s.resource.id);
    const estimatedArrivalTimes: Record<string, number> = {};
    topResources.forEach(s => {
      estimatedArrivalTimes[s.resource.id] = Math.round(s.score * 60);
    });

    return {
      incidentId: request.incidentId,
      recommendedResourceIds,
      estimatedArrivalTimes,
      rationale: `Selected top ${recommendedResourceIds.length} resources based on proximity and capability match for priority ${request.priorityScore}.`
    };
  }
}
