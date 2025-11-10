import React from 'react';
import { Incident, formatPriority, localDateTime } from '../utils/incidents';
import { PriorityIcon } from './PriorityIcon';

export function IncidentsTable({ items }: { items: Incident[] }) {
  return (
    <table style={{width:'100%', borderCollapse:'collapse'}}>
      <thead>
        <tr>
          <th style={th}>Priority</th>
          <th style={th}>Incident</th>
          <th style={th}>Date/Time</th>
          <th style={th}>Priority (Text)</th>
        </tr>
      </thead>
      <tbody>
        {items.map(row => (
          <tr key={row.Id}>
            <td style={td}><PriorityIcon p={row.Priority}/></td>
            <td style={td}>{row.Name}</td>
            <td style={td}>{localDateTime(row.DateTime)}</td>
            <td style={td}>{formatPriority(row.Priority)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = { textAlign:'left', borderBottom:'1px solid #ddd', padding:'8px', fontWeight:600 };
const td: React.CSSProperties = { borderBottom:'1px solid #eee', padding:'8px' };
