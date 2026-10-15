import assert from 'node:assert';

function parseReleaseData(data, fallback) {
  if (!data) return null;
  const list = Array.isArray(data) ? data : [data];
  if (list.length === 0 || !list[0]) return null;

  const latest = list[0];
  const latestVersion = (latest.tag_name || '').replace(/^v/, '') || fallback.version;
  const apk = (latest.assets || []).find(a => typeof a.name === 'string' && a.name.endsWith('.apk'));

  const buckets = {};
  for (const rel of list) {
    const relVer = (rel.tag_name || '').replace(/^v/, '');
    for (const asset of (rel.assets || [])) {
      const name = (asset.name || '').toLowerCase();
      if (!name.endsWith('.exe')) continue;

      let arch = 'generic';
      if (name.includes('arm')) arch = 'arm';
      else if (name.includes('x64')) arch = 'x64';
      else if (name.includes('x86')) arch = 'x86';

      if (!buckets[arch]) {
        buckets[arch] = { url: asset.browser_download_url, version: relVer };
      }
    }
  }

  const primaryWin = buckets.x64 || buckets.generic;
  const windowsDownloads = [];

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
    windowsDownloads: windowsDownloads.length > 0 ? windowsDownloads : fallback.windowsDownloads
  };
}

const fallback = {
  version: '5.15.3',
  apkUrl: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3.apk',
  windowsDownloads: [
    { label: 'Windows (x64) (v5.15.2)', shortLabel: 'Download x64 (v5.15.2)', url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.2/5.15.2-x64.exe', arch: 'x64', version: '5.15.2' },
    { label: 'Windows (ARM64) (v5.15.2)', shortLabel: 'Download ARM64 (v5.15.2)', url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.2/5.15.2-arm.exe', arch: 'arm', version: '5.15.2' },
    { label: 'Windows (x86)', shortLabel: 'Download x86', url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe', arch: 'x86', version: '5.15.3' }
  ]
};

// Test: 5.15.3 has only apk & x86; 5.15.2 has arm and x64
const sample = [
  {
    tag_name: 'v5.15.3',
    assets: [
      { name: '5.15.3.apk', browser_download_url: 'https://.../5.15.3.apk' },
      { name: '5.15.3-x86.exe', browser_download_url: 'https://.../5.15.3-x86.exe' }
    ]
  },
  {
    tag_name: 'v5.15.2',
    assets: [
      { name: '5.15.2.apk', browser_download_url: 'https://.../5.15.2.apk' },
      { name: '5.15.2-arm.exe', browser_download_url: 'https://.../5.15.2-arm.exe' },
      { name: '5.15.2-x64.exe', browser_download_url: 'https://.../5.15.2-x64.exe' }
    ]
  }
];

const res = parseReleaseData(sample, fallback);
assert.equal(res.version, '5.15.3');
assert.equal(res.windowsDownloads.length, 3);
assert.equal(res.windowsDownloads[0].label, 'Windows (x64) (v5.15.2)');
assert.equal(res.windowsDownloads[1].label, 'Windows (ARM64) (v5.15.2)');
assert.equal(res.windowsDownloads[2].label, 'Windows (x86)');

assert.equal(parseReleaseData(null, fallback), null);
console.log('All per-arch tests passed!');


