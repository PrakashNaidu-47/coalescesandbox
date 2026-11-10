import { Incident } from '../models/IncidentSchema';

export class IncidentService {
  private incidents: Map<string, Incident> = new Map();

  public createIncident(incident: Incident): Incident {
    this.incidents.set(incident.id, incident);
    return incident;
  }

  public getIncident(id: string): Incident | undefined {
    return this.incidents.get(id);
  }

  public listIncidents(): Incident[] {
    return Array.from(this.incidents.values());
  }
}