import React from 'react';
import { Incident, formatPriority, localDateTime } from '../utils/incidents';
import { PriorityIcon } from './PriorityIcon';

export function IncidentsList({ items }: { items: Incident[] }) {
  return (
    <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:8}}>
      {items.map(row => (
        <li key={row.Id} style={{display:'flex', gap:12, alignItems:'center', border:'1px solid #eee', borderRadius:8, padding:12}}>
          <PriorityIcon p={row.Priority} />
          <div style={{flex:1}}>
            <div style={{fontWeight:600}}>{row.Name}</div>
            <div style={{color:'#555', fontSize:13}}>{localDateTime(row.DateTime)} · {formatPriority(row.Priority)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
