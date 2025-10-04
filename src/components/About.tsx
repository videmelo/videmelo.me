import { useRef } from 'react';
import { Briefcase, Calendar, Download, ArrowUpRight, GraduationCap, Book, FolderGit2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const isInView = useInView(sectionRef, { threshold: 0.2 });
   const { t } = useTranslation();

   const experiences = (t('about.experiences', { returnObjects: true }) as any[]) || [];

   const stack = ['TypeScript', 'React', 'Node', 'Prisma', 'PostgreSQL'];

   return (
      <section id="about" ref={sectionRef} className="py-20 md:py-32 relative">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className={`space-y-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="inline-flex items-center space-x-2 bg-dark-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-600">
                     <span className="text-primary-400 font-medium">{t('about.section')}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold">
                     <Trans i18nKey="about.title" components={[<span className="text-primary-400" />]} />
                  </h2>

                  <p className="text-gray-300 leading-relaxed">{t('about.p1')}</p>

                  <p className="text-gray-300 leading-relaxed">{t('about.p2')}</p>

                  <div className="flex flex-wrap gap-3 pt-2">
                     <a
                        href="/curriculo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary-400 text-black px-4 py-2 rounded-lg hover:brightness-95 transition-colors"
                     >
                        <Download size={16} />
                        <span>{t('about.download')}</span>
                     </a>
                  </div>

                  <div className="pt-4">
                     <h4 className="text-sm text-gray-400 mb-2">{t('about.primaryStack')}</h4>
                     <div className="flex flex-wrap gap-2">
                        {stack.map((s) => (
                           <span key={s} className="text-xs px-3 py-1 bg-dark-800/60 border border-dark-600 rounded-full">
                              {s}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className={`space-y-6 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-xl p-6 space-y-6">
                     <h3 className="text-xl font-semibold">{t('about.experience')}</h3>

                     <div className="space-y-6">
                        {experiences.map((exp, index) => (
                           <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-dark-600">
                              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary-400"></div>

                              <div className="space-y-2">
                                 <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-white">{exp.title}</h4>
                                    {exp.url ? (
                                       <a
                                          href={exp.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-gray-400 hover:text-primary-400 transition-colors"
                                          aria-label={t('projects.aria.viewLiveDemo', { name: exp.title })}
                                       >
                                          <ArrowUpRight size={18} />
                                       </a>
                                    ) : null}
                                 </div>
                                 <div className="flex items-center text-sm text-gray-400 space-x-4">
                                    {exp.company ? (
                                       <div className="flex items-center space-x-1">
                                          { exp.type === 'project' ? <FolderGit2 size={14} /> : exp.type === 'education' ? <GraduationCap size={14} /> : exp.type === 'course' ? <Book size={14} /> : <Briefcase size={14} /> }
                                          <span>{exp.company}</span>
                                       </div>
                                    ) : null}
                                    <div className="flex items-center space-x-1">
                                       <Calendar size={14} />
                                       <span>{exp.period}</span>
                                    </div>
                                 </div>
                                 <p className="text-sm text-gray-300">{exp.description}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default About;
