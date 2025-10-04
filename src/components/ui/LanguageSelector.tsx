import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Twemoji from './Twemoji';

interface LanguageSelectorProps {
   className?: string;
   menuAlign?: 'left' | 'right';
   size?: 'sm' | 'md';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '', menuAlign = 'right', size = 'md' }) => {
   const { i18n, t } = useTranslation();
   const [open, setOpen] = useState(false);
   const buttonRef = useRef<HTMLButtonElement | null>(null);
   const menuRef = useRef<HTMLDivElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(0);

   const languages = useMemo(
      () => [
         { code: 'en', label: 'English', emoji: '🇺🇸' },
         { code: 'pt', label: 'Português', emoji: '🇧🇷' },
      ],
      []
   );

   const currentCode = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
   const current = languages.find((l) => l.code === currentCode) || languages[0];

   useEffect(() => {
      const onClickOutside = (e: MouseEvent) => {
         if (!open) return;
         const target = e.target as Node;
         if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
         setOpen(false);
      };
      const onEscape = (e: KeyboardEvent) => {
         if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('keydown', onEscape);
      return () => {
         document.removeEventListener('mousedown', onClickOutside);
         document.removeEventListener('keydown', onEscape);
      };
   }, [open]);

   useEffect(() => {
      if (open) setActiveIndex(languages.findIndex((l) => l.code === current.code));
   }, [open, languages, current.code]);

   const select = (code: string) => {
      i18n.changeLanguage(code);
      setOpen(false);
   };

   const buttonSize = size === 'sm' ? 'h-9 px-2 text-sm' : 'h-10 px-3 text-sm';
   const menuPos = menuAlign === 'left' ? 'left-0' : 'right-0';

   return (
      <div className={`relative ${className}`}>
         <button
            ref={buttonRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            className={`inline-flex items-center gap-2 rounded-md border border-dark-700 bg-dark-800 text-gray-200 ${buttonSize} hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40`}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => {
               if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(true);
               }
            }}
            title={t('nav.language', 'Language')}
         >
            <Twemoji emoji={current.emoji} size={18} />
            <svg className={`ml-1 size-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
         </button>

         {open && (
            <div
               ref={menuRef}
               role="listbox"
               aria-activedescendant={`lang-${languages[activeIndex]?.code}`}
               className={`absolute ${menuPos} mt-2 w-44 rounded-md border border-dark-700 bg-dark-800/95 backdrop-blur-md shadow-lg focus:outline-none z-[60]`}
               tabIndex={-1}
               onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                     e.preventDefault();
                     setActiveIndex((i) => (i + 1) % languages.length);
                  } else if (e.key === 'ArrowUp') {
                     e.preventDefault();
                     setActiveIndex((i) => (i - 1 + languages.length) % languages.length);
                  } else if (e.key === 'Enter') {
                     e.preventDefault();
                     select(languages[activeIndex].code);
                  }
               }}
            >
               {languages.map((lng, idx) => {
                  const selected = lng.code === current.code;
                  const active = idx === activeIndex;
                  return (
                     <button
                        key={lng.code}
                        id={`lang-${lng.code}`}
                        role="option"
                        aria-selected={selected}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${active ? 'bg-dark-700/60' : ''} ${
                           selected ? 'text-primary-400' : 'text-gray-200 hover:text-white'
                        }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => select(lng.code)}
                     >
                        <Twemoji emoji={lng.emoji} size={18} />
                        <span className="flex-1">{lng.label}</span>
                        {selected && (
                           <svg className="size-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path
                                 fillRule="evenodd"
                                 d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.75 11.83l6.543-6.54a1 1 0 011.414 0z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        )}
                     </button>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default LanguageSelector;
