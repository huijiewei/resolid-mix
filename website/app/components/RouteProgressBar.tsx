import { useLocation, useNavigation } from '@remix-run/react';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';
import { useNProgress } from '@tanem/react-nprogress';

const ANIMATION_DURATION = 200;

const progressBarStyles = stylex.create({
  base: {
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: ANIMATION_DURATION,
    transitionTimingFunction: 'linear',
    pointerEvents: 'none',
  },
  bar: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 5000,
    height: 3,
    width: '100%',
    backgroundColor: colors.blue400,
    transitionProperty: 'margin-start',
    transitionDuration: ANIMATION_DURATION,
    transitionTimingFunction: 'linear',
  },
  finished: {
    opacity: 0,
  },
  marginStart: (progress: number) => ({
    marginStart: `${(-1 + progress) * 100}%`,
  }),
});

const RouteNProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const { isFinished, progress } = useNProgress({
    animationDuration: ANIMATION_DURATION,
    isAnimating: isLoading,
  });

  return (
    <div {...stylex.props(progressBarStyles.base, isFinished && progressBarStyles.finished)}>
      <div {...stylex.props(progressBarStyles.bar, progressBarStyles.marginStart(progress))}></div>
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
