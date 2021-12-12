import clsx from 'clsx';
import type { Item, Component } from 'warframe-items';

type ItemImageProps = {
  item: Item | Component | null;
  className?: string;
};

export const ItemImage: React.FC<ItemImageProps> = ({ item, className }) => {
  return (
    <img
      src={`https://cdn.warframestat.us/img/${item.imageName}`}
      alt={item.name}
      className={clsx('w-16 h-16 rounded', className)}
    />
  );
};
