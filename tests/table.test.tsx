import { render, screen } from '@testing-library/react';
import React from 'react';
import { IncidentsTable } from '../src/components/IncidentsTable';
import type { Incident } from '../src/utils/incidents';

test('renders rows with correct columns', () => {
  const items: Incident[] = [
    { Id: '10', Name: 'Power', Priority: 2, DateTime: '2018-01-22T20:25:18Z' },
    { Id: '11', Name: 'Fire', Priority: 1, DateTime: '2018-01-22T22:25:18Z' },
  ];

  render(<IncidentsTable items={items} />);

  // Headers
  expect(screen.getByText('Priority')).toBeInTheDocument();
  expect(screen.getByText('Incident')).toBeInTheDocument();
  expect(screen.getByText('Date/Time')).toBeInTheDocument();
  expect(screen.getByText('Priority (Text)')).toBeInTheDocument();

  // Row cells
  expect(screen.getByText('Power')).toBeInTheDocument();
  expect(screen.getByText('Fire')).toBeInTheDocument();
  expect(screen.getByText(/High|Medium|Low/)).toBeInTheDocument();
});