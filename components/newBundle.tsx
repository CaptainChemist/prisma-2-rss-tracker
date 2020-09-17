import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_BUNDLE = gql`
  mutation createBundleMutation($data: BundleCreateInput) {
    createBundle(data: $data) {
      id
      tags {
        id
        name
      }
    }
  }
`;

export const NewBundle = () => {
  const [currentBundle, setBundle] = useState({ name: '' });
  const [createBundleMutation, { loading }] = useMutation(CREATE_BUNDLE);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          createBundleMutation({ variables: { data: currentBundle } });
          setBundle({ name: '' });
        }}
      >
        <label className="block">Name:</label>
        <input
          className="shadow rounded w-full py-2 px-3"
          value={currentBundle.name}
          onChange={e => {
            e.persist();
            setBundle({ name: e.target.value });
          }}
        />
        <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>
    </>
  );
};
