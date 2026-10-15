import assert from 'node:assert';

function parseReleaseData(data, fallback) {
  if (!data) return null;
  const list = Array.isArray(data) ? data : [data];
  if (list.length === 0 || !list[0]) return null;

  const latest = list[0];
  const version = (latest.tag_name || '').replace(/^v/, '') || fallback.version;
  const apk = (latest.assets || []).find(a => typeof a.name === 'string' && a.name.endsWith('.apk'));

  // Find newest release containing Windows .exe assets
  const winRelease = list.find(r => (r.assets || []).some(a => typeof a.name === 'string' && a.name.endsWith('.exe')));
  const exeAssets = winRelease ? (winRelease.assets || []).filter(a => typeof a.name === 'string' && a.name.endsWith('.exe')) : [];

  const windowsDownloads = exeAssets.map(a => {
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
    windowsDownloads: windowsDownloads.length > 0 ? windowsDownloads : fallback.windowsDownloads
  };
}

const fallback = {
  version: '5.15.3',
  apkUrl: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3.apk',
  windowsDownloads: [
    { label: 'Windows (x86)', url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe' }
  ]
};

// 1. Test release with both APK and Windows EXE
const sample1 = [
  {
    tag_name: 'v5.15.4',
    assets: [
      { name: '5.15.4.apk', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4.apk' },
      { name: '5.15.4-x64.exe', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4-x64.exe' }
    ]
  }
];
const res1 = parseReleaseData(sample1, fallback);
assert.equal(res1.version, '5.15.4');
assert.equal(res1.apkUrl, 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4.apk');
assert.equal(res1.windowsDownloads[0].label, 'Windows (x64)');

// 2. Test fallback when latest release ONLY has APK and NO Windows binaries
const sampleOnlyApk = [
  {
    tag_name: 'v5.16.0',
    assets: [
      { name: '5.16.0.apk', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.16.0/5.16.0.apk' }
    ]
  },
  {
    tag_name: 'v5.15.3',
    assets: [
      { name: '5.15.3.apk', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3.apk' },
      { name: '5.15.3-x86.exe', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe' }
    ]
  }
];
const resOnlyApk = parseReleaseData(sampleOnlyApk, fallback);
assert.equal(resOnlyApk.version, '5.16.0');
assert.equal(resOnlyApk.apkUrl, 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.16.0/5.16.0.apk');
// Windows download falls back to latest release that had Windows binaries (5.15.3)
assert.equal(resOnlyApk.windowsDownloads[0].url, 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.3/5.15.3-x86.exe');

// 3. Test null / empty input
assert.equal(parseReleaseData(null, fallback), null);
assert.equal(parseReleaseData([], fallback), null);

console.log('All fallback tests passed!');

