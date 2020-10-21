import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Feed } from '@prisma/client';
import { ArticleList } from './articleList';
const Parser = require('rss-parser');
const parser = new Parser();

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const GenerateArticleList = ({ feeds }: { feeds: Feed[] }) => {
  const [{ loading, error, data }, setGet] = useState({ error: false, loading: false, data: [] });

  useEffect(() => {
    (async () => {
      try {
        const items = _.reduce(
          await Promise.all(
            feeds.map(async oneFeed => {
              const { items } = await parser.parseURL(CORS_PROXY + oneFeed.url);
              return items.map(o => ({...o, feed: oneFeed }));
            })
          ),
          (sum, n) => [...sum, ...n]
        );
        setGet(o => ({ ...o, data: items, loading: false }));
      } catch (error) {
        setGet(o => ({ ...o, error, loading: false }));
      }
    })();
  }, [feeds]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <ArticleList articleList={data} />
  );
};
