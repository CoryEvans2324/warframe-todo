import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TrackedItem } from '../../components/TrackedItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { generateItemComponents, getItem } from '../../lib/api';
import { setComponents, setItem } from '../../reducers/itemReducer';


export default function ItemPage({ item, components }) {
  const router = useRouter();
  const dispatch = useAppDispatch();  

  useEffect(() => {
    dispatch(setItem(item))
  }, [dispatch, item])

  useEffect(() => {
    dispatch(setComponents(components))
  }, [dispatch, components])

  const reduxItem = useAppSelector(state => state.currentItem.item);
  const reduxComponents = useAppSelector(state => state.currentItem.components);

  if (!reduxItem || !reduxComponents) {
    return (
      <div className="min-h-screen bg-gray-800 text-white">
        <div className="max-w-xl mx-auto py-4">
          <h1 className="text-center text-4xl">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-3xl mx-auto py-4">
        <TrackedItem clearTrackedItem={() => router.push('/')} />
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const item = getItem(query.name);
  const components = generateItemComponents(item);
  return {
    props: {
      item,
      components
    }
  }
}