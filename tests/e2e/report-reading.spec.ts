import { test, expect } from '@playwright/test';

test('ilk ekran sonuçla başlar, karar tablosu dizinlerden önce gelir', async ({ page }) => {
  await page.goto('');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'İsmail için önce hangi yatırım?',
  );
  const summary = page.locator('.executive-summary');
  await expect(summary.locator('.executive-lead')).toContainText(
    'Önce mevcut yazılım çalışma döngüsünü güçlendir',
  );
  const finding = page.locator('#executive-numbers').getByText('$22,50', { exact: true });
  await expect(finding).toBeInViewport();
  await expect(page.locator('#executive-numbers')).toContainText('372 GB');
  await expect(page.locator('#executive-numbers')).toContainText('$42');
  await expect(page.locator('#executive-numbers tbody tr')).toHaveCount(6);
  await expect(summary).toContainText('Pilotun çıkış ölçütleri');
});

test('özet ilk gezinme ve indirme hedefidir', async ({ page }) => {
  await page.goto('#/software');
  if (await page.getByRole('button', { name: 'Bölümler', exact: true }).isVisible()) {
    await page.getByRole('button', { name: 'Bölümler', exact: true }).click();
    const first = page.getByRole('navigation', { name: 'Bölüm seçimi' }).getByRole('link').first();
    await expect(first).toContainText('Yönetici özeti');
    await expect(first).toContainText('00');
    await first.click();
  } else {
    const first = page
      .getByRole('navigation', { name: 'Rapor bölümleri' })
      .getByRole('link')
      .first();
    await expect(first).toContainText('Yönetici özeti');
    await expect(first).toContainText('00');
    await first.click();
    await expect(page.locator('.sidebar-download').first()).toHaveAttribute(
      'href',
      /yonetici-ozeti\.md$/,
    );
  }
  await expect(page.getByRole('heading', { level: 1 })).toContainText('İsmail');
  await expect(page.locator('.executive-downloads a').first()).toHaveAttribute(
    'href',
    /yonetici-ozeti\.md$/,
  );
  await expect(page.locator('.executive-downloads')).toContainText('Tam rapor');
  await expect(page.locator('.executive-downloads')).toContainText('Ekler');
});

test('mobil rapor açık başlar; toplu açma, bulunca açma ve geniş ekrana geçiş çalışır', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('#/software');
  await expect(page.locator('.article-part-body')).toHaveCount(7);
  await expect(page.locator('.article-body .report-prose')).toHaveCount(7);
  for (const body of await page.locator('.article-part-body').all())
    await expect(body).not.toHaveAttribute('hidden');
  if (!(await page.evaluate(() => 'onbeforematch' in document.createElement('div')))) {
    await expect(page.getByRole('button', { name: 'Tümünü daralt', exact: true })).toHaveCount(0);
    expect(await page.locator('.article-body').innerText()).toContain('Python için Ruff');
    return;
  }
  await page.getByRole('button', { name: 'Tümünü daralt', exact: true }).click();
  const body = page.locator('#software-2-body');
  await expect(body).toHaveAttribute('hidden', 'until-found');
  expect(await body.evaluate((el) => getComputedStyle(el).display)).not.toBe('none');
  // Exercise the browser's native ancestor-reveal path, also used by Find in Page.
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.id = 'native-text-search';
    link.textContent = 'Metinde bul';
    link.href = '#/software:~:text=' + encodeURIComponent('Beklenen davranışı');
    link.style.cssText = 'position:fixed;top:100px;left:10px;z-index:99999;background:white';
    document.body.append(link);
  });
  await page.locator('#native-text-search').click();
  await expect(body).not.toHaveAttribute('hidden');
  await expect(page.locator('#software-3-body')).toHaveAttribute('hidden', 'until-found');
  await page.locator('#native-text-search').evaluate((el) => el.remove());
  await expect(page.getByRole('button', { name: /TDD, ajan için/ })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.getByRole('button', { name: 'Tümünü aç', exact: true }).click();
  await expect(page.locator('.article-part-body[hidden]')).toHaveCount(0);
  const text = await page.locator('.article-body').innerText();
  expect(text).toContain('Prompt caching');
  expect(text).toContain('Python için Ruff');
  await page.getByRole('button', { name: 'Tümünü daralt', exact: true }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('.article-part-body[hidden]')).toHaveCount(0);
  await expect(page.locator('.on-this-page')).toBeVisible();
});

test('bulunca açma desteği yoksa okunabilir açık metne düşer', async ({ page }) => {
  await page.addInitScript(() => {
    for (let proto = HTMLElement.prototype; proto; proto = Object.getPrototypeOf(proto)) {
      if (Object.prototype.hasOwnProperty.call(proto, 'onbeforematch'))
        Reflect.deleteProperty(proto, 'onbeforematch');
    }
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('#/software');
  await expect(page.locator('.article-part-body[hidden]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tümünü daralt', exact: true })).toHaveCount(0);
  await expect(page.locator('.article-body .report-prose')).toHaveCount(7);
  expect(await page.locator('.article-body').innerText()).toContain('Python için Ruff');
});

test('kayan kod örneklerine klavyeyle erişilir', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('#/architecture');
  await expect(page.locator('.report-prose pre')).toHaveCount(2);
  for (const block of await page.locator('.report-prose pre').all()) {
    await expect(block).toHaveAttribute('tabindex', '0');
    await expect(block).toHaveAttribute('role', 'region');
    await expect(block).toHaveAccessibleName('Kod örneği');
    await block.focus();
    await expect(block).toBeFocused();
    expect(await block.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => block.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  }
});

test('okuma sütunu 68ch ile sınırlı, başlıklar ölçüyle ayrışır', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('#/software');
  const measure = await page
    .locator('.article-part-body .report-prose')
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el);
      const ruler = document.createElement('div');
      ruler.style.cssText = `position:absolute;width:68ch;font:${style.font};`;
      document.body.appendChild(ruler);
      const max = ruler.getBoundingClientRect().width;
      ruler.remove();
      const h2 = document.querySelector('.article-part h2')!;
      return {
        width: el.getBoundingClientRect().width,
        max,
        body: parseFloat(style.fontSize),
        h2: parseFloat(getComputedStyle(h2).fontSize),
      };
    });
  expect(measure.width).toBeLessThanOrEqual(measure.max + 1);
  expect(measure.h2).toBeGreaterThan(measure.body * 1.25);
  await page.evaluate(() => document.fonts.ready);
  const lines = await page
    .locator('.article-part .report-prose p')
    .first()
    .evaluate((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const rows = new Map<number, string>();
      let node = walker.nextNode();
      while (node) {
        for (let i = 0; i < (node.textContent || '').length; i++) {
          const range = document.createRange();
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const y = Math.round(range.getBoundingClientRect().y);
          rows.set(y, (rows.get(y) || '') + node.textContent![i]);
        }
        node = walker.nextNode();
      }
      return [...rows.values()].slice(0, -1).map((text) => text.trim().length);
    });
  expect(Math.max(...lines)).toBeLessThanOrEqual(75);
});
