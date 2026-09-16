import corpus from '../data/corpus.json';
const cache=new Map<string,Promise<string>>();
export function loadSource(id:string):Promise<string> {
  const doc=corpus.documents.find(doc=>doc.id===id);
  if(!doc) return Promise.reject(new Error('Kaynak bulunamadı.'));
  if(!cache.has(id)) {
    const request=fetch(`${import.meta.env.BASE_URL}${doc.path}`).then(response=>{
      if(!response.ok)throw new Error('Kaynak yüklenemedi. Bağlantını kontrol edip tekrar dene.');
      return response.text();
    }).catch(error=>{cache.delete(id);throw new Error('Kaynak yüklenemedi. Bağlantını kontrol edip tekrar dene.', {cause:error});});
    cache.set(id,request);
  }
  return cache.get(id)!;
}
