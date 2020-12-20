import { useMutation, useQuery } from '@apollo/client';
import { Feed } from '@prisma/client';
import stripHtml from 'string-strip-html';
import { ME_QUERY, SAVED_ARTICLE_QUERY } from '../utils/api/graphql/queries';
import * as _ from 'lodash';
import { HeartOutline, SingleArrowRight } from './svg';
import { useFetchUser } from '../utils/user';
import { CREATE_SAVED_ARTICLE_MUTATION, DELETE_SAVED_ARTICLE_MUTATION } from '../utils/api/graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { updateSavedArticleCache } from '../utils/update';

export const OneArticle = ({ article, feed }: { article; feed: Feed }) => {
  const cleanedContent = stripHtml(article.content);
  const [createdSavedArticleMutation, { loading: createSavedArticleLoading }] = useMutation(CREATE_SAVED_ARTICLE_MUTATION);
  const [deleteSavedArticleMutation, { loading: deleteSavedArticleLoading }] = useMutation(DELETE_SAVED_ARTICLE_MUTATION);
  const { user, loading: userLoading } = useFetchUser();
  const { data: meData, loading: userLoadingQuery } = useQuery(ME_QUERY);

  const variables = { data: { url: article.link } };
  const { loading: savedArticleLoading, error, data } = useQuery(SAVED_ARTICLE_QUERY, { variables });
  const loading = createSavedArticleLoading || deleteSavedArticleLoading || savedArticleLoading || userLoading || userLoadingQuery;
  const savedArticle = _.get(data, 'savedArticle');

  return (
    <div className="grid grid-cols-12 rounded-lg py-4 px-4 border-4 border-gray-300">
      <div
        onClick={e => {
          e.stopPropagation();
          if (user && !loading) {
            if (savedArticle) {
              const deletedSavedArticle = { data: { id: savedArticle.id } };
              deleteSavedArticleMutation({
                variables: deletedSavedArticle,
                update: updateSavedArticleCache('delete'),
                optimisticResponse: () => {
                  return {
                    __typename: 'Mutation',
                    ['deleteSavedArticle']: {
                      ...deletedSavedArticle.data,
                      __typename: 'SavedArticle',
                    },
                  };
                },
              });
            } else {
              const newSavedArticle = {
                data: {
                  id: uuidv4(),
                  url: article.link,
                  contents: article,
                  feed: {
                    connect: {
                      id: feed.id,
                    },
                  },
                },
              };
              createdSavedArticleMutation({
                variables: newSavedArticle,
                update: updateSavedArticleCache('create'),
                optimisticResponse: () => {
                  const user = _.get(meData, 'me');

                  return {
                    __typename: 'Mutation',
                    ['createSavedArticle']: {
                      ...newSavedArticle.data,
                      user,
                      feed,
                      __typename: 'SavedArticle',
                    },
                  };
                },
              });
            }
          }
        }}
        className="col-span-1 flex items-center justify-center z-10 cursor-pointer"
      >
        <HeartOutline className={`h-8 w-8 ${!_.isNull(savedArticle) ? `text-red-500` : `text-gray-500`} inline-block align-middle`} />
      </div>
      <div className="col-span-10">
        <h4 className="font-bold">{article.title}</h4>
        {article.creator ? <p className="col-span-6">{article.creator}</p> : null}
        <p className="">{cleanedContent.result}</p>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <a target="_blank" href={article.link}>
          <SingleArrowRight className="h-8 w-8 text-blue-500 inline-block align-middle" />
        </a>
      </div>
    </div>
  );
};
