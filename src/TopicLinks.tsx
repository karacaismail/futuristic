import topics from './data/topics.json';
export function TopicLinks({ ids }: { ids: string[] }) {
  return (
    <div className="topic-links">
      {ids.map((id) => {
        const topic = topics.find((t) => t.id === id);
        return (
          topic && (
            <a className="badge badge-outline" key={id} href={`#/guide?topic=${id}`}>
              {topic.title}
            </a>
          )
        );
      })}
    </div>
  );
}
