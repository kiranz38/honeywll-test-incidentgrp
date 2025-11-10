import React, { useEffect, useMemo, useState } from 'react';
import { fetchIncidents } from './utils/api';
import { dedupeAndSortIncidents, Priority, Incident } from './utils/incidents';
import { IncidentsTable } from './components/IncidentsTable';
import { IncidentsList } from './components/IncidentsList';

export default function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [view, setView] = useState<'table'|'list'>('table');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchIncidents();
        setIncidents(dedupeAndSortIncidents(data));
      } catch (e: any) {
        setError(e?.message || 'Failed to load incidents');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{padding:16}}>Loading…</div>;
  if (error) return <div style={{padding:16,color:'crimson'}}>Error: {error}</div>;

  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto', padding: 16}}>
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
        <h1 style={{margin:0, fontSize:20}}>Incidents</h1>
        <div role="group" aria-label="View toggle" style={{display:'inline-flex', gap:8}}>
          <button onClick={() => setView('table')} disabled={view==='table'}>Table</button>
          <button onClick={() => setView('list')} disabled={view==='list'}>List</button>
        </div>
      </header>
      {view === 'table' ? <IncidentsTable items={incidents}/> : <IncidentsList items={incidents}/>}
    </div>
  );
}
