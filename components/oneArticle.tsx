import stripHtml from 'string-strip-html';

export const OneArticle = ({ article }) => {
  const cleanedContent = stripHtml(article.content);

  return (
    <a target="_blank" href={article.link}>
      <div className="grid grid-cols-12 rounded-lg py-4 px-4 border-4 border-gray-300">
        <div className="col-span-11">
          <h4 className="font-bold">{article.title}</h4>
          {article.creator ? <p className="col-span-6">{article.creator}</p> : null}
          <p className="">{cleanedContent.result}</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"  
            className={`h-8 w-8 text-blue-500 inline-block align-middle`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
};
