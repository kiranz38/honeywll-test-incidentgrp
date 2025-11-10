export type Priority = 1 | 2 | 3; // 1=High, 2=Medium, 3=Low per spec

export type Incident = {
  Id: string;
  Name: string;
  Priority: Priority;
  DateTime: string; 
};

//dateParsing
function safeTime(iso?: string): number {
  if (!iso) return 0;                    
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;         
}

//Deduplication by id
export function dedupeAndSortIncidents(items: Incident[]): Incident[] {
  const map = new Map<string, Incident>();

  for (const it of items) {
    const existing = map.get(it.Id);
    if (!existing) {
      map.set(it.Id, it);
    } else {
      if (safeTime(it.DateTime) > safeTime(existing.DateTime)) {
        map.set(it.Id, it);
      }
    }
  }

  const arr = Array.from(map.values());

  arr.sort((a, b) => {
    if (a.Priority !== b.Priority) return a.Priority - b.Priority;
    return safeTime(b.DateTime) - safeTime(a.DateTime); 
  });

  return arr;
}

export function formatPriority(p: Priority): 'High' | 'Medium' | 'Low' {
  return p === 1 ? 'High' : p === 2 ? 'Medium' : 'Low';
}

export function localDateTime(iso: string): string {
  const t = safeTime(iso);
  if (!t) return '-';                   
  const d = new Date(t);

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(d);
  } catch {
    return d.toLocaleString();          
  }
}
