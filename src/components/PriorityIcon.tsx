import React from 'react';
import high from '../assets/alarm-high.svg';
import med from '../assets/alarm-medium.svg';
import low from '../assets/alarm-low.svg';
import { Priority } from '../utils/incidents';

export function PriorityIcon({ p }: { p: Priority }) {
  const src = p === 1 ? high : p === 2 ? med : low;
  const alt = p === 1 ? 'High' : p === 2 ? 'Medium' : 'Low';
  return <img src={src} alt={`${alt} priority`} width={18} height={18} />;
}
