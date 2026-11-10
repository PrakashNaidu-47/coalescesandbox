export class ResourceTrackingService {
  private resourceLocations: Map<string, { latitude: number; longitude: number; updatedAt: string }> = new Map();

  public updateLocation(id: string, latitude: number, longitude: number): void {
    const existing = this.resourceLocations.get(id);
    if (existing) {
      const delta = Math.hypot(latitude - existing.latitude, longitude - existing.longitude);
      if (delta > 10.0) {
        console.warn(`Unreliable GPS jump detected for resource ${id}. Discarding erratic telemetry.`);
        return;
      }
    }

    this.resourceLocations.set(id, {
      latitude,
      longitude,
      updatedAt: new Date().toISOString()
    });
  }

  public getLocation(id: string) {
    return this.resourceLocations.get(id) || null;
  }

  public getAllLocations() {
    return Array.from(this.resourceLocations.entries()).map(([id, loc]) => ({ id, ...loc }));
  }
}
