import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const route of [
  'overview',
  'video',
  'architecture',
  'tools',
  'cost',
  'roadmap',
  'sources',
  'sources?tab=verified',
]) {
  test(`${route}: erişilebilirlik ve taşma`, async ({ page }) => {
    await page.goto(`#/${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test('klavye araması, Escape ve odak geri dönüşü', async ({ page }) => {
  await page.goto('');
  const trigger = page
    .getByRole('button', { name: 'Araştırmada ara' })
    .filter({ visible: true })
    .first();
  await trigger.focus();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('searchbox', { name: 'Tüm araştırmada ara' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('kaynak ağ hatası yeniden denemeyle kurtarılır', async ({ page }) => {
  await page.route('**/sources/D05.txt', (route) => route.abort());
  await page.goto('#/sources?doc=D05');
  await expect(page.getByRole('alert')).toContainText('yüklenemedi');
  await page.unroute('**/sources/D05.txt');
  await page.getByRole('button', { name: 'Tekrar dene' }).click();
  await expect(page.getByRole('dialog')).toContainText('EYLUL 2026');
});

for (const theme of ['light', 'dark']) {
  test(`${theme}: yeni rehber, tablo, araç ve sayısal kayıt erişilebilir`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('futuristic:theme', value), theme);
    for (const route of [
      'overview',
      'guide',
      'guide?topic=personal-stack',
      'tools?tool=T23',
      'claims?claim=gpu-break-even',
      'coverage?doc=D06',
      'tools?compare=T14,T15&view=compare',
    ]) {
      await page.goto(`#/${route}`);
      await expect(page.locator('h1')).toBeVisible();
      for (const toggle of await page
        .locator('.mobile-section-toggle[aria-expanded="false"]')
        .all())
        if (await toggle.isVisible()) await toggle.click();
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect.soft(results.violations, `${theme} ${route}`).toEqual([]);
      expect
        .soft(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route)
        .toBe(true);
    }
  });
}
