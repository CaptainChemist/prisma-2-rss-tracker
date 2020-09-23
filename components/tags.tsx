export const Tags = ({ tags }) =>
  tags.map(oneTag => (
    <span className={`text-sm my-2 py-1 px-2 rounded align-middle bg-${isFeed ? 'purple' : 'green'}-100`} key={oneFeed.id}>
      {oneTag.name}
    </span>
  ));
