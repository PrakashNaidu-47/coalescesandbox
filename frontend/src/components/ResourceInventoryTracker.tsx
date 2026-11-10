import React, { useEffect, useState } from 'react';

interface EmergencyResource {
  id: string;
  name: string;
  type: 'MEDICAL' | 'FIRE' | 'SEARCH_RESCUE' | 'LOGISTICS';
  status: 'AVAILABLE' | 'EN_ROUTE' | 'ON_SCENE' | 'OFFLINE';
  currentLocation: { latitude: number; longitude: number };
  capacity: number;
}

export const ResourceInventoryTracker: React.FC = () => {
  const [resources, setResources] = useState<EmergencyResource[]>([]);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error('Failed to load resource inventory', err));
  }, []);

  const filteredResources = filter === 'ALL' 
    ? resources 
    : resources.filter(r => r.type === filter);

  return (
    <div className="resource-inventory-tracker p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Emergency Resource Inventory</h2>
        <div className="flex gap-2">
          {['ALL', 'MEDICAL', 'FIRE', 'SEARCH_RESCUE', 'LOGISTICS'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded text-sm ${filter === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div key={res.id} className="border p-3 rounded shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">{res.name}</span>
              <span className={`px-2 py-0.5 text-xs rounded ${res.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {res.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Type: {res.type}</p>
            <p className="text-sm text-gray-600">Capacity: {res.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
