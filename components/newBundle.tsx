import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_BUNDLE = gql`
  mutation {
    createBundle(
      data: {
        name: "Trusted News"
        tags: { connect: [{ id: 18 }, { id: 19 }] }
        feeds: {
          create: [{ name: "Portland Press Herald", url: "https://www.pressherald.com/feeds/", tags: { create: [{ name: "Maine" }] } }]
          connect: [{ id: 1 }]
        }
      }
    ) {
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
      <form>
        <label className="block">Name:</label>
        <input
          className="shadow rounded w-full py-2 px-3"
          value={currentBundle.name}
          onChange={e => setBundle({ name: e.target.value })}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => createBundleMutation()}>
          Create New Bundle
        </button>
      </form>
    </>
  );
};
