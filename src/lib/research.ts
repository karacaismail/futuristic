export type CostInput = {
  videos: number;
  seconds: number;
  rate: number;
  attempts: number;
  fixed: number;
  reviewMinutes: number;
  hourlyRate: number;
  otherPerVideo: number;
};
export type SearchItem = { id: string; title: string; text: string; type: string };
export function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
export function searchItems(items: SearchItem[], query: string): SearchItem[] {
  const words = normalizeText(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  return items
    .map((item) => {
      const title = normalizeText(item.title);
      const full = title + ' ' + normalizeText(item.text);
      return {
        item,
        score: words.every((word) => full.includes(word))
          ? 1 + words.filter((word) => title.includes(word)).length * 5
          : 0,
      };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((hit) => hit.item);
}
export function estimateCost(input: CostInput) {
  if (
    Object.values(input).some((n) => !Number.isFinite(n) || n < 0) ||
    !Number.isInteger(input.videos) ||
    input.attempts < 1
  ) {
    throw new Error(
      'Geçerli, sıfır veya pozitif değerler gir. Video sayısı tam sayı, deneme sayısı en az 1 olmalı.',
    );
  }
  const generation = input.videos * input.seconds * input.rate * input.attempts;
  const review = ((input.videos * input.reviewMinutes) / 60) * input.hourlyRate;
  const other = input.videos * input.otherPerVideo;
  const total = generation + review + other + input.fixed;
  return {
    generation,
    review,
    other,
    total,
    perVideo: input.videos ? total / input.videos : 0,
    acceptedSecond: input.videos * input.seconds ? generation / (input.videos * input.seconds) : 0,
  };
}
export function readStoredIds(
  storage: Pick<Storage, 'getItem'>,
  key: string,
  allowed: string[],
): string[] {
  try {
    const value: unknown = JSON.parse(storage.getItem(key) || '[]');
    return Array.isArray(value)
      ? [
          ...new Set(
            value.filter((id): id is string => typeof id === 'string' && allowed.includes(id)),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
}
