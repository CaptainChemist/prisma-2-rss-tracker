import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_BUNDLE } from '../utils/graphql';
import { BundleState } from '../utils/types';
import { GenerateInputField } from './generateInputField';

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
