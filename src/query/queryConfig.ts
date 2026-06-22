function parseEnvInt(key: string, fallback: number): number {
  const raw = process.env[`NEXT_PUBLIC_${key.replace(/^VITE_/, '')}`] ?? process.env[key];
  if (raw === undefined || raw === '') return fallback;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    console.warn(
      `[queryConfig] ${key}="${raw}" is not a valid non-negative integer. Using fallback: ${fallback}ms.`
    );
    return fallback;
  }
  return parsed;
}

export const queryConfig = {
  staleTime: parseEnvInt('VITE_QUERY_STALE_TIME', 60000),
  gcTime: parseEnvInt('VITE_QUERY_CACHE_TIME', 300000),
} as const;
