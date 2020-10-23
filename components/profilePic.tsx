import { AuthorObject } from '../utils/types';
import { Question } from './svg';

export const ProfilePic = ({ author }: { author: AuthorObject }) => (
  <>
    {author.picture ? (
      <div className="rounded-full">
        <img className="rounded-full p-0.5 w-8 h-8 border-2 border-gray-300" src={author.picture} />
      </div>
    ) : (
      <Question className="w-6 h-6 text-gray-500" />
    )}
    <p>{author.nickname}</p>
  </>
);
