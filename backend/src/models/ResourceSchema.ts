export interface EmergencyResource {
  id: string;
  name: string;
  type: 'MEDICAL' | 'FIRE' | 'SEARCH_RESCUE' | 'LOGISTICS';
  status: 'AVAILABLE' | 'EN_ROUTE' | 'ON_SCENE' | 'OFFLINE';
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
}