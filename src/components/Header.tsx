import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './ui/LanguageSelector';
import MobileMenu from './ui/MobileMenu';
import { useScrollLock } from '../hooks/useScrollLock';

interface HeaderProps {
   activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   const [pendingTarget, setPendingTarget] = useState<string | null>(null);
   const { lock, unlock } = useScrollLock();
   const { t } = useTranslation();

   const toggleMenu = () => setIsOpen((v) => !v);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 20) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      if (isOpen) lock();
      else unlock();
      return () => unlock();
   }, [isOpen, lock, unlock]);

   useEffect(() => {
      if (!isOpen && pendingTarget) {
         const target = pendingTarget;

         requestAnimationFrame(() => {
            const element = document.getElementById(target);
            if (element) {
               element.scrollIntoView({ behavior: 'smooth' });
            }
            setPendingTarget(null);
         });
      }
   }, [isOpen, pendingTarget]);

   const scrollToSection = useCallback(
      (sectionId: string) => {
         const element = document.getElementById(sectionId);
         if (!element) return;

         if (isOpen) {
            setPendingTarget(sectionId);
            setIsOpen(false);
         } else {
            element.scrollIntoView({ behavior: 'smooth' });
         }
      },
      [isOpen]
   );

   const navLinks = [
      { id: 'hero', label: t('nav.home') },
      { id: 'about', label: t('nav.about') },
      { id: 'skills', label: t('nav.skills') },
      { id: 'projects', label: t('nav.projects') },
      { id: 'contact', label: t('nav.contact') },
   ];

   return (
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-dark-900/90 backdrop-blur-md' : 'py-5 bg-transparent'}`}>
         <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <a
               href="#hero"
               className="text-2xl font-bold text-white flex items-center group"
               onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
               }}
            >
               <span className="text-primary-400">Vide</span>
               <span>
                  Melo<span className="text-primary-400">.</span>
               </span>
            </a>

            {}
            <nav className="hidden md:block">
               <ul className="flex space-x-8">
                  {navLinks.map((link) => (
                     <li key={link.id}>
                        <a
                           href={`#${link.id}`}
                           onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.id);
                           }}
                           className={`relative py-2 text-sm font-medium transition-colors hover:text-primary-400 ${activeSection === link.id ? 'text-primary-400' : 'text-gray-300'}`}
                        >
                           {link.label}
                           {activeSection === link.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 rounded-full animate-fade-in" />}
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>

            {}
            <div className="hidden md:flex items-center gap-4">
               <LanguageSelector />
            </div>

            {}
            <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
               {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
         </div>

         {}
         <MobileMenu open={isOpen} onClose={() => setIsOpen(false)} navLinks={navLinks} activeSection={activeSection} onNavigate={scrollToSection} />
      </header>
   );
};

export default Header;
