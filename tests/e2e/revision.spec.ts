import { test, expect } from '@playwright/test';

test('rehber ve sayılar tam raporda ve aramada bulunur', async ({ page, request }) => {
  await page.goto('#/guide?topic=personal-stack');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('İsmail');
  await expect(page.locator('main')).toContainText('MetaFramer');
  await page.goto('#/claims?claim=gpu-break-even');
  await expect(page.locator('main')).toContainText('$42');
  await page.getByRole('button', { name: 'Araştırmada ara' }).first().click();
  await page.getByRole('searchbox', { name: 'Tüm araştırmada ara' }).fill('Diffblue');
  await expect(
    page.getByRole('dialog').locator('a[href*="guide?topic=testing-review"]'),
  ).toBeVisible();
  const report = await (await request.get('rapor.md')).text();
  for (const term of ['MetaFramer', 'GEX131', 'Diffblue', 'SynthID', 'KVKK', '22,50', 'Greptile'])
    expect(report).toContain(term);
});

test('araç bağlantısı detay açar, filtre ve karşılaştırma URL ile korunur', async ({ page }) => {
  await page.goto('#/tools?tool=T23');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ComfyUI');
  for (const name of ['Fiyat ve birim', 'Lisans ve haklar', 'Entegrasyon', 'Sınırlar'])
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  await page.goto('#/tools?category=Kurgu&q=Remotion&compare=T14,T15&view=compare');
  await expect(page.getByRole('dialog')).toContainText('Remotion');
  await expect(page.getByRole('dialog')).toContainText('FFmpeg');
  await page.getByRole('button', { name: 'Pencereyi kapat' }).click();
  await page.reload();
  await expect(page.getByRole('searchbox', { name: 'Araçlarda ara' })).toHaveValue('Remotion');
  await expect(page.getByRole('button', { name: 'Kurgu', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('kaynak okuma düzeni ve konu izi görünür, tema kalıcıdır', async ({ page }) => {
  await page.goto('#/sources?doc=D01');
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.source-reading p').first()).toBeVisible();
  await expect(dialog.getByText('Okuma düzeni', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pencereyi kapat' }).click();
  await page.goto('#/coverage?doc=D01');
  await expect(page.locator('main a[href*="guide?topic="]').first()).toBeVisible();
  await page.getByLabel('Görünüm teması').selectOption('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'futuristic-dark');
});
