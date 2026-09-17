import { test, expect } from '@playwright/test';

test('rapor akışı, geri dönüş ve okuma kaydı', async ({ page }) => {
  await page.goto('');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Yapay zekâdan');
  await page.getByRole('link', { name: 'Video raporunu oku' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Fikirden yayına, tek bir üretim hattı.',
  );
  await page.getByRole('button', { name: 'Okundu olarak işaretle' }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Okundu işaretini kaldır' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('kaynakların tam metni yüklenir ve Türkçe arama çalışır', async ({ page }) => {
  await page.goto('#/sources');
  await page.getByRole('button', { name: /D05.*Tam metni oku/ }).click();
  await expect(page.getByRole('dialog')).toContainText('EYLUL 2026');
  await page.getByRole('button', { name: 'Pencereyi kapat' }).click();
  await page.getByRole('button', { name: 'Araştırmada ara' }).first().click();
  await page.getByRole('searchbox', { name: 'Tüm araştırmada ara' }).fill('idempotency');
  await expect(page.getByRole('dialog').getByRole('link').first()).toBeVisible();
});

test('maliyet hesaplayıcı gerçek girdilerle sonucu günceller', async ({ page }) => {
  await page.goto('#/cost');
  const output = page.getByTestId('monthly-cost');
  const before = await output.textContent();
  await page.getByLabel('Aylık video sayısı').fill('200');
  await expect(output).not.toHaveText(before!);
  await page.getByLabel('Aylık video sayısı').fill('-2');
  await expect(page.getByRole('alert')).toContainText('Geçerli');
});

test('araç filtreleri ve karşılaştırma', async ({ page }) => {
  await page.goto('#/tools');
  await page.getByRole('searchbox', { name: 'Araçlarda ara' }).fill('Remotion');
  await expect(page.getByTestId('tool-card')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Remotion karşılaştır' }).check();
  await page.getByRole('searchbox', { name: 'Araçlarda ara' }).fill('FFmpeg');
  await page.getByRole('checkbox', { name: 'FFmpeg karşılaştır' }).check();
  await page.getByRole('button', { name: '2 aracı karşılaştır' }).click();
  await expect(page.getByRole('dialog')).toContainText('Remotion');
  await expect(page.getByRole('dialog')).toContainText('FFmpeg');
});

test('320px ekranda tablo kayıtları ve bölüm seçimi kullanılabilir', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('#/video');
  await page.getByRole('button', { name: /Beş üretim yaklaşımı/ }).click();
  await expect(
    page.getByRole('cell', { name: 'Yaklaşım Stok + ses + altyazı', exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Bölümler', exact: true }).click();
  await page
    .getByRole('dialog')
    .getByRole('link', { name: /Yazılım geliştirme/ })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Daha çok kod');
});

test('depolama engeli okumayı bozmaz, yol haritası normalde kalıcıdır', async ({ page }) => {
  await page.goto('#/roadmap');
  await page.getByRole('checkbox').first().check();
  await page.reload();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new Error('blocked');
      },
    }),
  );
  await page.goto('#/video');
  await page.reload();
  await page.getByRole('button', { name: 'Okundu olarak işaretle' }).click();
  await expect(page.getByRole('button', { name: 'Okundu işaretini kaldır' })).toBeVisible();
  await expect(
    page.getByText('Tarayıcı kaydetmeye izin vermiyor; durum bu oturumda korunuyor.'),
  ).toBeVisible();
});

test('statik rapor, arşiv ve kaynaklar Pages alt yolunda sunulur', async ({ request }) => {
  const md = await request.get('rapor.md');
  expect(md.ok()).toBe(true);
  expect(await md.text()).toContain('rapor-ekleri.md');
  const appendix = await request.get('rapor-ekleri.md');
  expect(appendix.ok()).toBe(true);
  expect(await appendix.text()).toContain('E. Tam referans indeksi');
  const html = await request.get('rapor.html');
  expect(await html.text()).toContain('Yazdır / PDF olarak kaydet');
  const zip = await request.get('sources/arastirma-arsivi.zip');
  expect((await zip.body()).subarray(0, 2).toString()).toBe('PK');
});
