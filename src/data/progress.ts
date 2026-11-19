import { ROUTE, SHOPPING, type ShoppingItem } from '@/data/bones';

type Has = (id: string) => boolean;

/** The bones collected on trip `index`, in route order. */
export function tripBones(index: number): string[] {
  return ROUTE[index].stops.flatMap((stop) => (stop.bone ? [stop.bone] : []));
}

/** The first bone in route order that isn't collected yet, or null when all are. */
export function nextBone(has: Has): string | null {
  for (let i = 0; i < ROUTE.length; i++) {
    const missing = tripBones(i).find((name) => !has(name));
    if (missing) return missing;
  }
  return null;
}

/** The first trip with a bone still to collect, or -1 when every trip is done. */
export function currentTrip(has: Has): number {
  return ROUTE.findIndex((_, i) => tripBones(i).some((name) => !has(name)));
}

/** A shopping item's label, with its count first unless it's just one. */
export function itemLabel(item: ShoppingItem): string {
  return item.qty && item.qty !== '1' ? `${item.qty}x ${item.item}` : item.item;
}

const byName = new Map(SHOPPING.map((item) => [item.item, item]));

/** Look up a shopping item by name; route data is checked against these in tests. */
export function shoppingItem(name: string): ShoppingItem {
  const item = byName.get(name);
  if (!item) throw new Error(`Unknown shopping item: ${name}`);
  return item;
}

export interface ShoppingGroup {
  title: string;
  items: ShoppingItem[];
}

/**
 * The shopping list grouped by when you load it: before you start, then each
 * trip whose bank stop loads something.
 */
export const SHOPPING_GROUPS: ShoppingGroup[] = [
  {
    title: 'Before you start',
    items: SHOPPING.filter((item) => item.loadAt === 'Before starting'),
  },
  ...ROUTE.flatMap((trip, i) => {
    const loads = trip.stops.flatMap((stop) => stop.loads);
    return loads.length
      ? [{ title: `Trip ${i + 1} · ${trip.name}`, items: loads.map(shoppingItem) }]
      : [];
  }),
];

/** Items brought on every trip, shown as a tip rather than a group. */
export const EVERY_BANK = SHOPPING.filter((item) => item.loadAt === 'Every bank stop');
