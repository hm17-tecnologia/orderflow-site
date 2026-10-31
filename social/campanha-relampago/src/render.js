const { chromium } = require('/tmp/claude-0/-home-claude/a60a2b45-674a-5722-9654-096bfc5d1313/scratchpad/socialpng/node_modules/playwright-core');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const [name, w, h] of [['feed', 1080, 1350], ['story', 1080, 1920]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + path.join(__dirname, name + '.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const over = await p.evaluate(() => document.querySelector('.wrap').scrollHeight);
    console.log(name, 'content height', over);
    await p.screenshot({ path: path.join(__dirname, '..', name + '.png') });
  }
  await b.close();
})();
