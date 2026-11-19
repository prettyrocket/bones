import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { useSearchParams } from 'react-router';

import { FinishCard, PolishCard } from '@/components/route/PolishAndFinish';
import { RouteHeader } from '@/components/route/RouteHeader';
import { RouteSidebar } from '@/components/route/RouteSidebar';
import { ShoppingView } from '@/components/route/ShoppingView';
import { TripCard } from '@/components/route/TripCard';
import { BONES, ROUTE, SHOPPING } from '@/data/bones';
import { currentTrip, nextBone, tripBones } from '@/data/progress';
import { scrollToSection, useCompactHeader } from '@/hooks/useCompactHeader';
import { useBones, usePolished, useShopping } from '@/hooks/useProgress';

export function RoutePage() {
  const bones = useBones();
  const shopping = useShopping();
  const polished = usePolished();
  const compact = useCompactHeader();

  // The shopping list is its own view, kept in the URL (?view=shop) so it's linkable.
  const [params, setParams] = useSearchParams();
  const view = params.get('view') === 'shop' ? 'shop' : 'trips';

  // Finished trips start folded; a person's own choice per trip wins after that.
  const [openTrips, setOpenTrips] = useState<Record<number, boolean>>({});
  // A section to scroll to once the trips view has rendered (after leaving the shopping view).
  const pending = useRef<string | null>(null);

  useEffect(() => {
    if (view === 'trips' && pending.current) {
      scrollToSection(pending.current);
      pending.current = null;
    }
  }, [view]);

  const collected = BONES.filter((bone) => bones.has(bone.name)).length;
  const polishedCount = BONES.filter((bone) => polished.has(bone.name)).length;
  const current = currentTrip(bones.has);
  const next = nextBone(bones.has);

  const showShop = () => {
    setParams({ view: 'shop' });
    window.scrollTo({ top: 0 });
  };
  const goTo = (id: string) => {
    if (view === 'trips') scrollToSection(id);
    else {
      pending.current = id;
      setParams({});
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3.5, alignItems: 'flex-start' }}>
      <RouteSidebar
        view={view}
        current={current}
        has={bones.has}
        shopping={{
          got: SHOPPING.filter((item) => shopping.has(item.item)).length,
          total: SHOPPING.length,
        }}
        polished={{ got: polishedCount, total: BONES.length }}
        onShop={showShop}
        onGo={goTo}
      />

      <Box
        sx={{ flex: '999 1 600px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <RouteHeader compact={compact} collected={collected} />

        {view === 'shop' ? (
          <ShoppingView has={shopping.has} toggle={shopping.toggle} />
        ) : (
          <>
            {ROUTE.map((trip, i) => {
              const done = tripBones(i).every(bones.has);
              const open = openTrips[i] ?? !done;
              return (
                <TripCard
                  key={trip.name}
                  trip={trip}
                  index={i}
                  open={open}
                  onToggleOpen={() => setOpenTrips((prev) => ({ ...prev, [i]: !open }))}
                  isCurrent={i === current}
                  next={next}
                  bones={bones}
                  shopping={shopping}
                />
              );
            })}
            <PolishCard has={polished.has} toggle={polished.toggle} />
            <FinishCard collected={collected} polished={polishedCount} />
          </>
        )}
      </Box>
    </Box>
  );
}
