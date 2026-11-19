import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderRoute } from '@/test/render';

describe('RoutePage', () => {
  it('ticks bones, remembers them, and shares them with the wish list', async () => {
    const { user, unmount } = renderRoute('/');
    expect(screen.getByText(/^0 of 30 bones collected/)).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Cow' }));
    expect(screen.getByText('1 of 30 bones collected. Only 29 to go!')).toBeInTheDocument();
    unmount();

    renderRoute('/bones');
    expect(screen.getByRole('checkbox', { name: 'Cow' })).toBeChecked();
  });
});
