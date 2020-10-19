import { AuthorObject } from '../utils/types';

export const ProfilePic = ({ author }: { author: AuthorObject }) => (
  <>
    {author.picture ? (
      <div className="rounded-full">
      <img className="rounded-full p-0.5 w-8 h-8 border-2 border-gray-300" src={author.picture} />
      </div>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )}
    <p>{author.nickname}</p>
  </>
);
