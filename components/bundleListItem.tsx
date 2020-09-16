import { BundleLike } from './bundleLike';

export const BundleListItem = ({ bundle }) => {
  return (
    <div className="grid grid-cols-6 rounded py-2 px-2 border-2">
      <div className="col-span-5">
        <h3>{bundle.name}</h3>
      </div>
      <BundleLike bundle={bundle} />

      <div className="flex col-span-6 py-0 space-x-2">
        {bundle.author.picture ? (
          <img className="rounded w-6 h-6" src={bundle.author.picture} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <p>{bundle.author.nickname}</p>
      </div>

      <div className="col-span-6 py-2">
        <h3>Tags</h3>
        <div className="space-x-2 space-y-2">
          {bundle.tags.map(oneTag => (
            <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-blue-100" key={oneTag.id}>
              {oneTag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="col-span-6 py-2">
        <h3>Feeds</h3>
        <div className="space-x-2 space-y-2">
          {bundle.feeds.map(oneFeed => (
            <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-green-100" key={oneFeed.id}>
              {oneFeed.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
