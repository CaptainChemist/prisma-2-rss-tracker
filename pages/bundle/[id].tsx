const Bundle = ({ id }) => {
  return <p>{id}</p>;
};

Bundle.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Bundle;
