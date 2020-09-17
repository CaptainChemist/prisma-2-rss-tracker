const Feed = ({ id }) => {
  return <p>{id}</p>;
};

Feed.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Feed;
