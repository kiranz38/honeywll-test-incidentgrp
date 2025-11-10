import { dedupeAndSortIncidents, type Incident } from '../src/utils/incidents';

test('deduplicates by Id keeping latest DateTime and sorts by Priority asc then DateTime desc', () => {
  const input: Incident[] = [
    { Id: '1', Name: 'A', Priority: 2, DateTime: '2025-01-01T10:00:00Z' },
    { Id: '1', Name: 'A', Priority: 2, DateTime: '2025-01-02T10:00:00Z' }, // newer duplicate
    { Id: '2', Name: 'B', Priority: 1, DateTime: '2025-01-02T09:00:00Z' },
    { Id: '3', Name: 'C', Priority: 3, DateTime: '2025-01-03T09:00:00Z' },
    { Id: '4', Name: 'D', Priority: 1, DateTime: '2025-01-01T09:00:00Z' },
  ];

  const out = dedupeAndSortIncidents(input);
  // Deduped length should be 4
  expect(out.length).toBe(4);

  // Should be sorted by priority asc: IDs with priority 1 first, then 2, then 3
  const priorities = out.map(i => i.Priority);
  expect(priorities).toEqual([1, 1, 2, 3]);

  // Within same priority (1), newer DateTime first: IDs 2 (Jan 2) before 4 (Jan 1)
  const firstTwoIds = out.slice(0,2).map(i => i.Id);
  expect(firstTwoIds).toEqual(['2','4']);
});