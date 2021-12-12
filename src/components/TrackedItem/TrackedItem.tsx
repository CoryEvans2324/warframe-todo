import type { Component, Item } from 'warframe-items';
import { useAppSelector } from '../../hooks';
import { Blueprint } from '../Blueprint';
import { ItemImage } from '../ItemImage';

type TrackedItemProps = {
  clearTrackedItem: () => void;
};

export function TrackedItem({ clearTrackedItem }: TrackedItemProps) {
  const item = useAppSelector((state) => state.currentItem.item);
  const components = useAppSelector((state) => state.currentItem.components);

  const ignoreComponentsOf = useAppSelector((state) => state.currentItem.ingoreList);

  const resources = countComponents(components, ignoreComponentsOf);

  return (
    <div>
      <div className="bg-white shadow rounded-sm mt-2 mx-2 p-2 overflow-hidden">
        <div className="flex items-center">
          <ItemImage item={item} />
          <a
            href={`https://warframe.fandom.com/wiki/${item.name}`}
            className="text-3xl font-semibold underline"
            target="_blank"
          >
            {item.name}
          </a>
        </div>
        <div className="h-6"></div>
        <Blueprint />
        <div className="h-6"></div>
          <h1 className='text-2xl font-semibold'>Totals</h1>
          <ul className="flex flex-col">
            {Object.keys(resources).sort((a, b) => {
              if (a === b) {
                return 0;
              }
              return a > b ? 1 : -1;
            }).map((resource) => (
              <li key={resource}
                className="grid grid-cols-2 even:bg-gray-100 p-1"
              >
                <span>{resource}</span>
                <span className="font-mono">{resources[resource]}</span>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

const countComponents = (items: Item[], ignoreList: string[] = [], multiplier = 1) => {
  var counts = {};
  items.forEach((item) => {
    const itemCount = item.itemCount || 1;
    const totalBlueprintsNeeded = Math.ceil(itemCount / (item.buildQuantity || 1));

    counts[item.name] = ((counts[item.name] || 0) + (itemCount * multiplier));

    if (item.components && !ignoreList.includes(item.name)) {
      counts = combineCounts(counts, countComponents(item.components as Item[], ignoreList, totalBlueprintsNeeded));
    }
  });
  return counts;
}

const combineCounts = (a, b) => {
  Object.keys(a).forEach((key) => {
    if (b[key]) {
      b[key] += a[key];
    } else {
      b[key] = a[key];
    }
  });
  return b;
}