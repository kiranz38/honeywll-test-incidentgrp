import type { Incident } from './incidents';
import fakeApi from '../fake-api'; 
export async function fetchIncidents(): Promise<Incident[]> {
  const locations = await fakeApi.getLocations();
  const all: Incident[] = [];

  for (const loc of locations) {
    const list = await fakeApi.getIncidentsByLocationId(loc.id);
    for (const it of list) {
      all.push({
        Id: String(it.id),
        Name: it.name,
        Priority: it.priority as 1|2|3,
        DateTime: it.datetime
      });
    }
  }
  return all;
}
