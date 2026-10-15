import assert from 'node:assert';

function parseReleaseData(data, fallback) {
  if (!data || !Array.isArray(data.assets)) return null;
  const version = (data.tag_name || '').replace(/^v/, '') || fallback.version;
  const apk = data.assets.find(a => typeof a.name === 'string' && a.name.endsWith('.apk'));
  const exeAssets = data.assets.filter(a => typeof a.name === 'string' && a.name.endsWith('.exe'));

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

// 1. Test parsing release with version.apk
const sample1 = {
  tag_name: 'v5.15.4',
  assets: [
    { name: '5.15.4.apk', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4.apk' },
    { name: '5.15.4-x64.exe', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4-x64.exe' },
    { name: '5.15.4-arm.exe', browser_download_url: 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4-arm.exe' }
  ]
};
const res1 = parseReleaseData(sample1, fallback);
assert.equal(res1.version, '5.15.4');
assert.equal(res1.apkUrl, 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.15.4/5.15.4.apk');
assert.equal(res1.windowsDownloads.length, 2);
assert.equal(res1.windowsDownloads[0].label, 'Windows (x64)');
assert.equal(res1.windowsDownloads[1].label, 'Windows (ARM64)');

// 2. Test fallback when no apk in assets
const sample2 = {
  tag_name: '5.16.0',
  assets: []
};
const res2 = parseReleaseData(sample2, fallback);
assert.equal(res2.version, '5.16.0');
assert.equal(res2.apkUrl, 'https://github.com/AnimeTV-Fork/rc-store/releases/download/5.16.0/5.16.0.apk');

// 3. Test null / malformed response
assert.equal(parseReleaseData(null, fallback), null);
assert.equal(parseReleaseData({}, fallback), null);

console.log('All release parser asserts passed!');
