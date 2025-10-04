import React, { useState, useRef } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import emailjs from '@emailjs/browser';
import { useTranslation, Trans } from 'react-i18next';

const Contact = () => {
   const { t } = useTranslation();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const sectionRef = useRef<HTMLElement>(null);
   const formRef = useRef<HTMLFormElement>(null);
   const isInView = useInView(sectionRef, { threshold: 0.1 });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (error) setError(null);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      try {
         await emailjs.sendForm('service_jwilmnm', 'template_oy3hcio', formRef.current!, 'z8EmYIq6I0lT-LKsZ');

         setSuccess(true);
         setFormData({ name: '', email: '', message: '' });

         // Reset success message after 3 seconds
         setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
         console.error('Email error:', err);
         setError(t('contact.form.error'));
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative bg-dark-800/30">
         <div className="container mx-auto px-4 md:px-6">
            <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               <div className="inline-flex items-center space-x-2 bg-dark-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-600 mb-4">
                  <span className="text-primary-400 font-medium">{t('contact.section')}</span>
               </div>

               <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <Trans i18nKey="contact.title" components={[<span className="text-primary-400" />]} />
               </h2>

               <p className="text-gray-300">{t('contact.desc')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
               <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-xl p-6 h-full">
                     <h3 className="text-xl font-semibold mb-6">{t('contact.info.title')}</h3>

                     <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                           <div className="bg-dark-700 p-3 rounded-lg text-primary-400">
                              <MapPin size={20} />
                           </div>
                           <div>
                              <h4 className="font-medium mb-1">{t('contact.info.location')}</h4>
                              <p className="text-gray-300 text-sm">{t('contact.info.locationValue')}</p>
                           </div>
                        </div>

                        <div className="flex items-start space-x-4">
                           <div className="bg-dark-700 p-3 rounded-lg text-primary-400">
                              <Mail size={20} />
                           </div>
                           <div>
                              <h4 className="font-medium mb-1">{t('contact.info.email')}</h4>
                              <a href="mailto:videmelo.contact@gmail.com" className="text-gray-300 text-sm hover:text-primary-400 transition-colors">
                                 videmelo.contact@gmail.com
                              </a>
                           </div>
                        </div>

                        <div className="flex items-start space-x-4">
                           <div className="bg-dark-700 p-3 rounded-lg text-primary-400">
                              <Phone size={20} />
                           </div>
                           <div>
                              <h4 className="font-medium mb-1">{t('contact.info.phone')}</h4>
                              <a href="tel:+5541998095197" className="text-gray-300 text-sm hover:text-primary-400 transition-colors">
                                 +55 (41) 99809-5197
                              </a>
                           </div>
                        </div>
                     </div>

                     <div className="mt-10">
                        <h4 className="font-medium mb-4">{t('contact.info.follow')}</h4>
                        <div className="flex space-x-3">
                           <a href="#" className="bg-dark-700 p-2.5 rounded-lg text-gray-300 hover:text-primary-400 hover:bg-dark-600 transition-colors" aria-label="GitHub">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                              </svg>
                           </a>
                           <a href="#" className="bg-dark-700 p-2.5 rounded-lg text-gray-300 hover:text-primary-400 hover:bg-dark-600 transition-colors" aria-label="LinkedIn">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                 <rect x="2" y="9" width="4" height="12"></rect>
                                 <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-xl p-6">
                     <h3 className="text-xl font-semibold mb-6">{t('contact.form.title')}</h3>

                     {success ? (
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                           <p className="text-green-400 font-medium">{t('contact.form.success')}</p>
                        </div>
                     ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.form.yourName')}
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                                    placeholder={t('contact.form.placeholders.name')}
                                 />
                              </div>

                              <div>
                                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.form.yourEmail')}
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    title={t('contact.form.emailTitle')}
                                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                                    placeholder={t('contact.form.placeholders.email')}
                                 />
                              </div>
                           </div>

                           <div>
                              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                 {t('contact.form.yourMessage')}
                              </label>
                              <textarea
                                 id="message"
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 required
                                 rows={5}
                                 className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all resize-none"
                                 placeholder={t('contact.form.placeholders.message')}
                              ></textarea>
                           </div>

                           {error && (
                              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                                 <p className="text-red-400 font-medium">{error}</p>
                              </div>
                           )}

                           <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`${
                                 isSubmitting ? 'bg-primary-600 cursor-wait' : 'bg-primary-500 hover:bg-primary-400'
                              } text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                           >
                              {isSubmitting ? (
                                 <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                       ></path>
                                    </svg>
                                    {t('contact.form.sending')}
                                 </>
                              ) : (
                                 <>
                                    {t('contact.form.send')}
                                    <Send size={18} />
                                 </>
                              )}
                           </button>
                        </form>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent"></div>
      </section>
   );
};

export default Contact;
