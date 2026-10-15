import { useState, useEffect } from 'react';

export interface ReleaseAsset {
  label: string;
  url: string;
}

export interface LatestRelease {
  version: string;
  apkUrl: string;
  windowsDownloads: ReleaseAsset[];
}

export const FALLBACK_RELEASE: LatestRelease = {
  version: '5.15.3',
  apkUrl: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3.apk',
  windowsDownloads: [
    { label: 'Windows (x86/x64)', url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe' }
  ]
};

const CACHE_KEY = 'animetv_latest_release';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function parseReleaseData(data: any): LatestRelease | null {
  if (!data || !Array.isArray(data.assets)) return null;
  const version = (data.tag_name || '').replace(/^v/, '') || FALLBACK_RELEASE.version;
  const apk = data.assets.find((a: any) => typeof a.name === 'string' && a.name.endsWith('.apk'));
  const exeAssets = data.assets.filter((a: any) => typeof a.name === 'string' && a.name.endsWith('.exe'));

  const windowsDownloads: ReleaseAsset[] = exeAssets.map((a: any) => {
    const name = a.name.toLowerCase();
    let label = 'Windows';
    if (name.includes('arm')) label = 'Windows (ARM64)';
    else if (name.includes('x64')) label = 'Windows (x64)';
    else if (name.includes('x86')) label = 'Windows (x86)';
    return {
      label,
      url: a.browser_download_url
    };
  });

  return {
    version,
    apkUrl: apk?.browser_download_url || `https://github.com/AnimeTV-Fork/rc-store/releases/download/${version}/${version}.apk`,
    windowsDownloads: windowsDownloads.length > 0 ? windowsDownloads : FALLBACK_RELEASE.windowsDownloads
  };
}

let memoryCache: LatestRelease | null = null;
let inFlightPromise: Promise<LatestRelease> | null = null;

// ponytail: in-memory + sessionStorage cache with 10m TTL avoids GitHub unauthenticated 60 req/hr rate limit. Upgrade to backend proxy if traffic exceeds client limit.
export async function fetchLatestRelease(): Promise<LatestRelease> {
  if (memoryCache) return memoryCache;

  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const { data, exp } = JSON.parse(raw);
      if (Date.now() < exp && data?.apkUrl) {
        memoryCache = data;
        return data;
      }
    }
  } catch {}

  if (!inFlightPromise) {
    inFlightPromise = fetch('https://api.github.com/repos/AnimeTV-Fork/rc-store/releases/latest')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        const parsed = parseReleaseData(data) || FALLBACK_RELEASE;
        memoryCache = parsed;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: parsed, exp: Date.now() + CACHE_TTL_MS }));
        } catch {}
        return parsed;
      })
      .catch(() => FALLBACK_RELEASE)
      .finally(() => {
        inFlightPromise = null;
      });
  }

  return inFlightPromise;
}

export function useLatestRelease(): LatestRelease {
  const [release, setRelease] = useState<LatestRelease>(() => {
    if (memoryCache) return memoryCache;
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const { data, exp } = JSON.parse(raw);
        if (Date.now() < exp && data?.apkUrl) return data;
      }
    } catch {}
    return FALLBACK_RELEASE;
  });

  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  return release;
}
