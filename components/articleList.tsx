import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { OneArticle } from './oneArticle';
const Parser = require('rss-parser');
const parser = new Parser();

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const ArticleList = ({ rssFeeds }: { rssFeeds: string[] }) => {
  const [{ loading, error, data }, setGet] = useState({ error: false, loading: false, data: [] });

  useEffect(() => {
    (async () => {
      try {
        const items = _.reduce(
          await Promise.all(
            rssFeeds.map(async oneFeed => {
              const { items } = await parser.parseURL(CORS_PROXY + oneFeed);
              return items;
            })
          ),
          (sum, n) => [...sum, ...n]
        );
        console.log(items);
        setGet(o => ({ ...o, data: items, loading: false }));
      } catch (error) {
        setGet(o => ({ ...o, error, loading: false }));
      }
    })();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }
  console.log(data);
  return (
    <>
      <p className="p-2">Articles</p>
      <div className="grid grid-cols-1 gap-4">
        {data.map(oneArticle => (
          <OneArticle article={oneArticle} key={oneArticle.guid} />
        ))}
      </div>
    </>
  );
};
