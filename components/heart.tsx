import { HeartOutline, Spin } from './svg';

export const Heart = ({ size, loading, liked }: { size: number; loading: boolean; liked: boolean }) =>
  loading ? (
    <Spin className="h-6 w-6 text-gray-500 animate-spin inline-block align-middle" />
  ) : (
    <HeartOutline className={`h-${size} w-${size} ${liked ? `text-red-500` : `text-gray-500`} inline-block align-middle`} />
  );
