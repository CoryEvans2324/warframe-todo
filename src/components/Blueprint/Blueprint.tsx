import { BlueprintComponent } from '.';

import { useAppSelector } from '../../hooks'

type BlueprintProps = {
  className?: string;
}

export const Blueprint: React.FC<BlueprintProps> = ({
  className,
}) => {
  const components = useAppSelector(state => state.currentItem.components);
  return (
    <ul className="flex flex-col overflow-x-auto">
      {components.map((item, index) => (
        <BlueprintComponent item={item} key={index} />
      ))}
    </ul>
  )
}
