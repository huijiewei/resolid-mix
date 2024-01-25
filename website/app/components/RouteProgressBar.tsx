import { useLocation, useNavigation } from '@remix-run/react';
import { clsx } from '@resolid-remix/ui';
import { useNProgress } from '@tanem/react-nprogress';
import type { CSSProperties } from 'react';

const ANIMATION_DURATION = 200;

const RouteNProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const { isFinished, progress } = useNProgress({
    animationDuration: ANIMATION_DURATION,
    isAnimating: isLoading,
  });

  return (
    <div
      className={clsx(
        isFinished ? 'opacity-0' : 'opacity-100',
        'transition-opacity ease-linear',
        `duration-[var(--animation-duration)]`,
        'pointer-events-none',
      )}
      style={{ ['--animation-duration']: `${ANIMATION_DURATION}ms` } as CSSProperties}
    >
      <div
        className={
          'fixed left-0 top-0 z-[5000] ml-[var(--progress)] h-[3px] w-full bg-blue-400 transition-[margin-left] duration-[var(--animation-duration)] ease-linear'
        }
        style={
          {
            ['--progress']: `${(-1 + progress) * 100}%`,
          } as CSSProperties
        }
      ></div>
    </div>
  );
};

export const RouteProgressBar = () => {
  const navigation = useNavigation();
  const { key: locationKey } = useLocation();

  const navigating = navigation.location && !navigation.formData;
  const resetKey = navigation.location?.key || locationKey;

  return <RouteNProgressBar key={resetKey} isLoading={navigating ?? false} />;
};
