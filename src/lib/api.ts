import Items, { Category, Component, Item } from "warframe-items";

export const postCleanup = (item, { only, remove }) => {
  const removeKeys = (remove || '')
    .split(',')
    .filter((k) => k.length);
  const onlyKeys = (only || '')
    .split(',')
    .filter((k) => k.length);
  if (Array.isArray(onlyKeys) && onlyKeys.length) {
    Object.keys(item).forEach((key) => {
      if (!onlyKeys.includes(key)) {
        item[key] = undefined;
      }
    });
  } else if (Array.isArray(removeKeys) && removeKeys.length) {
    removeKeys.forEach((key) => {
      item[key] = undefined;
    });
  }
  return item;
};


const weaponCategories: Category[] = ['Primary', 'Secondary', 'Melee', 'Arch-Melee', 'Arch-Gun']
const warframeCategories: Category[] = ['Warframes', 'Archwing']
const modCategories: Category[] = ['Mods']

export const warframeItems = {
  items: new Items({ category: [...warframeCategories, ...weaponCategories, ...modCategories, 'Resources', 'Misc'] }),
  weapons: new Items({ category: weaponCategories }),
  warframes: new Items({ category: warframeCategories }),
  mods: new Items({ category: modCategories }),
  resources: new Items({ category: ['Resources'] }),
}

export const getItem = (itemName: string): Item => {
  return warframeItems.items.find(item => item.name === itemName)
}

export const generateItemComponents = (item: Item) => {
  if (!item.components) {
    return null
  }

  return item.components.map(component => {
    if (component.name === 'Blueprint') {
      return null
    }
    const componentItem = getComponentAsItem(component);
    if (!componentItem) {
      return null;
    }
    
    return {
      ...componentItem,
      itemCount: component.itemCount,
      components: generateItemComponents(componentItem),
      patchlogs: null,
    }
  }).filter(c => c)
}

export const getComponentAsItem = (component: Component) => {
  return warframeItems.items.find(item => item.name === component.name) as Item;
}