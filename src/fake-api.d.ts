type Location = {
  name: string;
  id: string;
};

type Incident = {
  name: string;
  id: number;
  priority: 1 | 2 | 3;
  datetime: string;
  locationId: string;
};

declare const fakeApi: {
  getLocations(): Promise<Location[]>;
  getIncidentsByLocationId(locationId: string): Promise<Incident[]>;
};

export default fakeApi;