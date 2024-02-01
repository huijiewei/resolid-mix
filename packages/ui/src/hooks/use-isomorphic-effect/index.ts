import { isBrowser } from '@resolid/mix-utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
