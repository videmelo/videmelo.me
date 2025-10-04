import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

interface HeroProps {
   scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
   const parallaxRef = useRef<HTMLDivElement>(null);
   const { t } = useTranslation();

   useEffect(() => {
      if (parallaxRef.current) {
         parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
   }, [scrollY]);

   return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
         <div ref={parallaxRef} className="container mx-auto px-4 md:px-6 flex flex-col items-center md:items-start z-10">
            <div className="max-w-3xl">
               <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6">
                  <div
                     className="inline-flex items-center space-x-2 bg-dark-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-600 animate-fade-in opacity-0"
                     style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                  >
                     <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                     <p className="text-sm text-gray-300">{t('hero.badge')}</p>
                  </div>

                  <h1
                     className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight animate-slide-up opacity-0"
                     style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                  >
                     <Trans i18nKey="hero.title" components={[<span className="text-primary-500" />]} />
                  </h1> 

                  <p className="text-lg text-gray-300 max-w-2xl text-center md:text-left animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                     {t('hero.subtitle')}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-slide-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                     <a
                        href="#contact"
                        onClick={(e) => {
                           e.preventDefault();
                           document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group bg-primary-500 hover:bg-primary-400 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
                     >
                        {t('hero.ctaContact')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </a>

                     <a
                        href="#projects"
                        onClick={(e) => {
                           e.preventDefault();
                           document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group text-white border border-dark-600 hover:border-primary-400 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-dark-800"
                     >
                        {t('hero.ctaProjects')}
                     </a>
                  </div>

                  <div className="flex items-center space-x-4 mt-4 animate-slide-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                     <a href="https://github.com/videmelo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                        <Github size={20} />
                     </a>
                     <a href="https://www.linkedin.com/in/videmelo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                        <Linkedin size={20} />
                     </a>
                  </div>
               </div>
            </div>
         </div>

         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
               <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse-slow"></div>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-primary-600/10 blur-[100px]"></div>
         <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
         <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-accent-teal rounded-full animate-pulse"></div>
         <div className="absolute bottom-[25%] left-[20%] w-1.5 h-1.5 bg-primary-300 rounded-full animate-pulse"></div>
      </section>
   );
};

export default Hero;
