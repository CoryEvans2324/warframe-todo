import type { Component, Item } from 'warframe-items';
import { postCleanup, warframeItems, generateItemComponents, getComponentAsItem } from '../../../lib/api'

export default function handler(req, res) {
  const { c } = req.query
  const itemNames: string[] = (c || '')
    .split(',')
    .filter((k) => k.length);

  const items = itemNames.map(itemName => {
    const item = warframeItems.items.find(i => i.name === itemName);
    if (!item) {
      throw new Error(`Item ${itemName} not found`);
    }
    return item;
  });

  const components = {};
  items.forEach(item => {
    const itemComponents = generateItemComponents(item);
    components[item.name] = itemComponents;
  });

  res.status(200).json(
    postCleanup(
      components,
      req.query
    )
  )
}