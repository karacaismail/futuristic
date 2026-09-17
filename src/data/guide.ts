import topicData from './topics.json';
const bodies = import.meta.glob('../content/guide/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
export const topics = topicData.map((topic) => ({
  ...topic,
  body: bodies[`../content/guide/${topic.id}.md`],
}));
export const statuses: Record<string, string> = {
  source: 'Kaynak iddiası',
  verified: 'Kontrol edildi',
  corrected: 'Düzeltildi',
  conflict: 'Çelişki var',
  scenario: 'Senaryo',
};
