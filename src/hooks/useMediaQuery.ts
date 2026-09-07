import { useCallback, useSyncExternalStore } from 'react'

const supported = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/**
 * Subscribes to a media query. useSyncExternalStore keeps the value in sync
 * without an effect-driven re-render, and tears the listener down on unmount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!supported()) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = useCallback(
    () => (supported() ? window.matchMedia(query).matches : false),
    [query],
  )

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const useFinePointer = () => useMediaQuery('(pointer: fine)')

export const useDesktop = () => useMediaQuery('(min-width: 900px)')
