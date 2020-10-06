import stripHtml from 'string-strip-html';

export const OneArticle = ({ article }) => {
  const cleanedContent = stripHtml(article.content);

  return (
    <a target="_blank" href={article.link}>
      <div className="grid grid-cols-6 rounded py-2 px-2 border-2 bg-red-100">
        <h4 className="col-span-6 font-bold">{article.title}</h4>
        {article.creator ? <p className="col-span-6">{article.creator}</p> : null}
        <p className="col-span-6">{cleanedContent.result}</p>
      </div>
    </a>
  );
};
