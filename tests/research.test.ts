import { describe, expect, it } from 'vitest';
import { estimateCost, normalizeText, readStoredIds, searchItems, toggleId } from '../src/lib/research';

describe('Türkçe araştırma araması', () => {
  const items = [
    { id: '1', title: 'Yazılım geliştirme', text: 'İnsan onayı ve ölçüm', type: 'report' },
    { id: '2', title: 'Video', text: 'Yazılım ile video üretimi', type: 'source' },
  ];
  it('Türkçe harfleri ve noktasız ı aramalarını eşler', () => {
    expect(normalizeText('İÇERİK, YAZILIM ve Ölçüm')).toBe('icerik, yazilim ve olcum');
  });
  it('başlık eşleşmesini gövdeden önce getirir', () => {
    expect(searchItems([...items].reverse(), 'yazilim').map(i => i.id)).toEqual(['1', '2']);
  });
  it('tüm sözcüklerin bulunmasını ister', () => {
    expect(searchItems(items, 'insan olcum').map(i => i.id)).toEqual(['1']);
    expect(searchItems(items, 'insan bütçe')).toEqual([]);
  });
  it('boş arama ve bulunamadı durumunu açıkça döndürür', () => {
    expect(searchItems(items, '  ')).toEqual(items);
    expect(searchItems(items, 'olmayan')).toEqual([]);
  });
});

describe('maliyet senaryosu', () => {
  const input = { videos: 100, seconds: 30, rate: 0.12, attempts: 2, fixed: 50, reviewMinutes: 5, hourlyRate: 12, otherPerVideo: 0.5 };
  it('reddedilen denemeler, insan süresi ve sabit gideri dahil eder', () => {
    expect(estimateCost(input)).toEqual({ generation: 720, review: 100, other: 50, total: 920, perVideo: 9.2, acceptedSecond: 0.24 });
  });
  it('deneme sayısını iki katına çıkarmak sadece generation maliyetini iki katına çıkarır', () => {
    const result = estimateCost({ ...input, attempts: 4 });
    expect(result.generation).toBe(1440);
    expect(result.total).toBe(1640);
  });
  it('sıfır üretimde yalnızca sabit gideri gösterir, NaN üretmez', () => {
    expect(estimateCost({ ...input, videos: 0 })).toEqual({ generation: 0, review: 0, other: 0, total: 50, perVideo: 0, acceptedSecond: 0 });
  });
  it.each([-1, NaN, Infinity])('geçersiz girdiyi reddeder: %s', (rate) => {
    expect(() => estimateCost({ ...input, rate })).toThrow('Geçerli');
  });
  it('kesirli video sayısını ve birden az denemeyi reddeder', () => {
    expect(() => estimateCost({ ...input, videos: 2.5 })).toThrow();
    expect(() => estimateCost({ ...input, attempts: 0.5 })).toThrow();
  });
});

describe('cihaza kaydedilen okuma ve yol haritası', () => {
  it('bozuk kaydı ve depolama engelini güvenle karşılar', () => {
    expect(readStoredIds({ getItem: () => '{broken' }, 'key', ['a'])).toEqual([]);
    expect(readStoredIds({ getItem: () => { throw new Error('disabled'); } }, 'key', ['a'])).toEqual([]);
  });
  it('yabancı kimlikleri ve tekrarları temizler', () => {
    expect(readStoredIds({ getItem: () => '["a","a","b",1]' }, 'key', ['a'])).toEqual(['a']);
  });
  it('işaretlemeyi geri almayı destekler', () => {
    expect(toggleId(['a'], 'b')).toEqual(['a', 'b']);
    expect(toggleId(['a', 'b'], 'a')).toEqual(['b']);
  });
});
