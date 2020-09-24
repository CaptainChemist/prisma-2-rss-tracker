import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { GenerateInputField } from './generateInputField';

const CREATE_BUNDLE = gql`
  mutation createBundleMutation($data: BundleCreateInput) {
    createBundle(data: $data) {
      id
      description
      tags {
        id
        name
      }
    }
  }
`;

export type BundleState = {
  name: string;
  description: string;
  tags: { name: string; id: number }[];
};

export const NewBundle = () => {
  const [currentBundle, setBundle] = useState<BundleState>({ name: '', description: '', tags: [] });
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
          setBundle({ name: '', description: '', tags: [] });
        }}
      >
        <GenerateInputField currentItem={currentBundle} name={'name'} changeHandler={setBundle} />
        <GenerateInputField currentItem={currentBundle} name={'description'} changeHandler={setBundle} />
        <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>
    </>
  );
};
