import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SILLY_LINE } from '@/components/SillyBonesack';
import { renderRoute } from '@/test/render';

describe('SillyBonesack easter egg', () => {
  beforeEach(() => localStorage.clear());

  it('stays hidden until two bones are ticked', async () => {
    const { user } = renderRoute('/checklist');
    expect(screen.queryByRole('button', { name: 'Bonesack' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: 'Ankou' }));
    expect(screen.queryByRole('button', { name: 'Bonesack' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: 'Angry Giant Rat' }));
    expect(screen.getByRole('button', { name: 'Bonesack' })).toBeInTheDocument();
  });

  it('says something silly when clicked', async () => {
    localStorage.setItem('rbm3.bones', JSON.stringify(['Ankou', 'Angry Giant Rat']));
    const { user } = renderRoute('/');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();

    await user.click(screen.getByRole('button', { name: 'Bonesack' }));
    expect(screen.getByRole('status')).toHaveTextContent(SILLY_LINE);
  });
});
