import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Create the NeopopSection component separately
const NeopopSection = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white border-4 border-neopop-dark shadow-neopop p-6 rounded-lg ${className}`}>
      <h3 className="text-2xl font-bold text-neopop-dark mb-4">{title}</h3>
      {children}
    </div>
  );
};

// const ExperienceCard = ({ title, company, duration, description, isLeft, type }) => (
//     <motion.div 
//       initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`relative w-full md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
//     >
//       <div className="bg-white border-4 border-neopop-dark shadow-neopop p-6 rounded-lg
//                       hover:shadow-neopop-lg transition-all duration-300 cursor-pointer">
//         {/* Experience Type Badge */}
//         <div className={`inline-block px-3 py-1 rounded mb-3 text-sm font-medium ${
//           type === 'professional' 
//             ? 'bg-neopop-primary text-white' 
//             : 'bg-neopop-secondary text-neopop-dark'
//         }`}>
//           {type === 'professional' ? 'Professional' : 'Academic'}
//         </div>
        
//         <h3 className="text-2xl font-bold text-neopop-primary mb-2">{title}</h3>
//         <h4 className="text-xl font-semibold text-neopop-dark mb-2">{company}</h4>
//         <p className="text-neopop-secondary font-medium mb-4">{duration}</p>
//         <p className="text-neopop-dark">{description}</p>
//       </div>
//     </motion.div>
//   );

const BranchingTimeline = ({ experiences }) => {
    // Calculate total height based on actual number of cards on each side
    const professionalCount = experiences.filter(exp => exp.type === 'professional').length;
    const academicCount = experiences.filter(exp => exp.type === 'academic').length;
    const maxCount = Math.max(professionalCount, academicCount);
    const timelineHeight = (maxCount * 400) + 100; // Added small padding at bottom
    
    return (
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-full">
        <svg 
          className="absolute" 
          style={{ 
            width: '600px', 
            height: `${timelineHeight}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {/* Main vertical line */}
          <path 
            d={`M300,0 L300,${timelineHeight - 50}`} 
            stroke="#252A34" 
            strokeWidth="4" 
            fill="none"
          />
  
          {/* Professional branch (right side) */}
          <path 
            d={`
              M300,100 
              C400,100 400,150 400,200
              L400,${timelineHeight - 200}
              C400,${timelineHeight - 150} 400,${timelineHeight - 100} 300,${timelineHeight - 100}
            `}
            stroke="#FF2E63" 
            strokeWidth="4" 
            fill="none"
            style={{ display: professionalCount > 0 ? 'block' : 'none' }}
          />
  
          {/* Academic branch (left side) */}
          <path 
            d={`
              M300,100 
              C200,100 200,150 200,200
              L200,${timelineHeight - 200}
              C200,${timelineHeight - 150} 200,${timelineHeight - 100} 300,${timelineHeight - 100}
            `}
            stroke="#08D9D6" 
            strokeWidth="4" 
            fill="none"
            style={{ display: academicCount > 0 ? 'block' : 'none' }}
          />
  
          {/* Experience dots */}
          {experiences.map((experience, index) => {
            const yPosition = 200 + (experience.index * 400);
            const xPosition = experience.type === 'professional' ? 400 : 200;
            
            return (
              <circle
                key={index}
                cx={xPosition}
                cy={yPosition}
                r="8"
                className={`${
                  experience.type === 'professional' 
                    ? 'fill-neopop-primary' 
                    : 'fill-neopop-secondary'
                }`}
                stroke="#252A34"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
    );
  };
  
  const ExperienceCard = ({ title, company, duration, description, type, position, index }) => {
    const yOffset = index * 400; // Increased spacing between cards
  
    return (
      <div 
        className={`absolute w-[40%] ${
          type === 'professional' 
            ? 'right-[5%]'
            : 'left-[5%]'
        }`}
        style={{ top: `${yOffset}px` }}
      >
        <motion.div 
          initial={{ opacity: 0, x: type === 'professional' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-4 border-neopop-dark shadow-neopop p-6 rounded-lg
                     hover:shadow-neopop-lg transition-all duration-300"
        >
          <div className={`inline-block px-3 py-1 rounded mb-3 text-sm font-medium ${
            type === 'professional' 
              ? 'bg-neopop-primary text-white' 
              : 'bg-neopop-secondary text-neopop-dark'
          }`}>
            {type === 'professional' ? 'Professional' : 'Academic'}
          </div>
          
          <h3 className="text-2xl font-bold text-neopop-primary mb-2">{title}</h3>
          <h4 className="text-xl font-semibold text-neopop-dark mb-2">{company}</h4>
          <p className="text-neopop-secondary font-medium mb-4">{duration}</p>
          <p className="text-neopop-dark">{description}</p>
        </motion.div>
      </div>
    );
  };

const ProjectCard = ({ title, description, tags, githubUrl, demoUrl, image }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-4 border-neopop-dark shadow-neopop rounded-lg 
                   hover:shadow-neopop-lg transition-all duration-300 overflow-hidden"
      >
        {/* Preview Image */}
        <div className="h-48 bg-neopop-dark relative overflow-hidden">
          <img 
            src={image || "/api/placeholder/400/320"} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neopop-dark/80 to-transparent" />
        </div>
  
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-neopop-dark mb-2">{title}</h3>
          <p className="text-neopop-dark mb-4">{description}</p>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neopop-light border-2 border-neopop-dark 
                         text-neopop-dark text-sm font-medium rounded"
              >
                {tag}
              </span>
            ))}
          </div>
  
          {/* Links */}
          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-neopop-dark text-white text-center font-medium 
                       rounded border-2 border-neopop-dark hover:bg-neopop-primary 
                       transition-colors duration-300"
            >
              View Code
            </a>
            {/* {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-neopop-secondary text-neopop-dark text-center 
                         font-medium rounded border-2 border-neopop-dark 
                         hover:bg-neopop-light transition-colors duration-300"
              >
                Live Demo
              </a>
            )} */}
          </div>
        </div>
      </motion.div>
    );
  };

const Portfolio = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const surveyRef = useRef(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsRevealed(true);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', ref: homeRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'experience', label: 'Experience', ref: experienceRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'survey', label: 'Fun Survey', ref: surveyRef }
  ];

  // About section content
  const aboutContent = (
    <div className="space-y-8">
      <NeopopSection title="Who Am I?">
        <p className="text-lg text-neopop-dark leading-relaxed">
          I'm a passionate software engineer with a love for creating intuitive and 
          engaging web experiences. My journey in tech started with...
        </p>
      </NeopopSection>

      <NeopopSection title="My Journey">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-neopop-primary rounded-full"></div>
            <p className="text-lg text-neopop-dark">Started coding at age 12</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-neopop-secondary rounded-full"></div>
            <p className="text-lg text-neopop-dark">Graduated with CS degree</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-neopop-accent rounded-full"></div>
            <p className="text-lg text-neopop-dark">Started first tech job</p>
          </div>
        </div>
      </NeopopSection>

      <NeopopSection title="What I Love">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Problem Solving', 'Clean Code', 'Learning', 'Teaching'].map((item) => (
            <div 
              key={item}
              className="bg-neopop-light p-4 rounded border-2 border-neopop-dark 
                         hover:bg-neopop-primary hover:text-white transition-colors 
                         duration-300 cursor-pointer text-center font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </NeopopSection>
    </div>
  );

  const getDateValue = (dateStr) => {
    if (dateStr === 'Present') return new Date().getTime();
    
    const [month, year] = dateStr.trim().split(' ');
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    return new Date(parseInt(year), monthMap[month], 1).getTime();
  };

  const experiences = [
    {
        title: "Graduate Teaching Assistant - Operating Systems",
        company: "NYU - Tandon School Engeering",
        duration: "Sept 2024 - Dec 2024",
        description: "As a Graduate Teaching Assistant for Operating Systems at NYU, I designed assignments to teach OS concepts using C and xv6, created scripts for efficient grading, and supported students through daily interactions and weekly quizzes.",
        type: "academic"
    },
    {
        title: "Teaching Assistant - Machine Learning",
        company: "NYU - Courant Institute of Mathematical Sciences",
        duration: "Sept 2024 - Dec 2024",
        description: "As a Teaching Assistant for Machine Learning at NYU Courant, I graded assignments and projects while providing support to students by addressing their doubts and clarifying concepts.",
        type: "academic"
    },
    {
      title: "Data Science and Strategy Intern",
      company: "EVgo",
      duration: "June 2024 - Aug 2024",
      description: "Embedded within EVgo's finance team, I contributed to data migration efforts to Snowflake, enhancing data accessibility and efficiency. I also focused on optimizing data retrieval speed and refining data modeling processes to support strategic decision-making.",
      type: "professional"
    },
    {
      title: "Software Engineer",
      company: "ElasticRun",
      duration: "July 2021 - July 2023",
      description: "At ElasticRun, I developed a scalable vehicle routing engine, optimized logistics operations, and reduced costs through advanced algorithms and data-driven solutions. I improved decision-making with actionable insights, resolved data anomalies efficiently, and collaborated in an Agile environment to enhance user experience.",
      type: "professional"
    },
    {
      title: "Computer Vision Intern",
      company: "Softedge Infotech",
      duration: "Jan 2021 - Mar 2021",
      description: "At SoftEdge Infotech, I developed AI-powered AR solutions using computer vision, enhancing performance by optimizing code and leveraging advanced frameworks. I contributed to creating efficient, high-quality solutions tailored to client needs.",
      type: "professional"
    }
  ];

  const sortExperiences = (experiences) => {
    const sortByDate = (a, b) => {
      const aEndDate = a.duration.split(' - ')[1];
      const bEndDate = b.duration.split(' - ')[1];
      return getDateValue(bEndDate) - getDateValue(aEndDate);
    };

    // Split and sort experiences by type
    const professional = experiences
      .filter(exp => exp.type === 'professional')
      .sort(sortByDate);
      
    const academic = experiences
      .filter(exp => exp.type === 'academic')
      .sort(sortByDate);

    // Combine experiences for timeline, maintaining parallel structure
    const organized = [];
    const maxLength = Math.max(professional.length, academic.length);

    for (let i = 0; i < maxLength; i++) {
      if (professional[i]) {
        organized.push({
          ...professional[i],
          position: 'right',
          index: i
        });
      }
      if (academic[i]) {
        organized.push({
          ...academic[i],
          position: 'left',
          index: i
        });
      }
    }

    return organized;
  };

  const organizedExperiences = sortExperiences(experiences);

  // Calculate maximum number of experiences on either side
  const maxProfessional = experiences.filter(exp => exp.type === 'professional').length;
  const maxAcademic = experiences.filter(exp => exp.type === 'academic').length;
  const maxExperiences = Math.max(maxProfessional, maxAcademic);

  const projects = [
    {
      title: "AI Chat Assistant",
      description: "A real-time chat application powered by machine learning for intelligent responses.",
      tags: ["Python", "TensorFlow", "React", "WebSockets"],
      githubUrl: "https://github.com/yourusername/ai-chat",
      demoUrl: "https://ai-chat-demo.com",
      image: "/api/placeholder/400/320"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing and analyzing large datasets.",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/yourusername/analytics-dashboard",
      demoUrl: "https://dashboard-demo.com",
      image: "/api/placeholder/400/320"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      tags: ["Next.js", "Stripe", "MongoDB", "TypeScript"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      demoUrl: null,
      image: "/api/placeholder/400/320"
    },
    // Add more projects as needed
  ];

  return (
    <div className="relative min-h-screen">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neopop-dark/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'text-neopop-primary' 
                      : 'text-neopop-light hover:text-neopop-secondary'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {/* Landing Section */}
        <section ref={homeRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-neopop-dark">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            {!isRevealed ? (
              <>
                <h1 className="text-6xl font-bold mb-8 text-neopop-light">
                  Welcome to My Portfolio
                </h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerConfetti}
                  className="px-8 py-4 bg-neopop-primary text-white rounded-lg shadow-lg
                            border-4 border-neopop-secondary hover:bg-opacity-90
                            transition-all duration-300 text-xl font-bold"
                >
                  For Recruiters
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-neopop-primary to-neopop-secondary 
                             text-transparent bg-clip-text animate-gradient">
                  Neel Gandhi, your next hire
                </h1>
                <p className="text-neopop-light text-xl">
                  Scroll down to learn more about me
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            animate={{
              scale: isRevealed ? [1, 1.2] : 1,
              opacity: isRevealed ? [0.5, 0.8] : 0.5
            }}
            transition={{
              duration: 2,
              repeat: isRevealed ? Infinity : 0,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-r from-neopop-primary/20 to-neopop-secondary/20 
                       blur-3xl -z-10"
          />
        </section>

        {/* About Section */}
        <section 
          ref={aboutRef} 
          className="min-h-screen bg-gray-50 p-8 pt-24 scroll-mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neopop-dark mb-8 
                       bg-gradient-to-r from-neopop-primary to-neopop-secondary 
                       text-transparent bg-clip-text">
              About Me
            </h2>
            {aboutContent}
          </motion.div>
        </section>

        {/* Other sections remain the same */}
        {/* Experience Section */}
        <section 
      ref={experienceRef} 
      className="bg-white p-8 pt-24 scroll-mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative"
      >
        <h2 className="text-4xl font-bold text-center mb-8 
                     bg-gradient-to-r from-neopop-primary to-neopop-secondary 
                     text-transparent bg-clip-text">
          Experience
        </h2>

        {/* Timeline container */}
        <div className="relative mt-24 mb-24"> {/* Added bottom margin */}
          <BranchingTimeline experiences={organizedExperiences} />

          {/* Experience cards container */}
          <div 
            className="relative" 
            style={{ 
              height: `${(Math.max(
                experiences.filter(exp => exp.type === 'professional').length,
                experiences.filter(exp => exp.type === 'academic').length
              ) * 400)}px`
            }}
          >
            {organizedExperiences.map((experience) => (
              <ExperienceCard 
                key={`${experience.type}-${experience.index}`}
                {...experience}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>

        {/* Projects Section */}
        <section 
      ref={projectsRef} 
      className="min-h-screen bg-gray-50 p-8 pt-24 scroll-mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-4 
                     bg-gradient-to-r from-neopop-primary to-neopop-secondary 
                     text-transparent bg-clip-text">
          Projects
        </h2>
        
        {/* <p className="text-center text-neopop-dark mb-12 text-lg">
          Check out some of my recent work
        </p> */}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neopop-dark text-white px-8 py-4 rounded-lg
                     border-4 border-neopop-secondary hover:bg-neopop-primary
                     transition-all duration-300 shadow-neopop hover:shadow-neopop-lg
                     font-bold text-lg"
          >
            View More on GitHub →
          </a>
        </motion.div>
      </motion.div>
    </section>

        {/* Skills Section */}
        <section 
          ref={skillsRef} 
          className="min-h-screen bg-white p-8 pt-24 scroll-mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neopop-dark mb-8">Skills</h2>
            {/* Add your content here */}
          </motion.div>
        </section>

        {/* Survey Section */}
        <section 
          ref={surveyRef} 
          className="min-h-screen bg-gray-50 p-8 pt-24 scroll-mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neopop-dark mb-8">Fun Survey</h2>
            {/* Form will go here */}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;