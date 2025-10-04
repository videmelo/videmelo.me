import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface NavLink {
   id: string;
   label: string;
}

interface MobileMenuProps {
   open: boolean;
   onClose: () => void;
   navLinks: NavLink[];
   activeSection: string;
   onNavigate: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, navLinks, activeSection, onNavigate }) => {
   useTranslation();

   // Fecha com ESC
   useEffect(() => {
      if (!open) return;
      const onKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
   }, [open, onClose]);

   if (typeof document === 'undefined') return null;
   if (!open) return null;

   return createPortal(
      <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation" onClick={onClose}>
         {/* Background overlay */}
         <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-md" />

         {/* Panel */}
         <div className="absolute inset-0 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out translate-x-0" onClick={(e) => e.stopPropagation()}>
            <nav>
               <ul className="flex flex-col space-y-8 items-center">
                  {navLinks.map((link) => (
                     <li key={link.id} className="text-center">
                        <a
                           href={`#${link.id}`}
                           onClick={(e) => {
                              e.preventDefault();
                              onNavigate(link.id);
                           }}
                           className={`text-xl font-medium transition-colors ${activeSection === link.id ? 'text-primary-400' : 'text-gray-300'}`}
                        >
                           {link.label}
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>
            <div className="mt-10">
               <LanguageSelector className="mx-auto" menuAlign="left" size="sm" />
            </div>
         </div>
      </div>,
      document.body
   );
};

export default MobileMenu;
