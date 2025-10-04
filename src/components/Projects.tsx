import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Github, Star, GitFork } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

interface GitHubRepo {
   id: number;
   name: string;
   description: string;
   html_url: string;
   homepage: string;
   topics: string[];
   language: string;
   stargazers_count: number;
   forks_count: number;
   created_at: string;
   updated_at: string;
}

interface Project {
   id: string;
   name: string;
   description?: string;
   url: string;
   homepage?: string;
   language?: string;
   topics?: string[];
   stats?: {
      stars?: number;
      forks?: number;
   };
   source: 'github';
   createdAt?: string;
   updatedAt?: string;
}

const Projects = () => {
   const { t, i18n } = useTranslation();
   const [projects, setProjects] = useState<Project[]>([]);
   const [filter, setFilter] = useState<string>(() => t('projects.filters.all'));
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [showAnimation, setShowAnimation] = useState(false);

   const sectionRef = useRef<HTMLElement>(null);

   const transformGithubProject = (repo: GitHubRepo): Project => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics,
      stats: {
         stars: repo.stargazers_count,
         forks: repo.forks_count,
      },
      source: 'github',
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
   });

   useEffect(() => {
      const fetchProjects = async () => {
         try {
            setLoading(true);

            // Fetch GitHub projects
            const githubResponse = await fetch('https://api.github.com/users/videmelo/repos?per_page=100&sort=created&direction=desc');
            if (!githubResponse.ok) throw new Error('Failed to fetch GitHub projects');
            const githubData: GitHubRepo[] = await githubResponse.json();
            const githubProjects = githubData.map(transformGithubProject).sort((a, b) => (b.stats?.stars ?? 0) - (a.stats?.stars ?? 0));

            setProjects(githubProjects);
         } catch (err) {
            setError('Failed to load projects');
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();

      // Set up polling to check for new projects every 5 minutes
      const interval = setInterval(fetchProjects, 5 * 60 * 1000);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const handleProjectsClick = (e: MouseEvent) => {
         const target = e.target as HTMLElement;
         const projectsLink = target.closest('a[href="#projects"]');

         if (projectsLink) {
            setShowAnimation(false);
            setTimeout(() => setShowAnimation(true), 50);
         }
      };

      document.addEventListener('click', handleProjectsClick);
      return () => document.removeEventListener('click', handleProjectsClick);
   }, []);

   // Sincroniza o valor do filtro com o idioma atual (e.g. 'All' -> 'Todos')
   useEffect(() => {
      setFilter(t('projects.filters.all'));
   }, [i18n.language, t]);

   const categories: string[] = [
      t('projects.filters.all'),
      'GitHub',
      ...Array.from(new Set(projects.filter((project) => project.source === 'github').map((project) => project.language || t('projects.filters.various')))),
   ];

   const filteredProjects =
      filter === t('projects.filters.all')
         ? projects
         : filter === 'GitHub'
         ? projects.filter((project) => project.source === 'github')
         : filter === t('projects.filters.various')
         ? projects.filter((project) => !project.language)
         : projects.filter((project) => project.language === filter);

   const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
      const cardRef = useRef<HTMLDivElement>(null);

      return (
         <div
            ref={cardRef}
            className={`group bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-xl overflow-hidden transition-all duration-500 hover:border-primary-400 transform ${
               showAnimation ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
            }`}
            style={{
               transitionDelay: showAnimation ? `${index * 100}ms` : '0ms',
               animation: showAnimation ? `slideUp 0.5s ease-out forwards ${index * 100}ms` : 'none',
            }}
         >
            <div className="p-6">
               <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">{project.name}</h3>
                  <div className="flex space-x-3">
                     <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={t('projects.aria.viewOnGithub', { name: project.name })}
                     >
                        <Github size={18} />
                     </a>
                     {project.homepage && (
                        <a
                           href={project.homepage}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-gray-400 hover:text-primary-400 transition-colors"
                           aria-label={t('projects.aria.viewLiveDemo', { name: project.name })}
                        >
                           <ArrowUpRight size={18} />
                        </a>
                     )}
                  </div>
               </div>

               <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description || t('projects.filters.noDescription')}</p>

               {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                     {project.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="text-xs bg-dark-700/80 text-primary-400 px-2 py-1 rounded-full">
                           {topic}
                        </span>
                     ))}
                  </div>
               )}

               <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-400 font-medium px-3 py-1 bg-primary-400/10 rounded-full">{project.language || t('projects.filters.various')}</span>

                  {project.stats && (
                     <div className="flex space-x-4 text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                           <Star size={14} />
                           <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                           <GitFork size={14} />
                           <span>{project.stats.forks}</span>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      );
   };

   return (
      <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative">
         <div className="container mx-auto px-4 md:px-6">
            <div
               className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${showAnimation ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
               style={{
                  animation: showAnimation ? 'slideUp 0.5s ease-out forwards' : 'none',
               }}
            >
               <div className="inline-flex items-center space-x-2 bg-dark-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-600 mb-4">
                  <span className="text-primary-400 font-medium">{t('projects.section')}</span>
               </div>

               <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <Trans i18nKey="projects.title" components={[<span className="text-primary-400" />]} />
               </h2>

               <p className="text-gray-300">{t('projects.desc')}</p>
            </div>

            {error ? (
               <div className="text-center text-red-400 mb-8">{error}</div>
            ) : loading ? (
               <div className="flex justify-center mb-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
               </div>
            ) : (
               <>
                  <div
                     className={`flex justify-center mb-10 transition-all duration-700 ${showAnimation ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
                     style={{
                        animation: showAnimation ? 'slideUp 0.5s ease-out forwards 200ms' : 'none',
                     }}
                  >
                     <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                           <button
                              key={category}
                              onClick={() => setFilter(category)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                 filter === category ? 'bg-primary-500 text-white' : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                              }`}
                           >
                              {category || t('projects.filters.various')}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                     ))}
                  </div>
               </>
            )}
         </div>
      </section>
   );
};

export default Projects;
