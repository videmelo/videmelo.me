import { useRef } from 'react';
import { Briefcase, Calendar, Download, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const About = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const isInView = useInView(sectionRef, { threshold: 0.2 });

   const experiences = [
      {
         title: 'Software Developer Intern',
         company: 'Mindtech',
         url: 'https://mindtech.com.br',
         period: 'Sep. 2025 - Present',
         description: '',
      },
   ];

   return (
      <section id="about" ref={sectionRef} className="py-20 md:py-32 relative">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className={`space-y-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="inline-flex items-center space-x-2 bg-dark-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-600">
                     <span className="text-primary-400 font-medium">About</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold">
                     A bit about Vinícius Melo, a young <span className="text-primary-400">Full-Stack Developer</span>
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                     I have been continuously developing and refining my technical skills through a wide range of resources, including paid and free courses, official documentation, educational
                     videos, and more. I maintain a strong commitment to lifelong learning, aiming to secure a position aligned with my professional profile as a Full-Stack Developer.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                     My approach combines technical expertise with creative problem-solving, enabling me to build digital solutions that meet both user needs and business objectives. I am constantly
                     learning and adapting to new technologies to stay at the forefront of the industry.
                  </p>

                  <div className="pt-4">
                     <a
                        href="curriculo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 px-5 py-3 rounded-lg transition-colors"
                     >
                        <Download size={18} />
                        <span>Download my Resume</span>
                     </a>
                  </div>
               </div>

               <div className={`space-y-6 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-xl p-6 space-y-6">
                     <h3 className="text-xl font-semibold">Experience</h3>

                     <div className="space-y-6">
                        {experiences.map((exp, index) => (
                           <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-dark-600">
                              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary-400"></div>

                              <div className="space-y-2">
                                 <h4 className="font-medium text-white">{exp.title}</h4>
                                 <div className="flex items-center text-sm text-gray-400 space-x-4">
                                    {exp.url ? (
                                       <a
                                          href={exp.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-transparent bg-primary-400/10 hover:bg-primary-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors group/link"
                                          aria-label={`Visitar site da empresa ${exp.company}`}
                                       >
                                          <Briefcase size={14} className="text-primary-400 group-hover/link:text-primary-300 transition-colors" />
                                          <span className="font-medium text-primary-300 group-hover/link:underline group-focus/link:underline underline-offset-2 transition-colors">{exp.company}</span>
                                          <ArrowUpRight size={14} className="text-primary-400 group-hover/link:text-primary-300 transition-colors" />
                                       </a>
                                    ) : (
                                       <div className="flex items-center space-x-1">
                                          <Briefcase size={14} />
                                          <span>{exp.company}</span>
                                       </div>
                                    )}
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
