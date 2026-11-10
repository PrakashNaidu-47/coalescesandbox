import { EmergencyResource } from '../models/ResourceSchema';

export class ResourceTrackingService {
  private resources: Map<string, EmergencyResource> = new Map();

  public updateLocation(id: string