import { test, expect } from '@playwright/test';

test('gerçek fiyat ve lisans verisi filtrelenir ve URL ile korunur', async ({ page }) => {
  await page.goto('#/tools');
  await page.getByLabel('Fiyat verisi olanlar').check();
  await expect(page).toHaveURL(/data=pricing/);
  await page.getByRole('searchbox', { name: 'Araçlarda ara' }).fill('ComfyUI');
  await expect(page.getByTestId('tool-card')).toHaveCount(0);
  await page.getByLabel('Fiyat verisi olanlar').uncheck();
  await page.getByLabel('Lisans bilgisi olanlar').check();
  await expect(page.getByTestId('tool-card')).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel('Lisans bilgisi olanlar')).toBeChecked();
  await expect(page.getByTestId('tool-card')).toHaveCount(1);
  await expect(page.getByTestId('tool-card')).toContainText('Fiyat belirtilmemiş');
});

test('rapor indirme seçenekleri ve sınırı belirli kaynak bağlamı', async ({ page, request }) => {
  await page.goto('#/sources');
  await expect(page.getByRole('link', { name: 'Yönetici özeti · HTML' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Araştırma raporu · HTML' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tam ekler · HTML' })).toBeVisible();
  for (const name of ['yonetici-ozeti.md', 'rapor.md', 'rapor-ekleri.md'])
    expect((await request.get(name)).ok()).toBe(true);
  await page.goto('#/tools?tool=T23');
  await page.getByText(/D03 · Kaynak pasajını aç/).click();
  const excerpt = page.locator('.collapse-content .source-excerpt').first();
  await expect(excerpt).toBeVisible();
  await expect(excerpt).toContainText('ComfyUI');
  await expect(excerpt.getByRole('table')).toBeVisible();
  await expect(page.locator('main')).toContainText('Alanların tamamını doğrulayan kanıt değildir');
});
