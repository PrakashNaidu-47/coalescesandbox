export interface IncidentReport {
  id: string;
  location: { lat: number; lng: number };
  threatToLife: boolean;
  vulnerableCount: number;
  status: 'REPORTED' | 'TRIAGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priorityScore: number;
  createdAt: string;
}

export interface SpatialTelemetryPayload {
  responderId: string;
  coordinates: [number, number];
  timestamp: number;
  batteryStatus: number;
  connectivityState: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

export interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export class QuadNode {
  bounds: BoundingBox;
  capacity: number;
  points: SpatialTelemetryPayload[] = [];
  divided = false;
  northeast?: QuadNode;
  northwest?: QuadNode;
  southeast?: QuadNode;
  southwest?: QuadNode;

  constructor(bounds: BoundingBox, capacity = 64) {
    this.bounds = bounds;
    this.capacity = capacity;
  }

  insert(point: SpatialTelemetryPayload): boolean {
    const [lng, lat] = point.coordinates;
    if (
      lat < this.bounds.minLat ||
      lat > this.bounds.maxLat ||
      lng < this.bounds.minLng ||
      lng > this.bounds.maxLng
    ) {
      return false;
    }
    if (this.points.length < this.capacity && !this.divided) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    return (
      this.northeast!.insert(point) ||
      this.northwest!.insert(point) ||
      this.southeast!.insert(point) ||
      this.southwest!.insert(point)
    );
  }

  private subdivide(): void {
    const midLat = (this.bounds.minLat + this.bounds.maxLat) / 2;
    const midLng = (this.bounds.minLng + this.bounds.maxLng) / 2;
    this.northeast = new QuadNode({ minLat: midLat, maxLat: this.bounds.maxLat, minLng: midLng, maxLng: this.bounds.maxLng }, this.capacity);
    this.northwest = new QuadNode({ minLat: midLat, maxLat: this.bounds.maxLat, minLng: this.bounds.minLng, maxLng: midLng }, this.capacity);
    this.southeast = new QuadNode({ minLat: this.bounds.minLat, maxLat: midLat, minLng: midLng, maxLng: this.bounds.maxLng }, this.capacity);
    this.southwest = new QuadNode({ minLat: this.bounds.minLat, maxLat: midLat, minLng: this.bounds.minLng, maxLng: midLng }, this.capacity);
    this.divided = true;
    const existing = [...this.points];
    this.points = [];
    existing.forEach((pt) => this.insert(pt));
  }
}