import { test, expect, type Page } from '@playwright/test';

async function expectReadableText(page: Page) {
  const undersized = await page.evaluate(() => {
    const minimum = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return [...document.body.querySelectorAll<HTMLElement>('*')].flatMap(element => {
      if (!element.checkVisibility() || ['SCRIPT', 'STYLE'].includes(element.tagName)) return [];
      const text = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim();
      const formText = element instanceof HTMLInputElement ? element.value || element.placeholder : '';
      const failures: string[] = [];
      if ((text || formText) && parseFloat(getComputedStyle(element).fontSize) < minimum - 0.01) failures.push(`${element.tagName}: ${(text || formText).slice(0, 70)}`);
      for (const pseudo of ['::before', '::after']) {
        const style = getComputedStyle(element, pseudo);
        if (!['none', 'normal', '""'].includes(style.content) && parseFloat(style.fontSize) < minimum - 0.01) failures.push(`${element.tagName}${pseudo}: ${style.content}`);
      }
      return failures;
    }).slice(0, 12);
  });
  expect.soft(undersized, page.url()).toEqual([]);
}

test('tüm sayfa ve pencerelerde metin en az 1rem', async ({ page }) => {
  for (const route of ['overview', 'video', 'software', 'architecture', 'tools', 'cost', 'risks', 'roadmap', 'methodology', 'sources', 'sources?tab=references', 'sources?tab=verified', 'sources?doc=D05']) {
    await page.goto(`#/${route}`);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const toggle of await page.locator('.mobile-section-toggle:not(:disabled)').all()) {
      if (await toggle.isVisible()) await toggle.click();
    }
    if (route.includes('doc=')) await expect(page.locator('.source-fulltext')).toBeVisible();
    await expectReadableText(page);
    expect.soft(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }
  await page.goto('#/overview');
  await page.getByRole('button', { name: 'Araştırmada ara' }).filter({ visible: true }).first().click();
  await page.getByRole('searchbox').fill('TDD');
  await expect(page.locator('.search-results')).toBeVisible();
  await expectReadableText(page);
});

test('1rem tarayıcı kök boyutuyla büyür ve 320px akışını korur', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ['overview', 'video', 'tools', 'cost', 'sources']) {
    await page.goto(`#/${route}`);
    await page.addStyleTag({ content: ':root { font-size: 20px; }' });
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expectReadableText(page);
    expect.soft(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }
});

test('tam rapor ve yazdırma metni en az 1rem', async ({ page }) => {
  await page.goto('rapor.html');
  await expectReadableText(page);
  await page.emulateMedia({ media: 'print' });
  await expectReadableText(page);
});
