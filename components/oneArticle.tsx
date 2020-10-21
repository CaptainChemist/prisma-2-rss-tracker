import { useMutation, useQuery } from '@apollo/client';
import { Feed } from '@prisma/client';
import stripHtml from 'string-strip-html';
import { CREATE_SAVED_ARTICLE_MUTATION, DELETE_SAVED_ARTICLE_MUTATION } from '../utils/api/graphql/mutations';
import { SAVED_ARTICLES_QUERY, SAVED_ARTICLE_QUERY } from '../utils/api/graphql/queries';
import { useFetchUser } from '../utils/user';
import { Heart } from './heart';
import * as _ from 'lodash'

export const OneArticle = ({ article, feed }:{article, feed: Feed}) => {
  const cleanedContent = stripHtml(article.content);
  const [createdSavedArticleMutation, {loading: createSavedArticleLoading}] = useMutation(CREATE_SAVED_ARTICLE_MUTATION)
  const [deleteSavedArticleMutation, {loading: deleteSavedArticleLoading}] = useMutation(DELETE_SAVED_ARTICLE_MUTATION)
  const { user, loading: userLoading } = useFetchUser();
  
  const variables = {data: {url: article.link}}
  const { loading: savedArticleLoading, error, data } = useQuery(SAVED_ARTICLE_QUERY, {variables});
  const loading = createSavedArticleLoading || deleteSavedArticleLoading || savedArticleLoading || userLoading
  const savedArticle = _.get(data, 'savedArticle')

  return (
      <div className="grid grid-cols-12 rounded-lg py-4 px-4 border-4 border-gray-300">
        <div 
        onClick={e=>{
          e.stopPropagation();
          if(user){
            if(savedArticle) {
              deleteSavedArticleMutation({
                variables: {
                  data: {
                    id: savedArticle.id,
                  },
                },
                refetchQueries: [{ query: SAVED_ARTICLE_QUERY, variables }, { query: SAVED_ARTICLES_QUERY }],
              });
            } else {
              createdSavedArticleMutation({variables: {
                data: {
                  url: article.link,
                  contents: article,
                  feed: {
                    connect: {
                      id: feed.id
                    }
                  }
                },
              },
              refetchQueries: [{ query: SAVED_ARTICLE_QUERY, variables }, { query: SAVED_ARTICLES_QUERY }],
            })
            }
          } 
        }}
        className="col-span-1 flex items-center justify-center z-10 cursor-pointer">
            <Heart size={8} liked={!_.isNull(savedArticle)} loading={loading}/>
        </div>
        <div className="col-span-10">
          <h4 className="font-bold">{article.title}</h4>
          {article.creator ? <p className="col-span-6">{article.creator}</p> : null}
          <p className="">{cleanedContent.result}</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
        <a target="_blank" href={article.link}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"  
              className={`h-8 w-8 text-blue-500 inline-block align-middle`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
  );
};
