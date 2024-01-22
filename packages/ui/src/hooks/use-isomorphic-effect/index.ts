import { isBrowser } from '@resolid-remix/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
