import { BundleLike } from './bundleLike';

export const BundleListItem = ({ bundle }) => {
  return (
    <div className='rounded py-2 px-2 border-2 my-2'>
      <h3>{bundle.name}</h3>
      <p>{bundle.author.nickname}</p>
      <h3>Tags</h3>
      {bundle.tags.map((oneTag) => (
        <span
          className='text-sm my-2 py-1 px-2 rounded align-middle bg-blue-100'
          key={oneTag.id}
        >
          {oneTag.name}
        </span>
      ))}
      <BundleLike bundle={bundle} />
      <h3>Feeds</h3>
      {bundle.feeds.map((oneFeed) => (
        <span
          className='text-sm my-2 py-1 px-2 rounded align-middle bg-green-100'
          key={oneFeed.id}
        >
          {oneFeed.name}
        </span>
      ))}
    </div>
  );
};
