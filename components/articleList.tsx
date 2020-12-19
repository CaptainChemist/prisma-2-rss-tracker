import { useState } from 'react';
import Pagination from 'react-js-pagination';

export const ArticleList = ({ articleList }: { articleList: any[] }) => {
  const [currentPagination, setPagination] = useState({ currentPage: 1, articlesPerPage: 8 });
  const { currentPage, articlesPerPage } = currentPagination;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articleList.slice(indexOfFirstArticle, indexOfLastArticle);

  console.log(currentArticles);
  return (
    <>
      <h3 className="py-4 font-medium text-lg ">Articles</h3>
      <div className="grid grid-cols-1 gap-4">
        {currentArticles.map(({ feed, ...oneArticle }) => (
          <p key={oneArticle.title}>{oneArticle.title}</p>
        ))}
        <Pagination
          innerClass="rounded py-2 px-2 flex"
          itemClass="px-2"
          activePage={currentPage}
          itemCountPerPage={articlesPerPage}
          totalItemsCount={articleList.length}
          pageRangeDisplayed={5}
          onChange={clickedNumber => {
            setPagination(currState => ({ ...currState, currentPage: parseInt(clickedNumber) }));
          }}
        />
      </div>
    </>
  );
};
