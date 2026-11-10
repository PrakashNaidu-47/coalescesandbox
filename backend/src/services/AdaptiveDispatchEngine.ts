import { DispatchOptimizationRequest, DispatchOptimizationResult } from '../models/IncidentSchema';
import { EmergencyResource } from '../models/ResourceSchema';

export class AdaptiveDispatchEngine {
  public optimizeDispatch(request: DispatchOptimizationRequest, availableResources: EmergencyResource[]): DispatchOptimizationResult {
    const matchingResources = availableResources.filter(r => r.status === 'AVAILABLE');
    
    const scored = matchingResources.map(res => {
      const dist = Math.hypot(
        res.currentLocation.latitude - request.targetLocation.latitude,
        res.currentLocation.longitude - request.targetLocation.longitude
      );
      return { res