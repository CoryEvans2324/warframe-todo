import clsx from 'clsx';
import { useState } from 'react';
import type { Item } from 'warframe-items';
import { ItemImage } from '../ItemImage';

import { IconChevronDown } from '@tabler/icons';

type BlueprintComponentProps = {
  item: Item;
  level?: number;
};

const bgColors = {
  0: 'bg-green-500',
  1: 'bg-purple-500',
  2: 'bg-blue-500',
}

export const BlueprintComponent: React.FC<BlueprintComponentProps> = ({
  item,
  level = 0,
}) => {
  const ignoreComponentsOf = ['Gallium']
  const ignoreComponents = ignoreComponentsOf.includes(item.name)
  const [shown, setShown] = useState(false);
  const hasComponents = item.components && item.components.length > 0;
  return (
    <li
      key={item.name}
      style={{ marginLeft: `${level * 20}px` }}
      className={clsx(
        'bg-opacity-20 first:rounded-t last:rounded-b p-1',
        bgColors[level % 3],
      )}
    >
      <div className="flex items-center gap-2">
        <h2 className="w-10 text-right font-bold text-lg">{item.itemCount || 1}</h2>
        <ItemImage item={item} />
        <a href={`https://warframe.fandom.com/wiki/${item.name}`} target="_blank" className="underline cursor-pointer">
          {item.name}
        </a>
        {item.buildQuantity && !ignoreComponents && <span className='text-sm text-gray-600'>Build Quantity: {item.buildQuantity}</span>}
        {hasComponents && !ignoreComponents && (
          <>
            <div className="flex-1"></div>
            <button onClick={() => setShown(!shown)}>
              {!shown && (
                <IconChevronDown className="text-black w-14 h-14 p-2" />
              )}
              {shown && (
                <IconChevronDown className="text-black w-14 h-14 p-2 rotate-180" />
              )}
            </button>
          </>
        )}
      </div>
      {!ignoreComponents && <ul className={clsx('flex flex-col', shown ? 'block' : 'hidden')}>
        {item.components &&
          item.components.map((component, index) => (
            <BlueprintComponent
              key={index}
              item={component as Item}
              level={level + 1}
            />
          ))}
      </ul>}
    </li>
  );
};
