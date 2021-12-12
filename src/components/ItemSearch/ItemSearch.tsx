import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { ItemImage } from '../ItemImage';
import type { Item } from 'warframe-items';

type ItemSearchProps = {
  onSelect: (item: Item) => void,
}

export const ItemSearch = ({
  onSelect,
}: ItemSearchProps) => {
  const [results, setResults] = useState<Item[]>([]);

  const fetchResults = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    const url_params = new URLSearchParams({
      q: query,
      remove: 'patchlogs',
    });
    const res = await fetch(`/api/items/search?${url_params.toString()}`);
    const json = await res.json();
    setResults(json);
  };

  const memoizedFetchResults = useMemo(() => debounce(fetchResults, 300), []);

  useEffect(() => {
    return () => {
      memoizedFetchResults.cancel();
    };
  }, []);

  return (<>
    <div className="mt-4 flex flex-col">
      <input
        type="text"
        className="px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg"
        placeholder="Search"
        onChange={(e) => memoizedFetchResults(e.target.value)}
      />
    </div>
    <ul className="flex flex-col gap-4 mt-4">
      {results.map((item) => (
        <li
          key={item.uniqueName}
          className="bg-gray-400 rounded shadow p-1 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center space-x-4">
            <ItemImage item={item} />
            <div className="flex flex-col">
              <h1 className="font-semibold">{item.name}</h1>
              <h2 className="text-sm text-gray-600">{item.uniqueName}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>)
}