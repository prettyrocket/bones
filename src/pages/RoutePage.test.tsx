import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ROUTE, SHOPPING } from '@/data/bones';
import { SHOPPING_GROUPS } from '@/data/progress';
import { renderRoute } from '@/test/render';

describe('RoutePage', () => {
  it('ticks bones, remembers them, and shares them with the checklist', async () => {
    const { user, unmount } = renderRoute('/');
    expect(screen.getByText('0 of 30 bones')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Cow' }));
    expect(screen.getByText('1 of 30 bones')).toBeInTheDocument();
    unmount();

    renderRoute('/checklist');
    expect(screen.getByRole('checkbox', { name: 'Cow' })).toBeChecked();
  });

  it('marks the next bone and folds finished trips', async () => {
    const { user } = renderRoute('/');
    const trip1 = screen.getByRole('region', { name: /Silvarea/ });
    expect(within(trip1).getByText('NEXT')).toBeInTheDocument();

    await user.click(within(trip1).getByRole('checkbox', { name: 'Armoured Zombie' }));
    await user.click(within(trip1).getByRole('checkbox', { name: 'Angry Giant Rat' }));
    // The finished trip folds to a summary, and the next bone moves on to trip 2.
    expect(within(trip1).getByText('Done!')).toBeInTheDocument();
    expect(within(trip1).queryByRole('checkbox')).not.toBeInTheDocument();
    const trip2 = screen.getByRole('region', { name: /Stronghold of Security/ });
    expect(within(trip2).getByText('NEXT')).toBeInTheDocument();

    await user.click(within(trip1).getByRole('button', { name: 'Show stops' }));
    expect(within(trip1).getByRole('checkbox', { name: 'Armoured Zombie' })).toBeChecked();
  });

  it('links each bone to its monster on the OSRS Wiki', () => {
    renderRoute('/');
    expect(screen.getByRole('link', { name: 'Cow' })).toHaveAttribute(
      'href',
      'https://oldschool.runescape.wiki/w/Cow',
    );
    // A name that lands on a disambiguation page links to the right monster instead.
    expect(screen.getByRole('link', { name: 'Armoured Zombie' })).toHaveAttribute(
      'href',
      `https://oldschool.runescape.wiki/w/${encodeURIComponent("Armoured_zombie_(Zemouregal's_Base)")}`,
    );
  });

  it('opens the shopping list as its own view, sharing ticks with the bank stops', async () => {
    const { user } = renderRoute('/?view=shop');
    expect(screen.getByRole('heading', { name: 'Shopping list' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /Silvarea/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Grubby key' }));
    expect(screen.getByText(`1 / ${SHOPPING.length} ready`)).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /Silvarea/ })[0]);
    const trip1 = screen.getByRole('region', { name: /Silvarea/ });
    expect(within(trip1).getByRole('checkbox', { name: 'Grubby key' })).toBeChecked();
  });
});

describe('route data', () => {
  it('has every bone exactly once', () => {
    const bones = ROUTE.flatMap((trip) => trip.stops.flatMap((stop) => stop.bone ?? []));
    expect(bones).toHaveLength(30);
    expect(new Set(bones).size).toBe(30);
  });

  it('puts every shopping item in exactly one place', () => {
    const grouped = SHOPPING_GROUPS.flatMap((group) => group.items.map((item) => item.item));
    expect(new Set(grouped).size).toBe(grouped.length);
    // Everything except "Combat gear + food", which is a tip for every bank.
    expect(grouped).toHaveLength(SHOPPING.length - 1);
  });
});
