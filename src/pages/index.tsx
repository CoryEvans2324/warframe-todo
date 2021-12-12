import { useRouter } from 'next/router';
import { useState } from 'react';

import type { Item } from 'warframe-items';
import { ItemSearch } from '../components/ItemSearch/ItemSearch';
import { useAppDispatch } from '../hooks';
import { setItem } from '../reducers/itemReducer';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const onSearchClick = (item: Item) => {
    dispatch(setItem(item))
    router.push(`/item/${item.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-xl mx-auto py-4 px-2">
        <ItemSearch onSelect={onSearchClick} />
      </div>
    </div>
  );
}
