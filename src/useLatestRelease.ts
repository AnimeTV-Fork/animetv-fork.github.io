import { useState, useEffect } from 'react';

export interface ReleaseAsset {
  label: string;
  shortLabel: string;
  url: string;
  arch: 'x64' | 'arm' | 'x86' | 'generic';
  version: string;
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
    {
      label: 'Windows (x64) (v5.15.2)',
      shortLabel: 'Download x64 (v5.15.2)',
      url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.2/5.15.2-x64.exe',
      arch: 'x64',
      version: '5.15.2'
    },
    {
      label: 'Windows (ARM64) (v5.15.2)',
      shortLabel: 'Download ARM64 (v5.15.2)',
      url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.2/5.15.2-arm.exe',
      arch: 'arm',
      version: '5.15.2'
    },
    {
      label: 'Windows (x86)',
      shortLabel: 'Download x86',
      url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe',
      arch: 'x86',
      version: '5.15.3'
    }
  ]
};

const CACHE_KEY = 'animetv_latest_release';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function parseReleaseData(data: any): LatestRelease | null {
  if (!data) return null;
  const list = Array.isArray(data) ? data : [data];
  if (list.length === 0 || !list[0]) return null;

  const latest = list[0];
  const latestVersion = (latest.tag_name || '').replace(/^v/, '') || FALLBACK_RELEASE.version;
  const apk = (latest.assets || []).find((a: any) => typeof a.name === 'string' && a.name.endsWith('.apk'));

  // Collect newest asset for each architecture independently across releases
  const buckets: Partial<Record<'x64' | 'arm' | 'x86' | 'generic', { url: string; version: string }>> = {};

  for (const rel of list) {
    const relVer = (rel.tag_name || '').replace(/^v/, '');
    for (const asset of (rel.assets || [])) {
      const name = (asset.name || '').toLowerCase();
      if (!name.endsWith('.exe')) continue;

      let arch: 'x64' | 'arm' | 'x86' | 'generic' = 'generic';
      if (name.includes('arm')) arch = 'arm';
      else if (name.includes('x64')) arch = 'x64';
      else if (name.includes('x86')) arch = 'x86';

      if (!buckets[arch]) {
        buckets[arch] = {
          url: asset.browser_download_url,
          version: relVer
        };
      }
    }
  }

  const primaryWin = buckets.x64 || buckets.generic;
  const windowsDownloads: ReleaseAsset[] = [];

  if (primaryWin) {
    const isOlder = primaryWin.version && primaryWin.version !== latestVersion;
    windowsDownloads.push({
      label: isOlder ? `Windows (x64) (v${primaryWin.version})` : 'Windows (x64)',
      shortLabel: isOlder ? `Download x64 (v${primaryWin.version})` : 'Download x64',
      url: primaryWin.url,
      arch: 'x64',
      version: primaryWin.version
    });
  }

  if (buckets.arm) {
    const isOlder = buckets.arm.version && buckets.arm.version !== latestVersion;
    windowsDownloads.push({
      label: isOlder ? `Windows (ARM64) (v${buckets.arm.version})` : 'Windows (ARM64)',
      shortLabel: isOlder ? `Download ARM64 (v${buckets.arm.version})` : 'Download ARM64',
      url: buckets.arm.url,
      arch: 'arm',
      version: buckets.arm.version
    });
  }

  if (buckets.x86) {
    const isOlder = buckets.x86.version && buckets.x86.version !== latestVersion;
    windowsDownloads.push({
      label: isOlder ? `Windows (x86) (v${buckets.x86.version})` : 'Windows (x86)',
      shortLabel: isOlder ? `Download x86 (v${buckets.x86.version})` : 'Download x86',
      url: buckets.x86.url,
      arch: 'x86',
      version: buckets.x86.version
    });
  }

  return {
    version: latestVersion,
    apkUrl: apk?.browser_download_url || `https://github.com/AnimeTV-Fork/rc-store/releases/download/${latestVersion}/${latestVersion}.apk`,
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
    inFlightPromise = fetch('https://api.github.com/repos/AnimeTV-Fork/rc-store/releases?per_page=10')
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
