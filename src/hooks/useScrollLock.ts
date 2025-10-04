import { useCallback, useRef } from 'react';

/**
 * Bloqueia o scroll da página sem causar "jump" e restaura após desbloquear.
 * Implementa o padrão body position: fixed com restauração do scroll e compensação do scrollbar.
 */
export function useScrollLock() {
   const lockedRef = useRef(false);
   const scrollYRef = useRef(0);
   const prevPaddingRightRef = useRef('');

   const getScrollbarWidth = () => {
      if (typeof window === 'undefined') return 0;
      return window.innerWidth - document.documentElement.clientWidth;
   };

   const lock = useCallback(() => {
      if (lockedRef.current) return; // idempotente
      if (typeof window === 'undefined') return;

      const body = document.body as HTMLBodyElement;
      scrollYRef.current = window.scrollY;

      // Compensa a remoção do scrollbar
      prevPaddingRightRef.current = body.style.paddingRight;
      const scrollBarWidth = getScrollbarWidth();
      if (scrollBarWidth > 0) {
         body.style.paddingRight = `${scrollBarWidth}px`;
      }

      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';

      lockedRef.current = true;
   }, []);

   const unlock = useCallback(() => {
      if (!lockedRef.current) return; // idempotente
      if (typeof window === 'undefined') return;

      const body = document.body as HTMLBodyElement;
      const top = body.style.top;

      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.paddingRight = prevPaddingRightRef.current;

      const y = Math.abs(parseInt(top || '0', 10)) || scrollYRef.current || 0;
      requestAnimationFrame(() => {
         window.scrollTo(0, y);
      });

      lockedRef.current = false;
   }, []);

   return { lock, unlock, isLocked: () => lockedRef.current };
}
