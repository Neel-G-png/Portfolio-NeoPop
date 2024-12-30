import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import CuteSvg from './CuteSvg';
import DisplayLottie from './DisplayLottie';
import landingPerson from '../assets/lottie/landingPerson';
import codingPerson from '../assets/lottie/codingPerson';
import { Github, Linkedin, Mail } from 'lucide-react';

// Create the NeopopSection component separately
const NeopopSection = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white border-4 border-neopop-dark shadow-neopop p-6 rounded-lg ${className}`}>
      <h3 className="text-2xl font-bold text-neopop-dark mb-4">{title}</h3>
      {children}
    </div>
  );
};

const SectionBanner = ({ type }) => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        absolute top-0 ${type === 'professional' ? 'right-[5%]' : 'left-[5%]'}
        w-[40%] py-3 px-6 
        ${type === 'professional' ? 'bg-neopop-primary' : 'bg-neopop-secondary'}
        border-4 border-neopop-dark 
        rounded-lg shadow-neopop
        text-center z-30
      `}
    >
      <h3 className={`text-2xl font-bold ${type === 'professional' ? 'text-white' : 'text-neopop-dark'}`}>
        {type === 'professional' ? 'Professional' : 'Academic'}
      </h3>
    </motion.div>
  );

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
  
  const ExperienceCard = ({ title, company, companyUrl, duration, description, type, position, index }) => {
    const yOffset = index * 400 + 100; // Added offset to accommodate banner
  
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
                     hover:shadow-neopop-lg transition-all duration-300 z-20"
        >
          <h3 className="text-2xl font-bold text-neopop-primary mb-2">{title}</h3>
          {companyUrl ? (
            <a 
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-neopop-dark mb-2 hover:text-neopop-primary 
                       transition-colors duration-300 underline decoration-dashed 
                       underline-offset-4 inline-block"
            >
              {company}
            </a>
          ) : (
            <h4 className="text-xl font-semibold text-neopop-dark mb-2">{company}</h4>
          )}
          <p className="text-neopop-secondary font-medium mb-4">{duration}</p>
          <p className="text-neopop-dark">{description}</p>
        </motion.div>
      </div>
    );
  };

  const ProjectCard = ({ title, description, tags, githubUrl, demoUrl, image }) => {
    // Import image dynamically
    const imageUrl = new URL(`../assets/${image}`, import.meta.url).href;
  
    return (
      <motion.a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        whileTap={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-white border-4 border-neopop-dark shadow-neopop rounded-lg 
                   hover:shadow-neopop-lg transition-all duration-300 overflow-hidden
                   cursor-pointer group block"
      >
        {/* Preview Image */}
        <div className="h-48 bg-neopop-dark relative overflow-hidden">
          <img 
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300
                       group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neopop-dark/80 to-transparent" />
        </div>
  
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-neopop-dark mb-2 
                       group-hover:text-neopop-primary transition-colors duration-300">
            {title}
          </h3>
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
  
          {/* Demo Link - Only if provided */}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block px-4 py-2 bg-neopop-secondary text-neopop-dark 
                       text-center font-medium rounded border-2 border-neopop-dark 
                       hover:bg-neopop-light transition-colors duration-300"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.a>
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
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'experience', label: 'Experience', ref: experienceRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'survey', label: 'Fun Survey', ref: surveyRef }
  ];

  // About section content
//   const aboutContent = (
//     <div className="space-y-8">
//       <NeopopSection title="Who Am I?">
//         <p className="text-lg text-neopop-dark leading-relaxed">
//           I'm a passionate software engineer with a love for creating intuitive and 
//           engaging web experiences. My journey in tech started with...
//         </p>
//       </NeopopSection>

//       <NeopopSection title="My Journey">
//         <div className="space-y-4">
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-neopop-primary rounded-full"></div>
//             <p className="text-lg text-neopop-dark">Started coding at age 12</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-neopop-secondary rounded-full"></div>
//             <p className="text-lg text-neopop-dark">Graduated with CS degree</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="w-2 h-2 bg-neopop-accent rounded-full"></div>
//             <p className="text-lg text-neopop-dark">Started first tech job</p>
//           </div>
//         </div>
//       </NeopopSection>

//       <NeopopSection title="What I Love">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {['Problem Solving', 'Clean Code', 'Learning', 'Teaching'].map((item) => (
//             <div 
//               key={item}
//               className="bg-neopop-light p-4 rounded border-2 border-neopop-dark 
//                          hover:bg-neopop-primary hover:text-white transition-colors 
//                          duration-300 cursor-pointer text-center font-medium"
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       </NeopopSection>
//     </div>
//   );

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
        companyUrl: "https://engineering.nyu.edu/sites/default/files/2020-10/CS-GY%206233%20Intro%20Operating%20Systems.pdf",
        duration: "Sept 2024 - Dec 2024",
        description: "As a Graduate Teaching Assistant for Operating Systems at NYU, I designed assignments to teach OS concepts using C and xv6, created scripts for efficient grading, and supported students through daily interactions and weekly quizzes.",
        type: "academic"
    },
    {
        title: "Teaching Assistant - Machine Learning",
        company: "NYU - Courant Institute of Mathematical Sciences",
        companyUrl: "https://www.nyu.edu/content/dam/nyu/globalPrgms/documents/paris/academics/Syllabi/fall-2024/Syl_Paris_CSCI-UA%209473_Instructor_Fall%202024.pdf",
        duration: "Sept 2024 - Dec 2024",
        description: "As a Teaching Assistant for Machine Learning at NYU Courant, I graded assignments and projects while providing support to students by addressing their doubts and clarifying concepts.",
        type: "academic"
    },
    {
      title: "Data Science and Strategy Intern",
      company: "EVgo",
      companyUrl: "https://evgo.com/",
      duration: "June 2024 - Aug 2024",
      description: "Embedded within EVgo's finance team, I contributed to data migration efforts to Snowflake, enhancing data accessibility and efficiency. I also focused on optimizing data retrieval speed and refining data modeling processes to support strategic decision-making.",
      type: "professional"
    },
    {
      title: "Software Engineer",
      company: "ElasticRun",
      companyUrl: "https://www.elastic.run/",
      duration: "July 2021 - July 2023",
      description: "At ElasticRun, I developed a scalable vehicle routing engine, optimized logistics operations, and reduced costs through advanced algorithms and data-driven solutions. I improved decision-making with actionable insights, resolved data anomalies efficiently, and collaborated in an Agile environment to enhance user experience.",
      type: "professional"
    },
    {
      title: "Computer Vision Intern",
      company: "Softedge Infotech",
      companyUrl: "https://softedge.in/",
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
      title: "K.E.V.I.N. - Ecosystem for Students",
      description: "A real-time cloud-based Notion integrated chat bot with job application tracker. Build with GCP and vertex AI to enable users to chat with their notion notes seamlessly while also keeping track of their job applications.",
      tags: ["GCP", "RAG", "Firebase", "Flask", "ML", "LLM"],
      githubUrl: "https://github.com/Neel-G-png/Talk2Doc",
      demoUrl: null,
      image: "Kevin.png"
    },
    {
        title: "LexiLens",
        description: "A cloud-based photo album app enabling object-based image search using AWS Rekognition and OpenSearch. Built with a Flask frontend, serverless architecture via Lambda and API Gateway, and automated deployments with CodeDeploy and CloudFormation.",
        tags: ["AWS", "Rekognition", "Serverless", "Cloud Deployent"],
        githubUrl: "https://github.com/Neel-G-png/LexiLens",
        demoUrl: null,
        image: "LexiLens.png"
    },
    {
      title: "NYC Crash No-Mo!",
      description: "A real time crash probability predictor based on road networks, weather, and traffic conditions.",
      tags: ["Pyspark", "Streamlit", "Big Data", "Dask"],
      githubUrl: "https://github.com/Neel-G-png/NYC-Crash-no-mo",
      demoUrl: null,
      image: "NYC-crash-nomo.png"
    },
    {
        title: "Lottery Scheduler xv6",
        description: "A custom Lottery Scheduler implementation in x86 version of XV6",
        tags: ["Operating System", "Scheduler", "C"],
        githubUrl: "https://github.com/Neel-G-png/Lottery-Scheduler-XV6",
        demoUrl: null,
        image: "lottery_scheduler.jpg"
    },
    {
        title: "Tiff, The Dining Concierge",
        description: "An AWS cloud-based chatbot built to provide restaurant recommendations. Users specify preferences via Lex, with requests processed through SQS and data fetched from OpenSearch and DynamoDB. Results are emailed using SES for a seamless experience.",
        tags: ["AWS", "Opensearch", "Lex", "DynamoDB"],
        githubUrl: "https://github.com/Neel-G-png/Alfred-Dining-Concierge",
        demoUrl: null,
        image: "Dining-concierge.png"
    },
    {
        title: "TIFU-KNN Next Basket Recommendation",
        description: "Developed a next basket recommendation system using TIFU-KNN, leveraging temporal decay and item categories to optimize predictions. Streamlined data processing and implemented algorithms to enhance recommendation accuracy and efficiency.",
        tags: ["Data Science", "Machine Learning", "Recommendation Systems"],
        githubUrl: "https://github.com/Neel-G-png/TIFU-KNN",
        demoUrl: null,
        image: "tifu-knn.jpg"
    },
    // {
    //   title: "Augmented Reality Photo Frame",
    //   description: "An Augmented reality script to turn a static photo frame into an AR video player using OpenCV and Aruco markers.",
    //   tags: ["OpenCV", "Computer Vision", "Fun"],
    //   githubUrl: "https://github.com/Neel-G-png/AR-frame-gift",
    //   demoUrl: null,
    //   image: "ar_photo_frame.jpg"
    // },
    // Add more projects as needed
  ];

  return (
    <div className="relative min-h-screen">
      {/* Fixed Navigation */}
      <div className="fixed inset-0 bg-gradient-to-r from-neopop-primary/5 to-neopop-secondary/5 blur-3xl pointer-events-none" />
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
      <main className="relative w-full">
      <div>
        {/* Landing Section */}
        <section ref={homeRef} className="min-h-screen flex items-center relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left z-10"
      >
        {/* Animated Heading */}
        <motion.h1 
          key={isRevealed ? 'revealed' : 'initial'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-6xl font-bold mb-8 ${
            isRevealed 
              ? 'bg-gradient-to-r from-neopop-primary to-neopop-secondary text-transparent bg-clip-text animate-gradient'
              : 'text-neopop-dark'
          }`}
        >
          {isRevealed ? "I'm Neel, your next hire" : "Hi 👋, I'm Neel! Nice to meet you."}
        </motion.h1>

        {/* Rest of the content stays constant */}
        <p className="text-xl text-neopop-dark/80 mb-8">
        Experienced software engineer and current Master’s student in Computer Science at NYU, specializing in big data, cloud computing, and machine learning. Passionate about creating impactful solutions, I’ve worked on projects like scalable logistics systems and LLM-powered assistants. I enjoy exploring new technologies, collaborating, and making tech more accessible and efficient.
        </p>
        
        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="text-neopop-dark hover:text-neopop-primary transition-colors duration-300"
          >
            <Github size={32} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="text-neopop-dark hover:text-neopop-secondary transition-colors duration-300"
          >
            <Linkedin size={32} />
          </motion.a>
          <motion.a
            href="mailto:your.email@example.com"
            whileHover={{ y: -5 }}
            className="text-neopop-dark hover:text-neopop-accent transition-colors duration-300"
          >
            <Mail size={32} />
          </motion.a>
        </div>
      </motion.div>

      {/* Right Animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-[500px]"
      >
        <DisplayLottie animationData={landingPerson} />
      </motion.div>
    </div>

    {/* Recruiter Button - Positioned at bottom left */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={triggerConfetti}
      className="absolute bottom-8 left-8 px-6 py-3 bg-neopop-primary text-white 
                rounded-lg shadow-neopop border-2 border-neopop-dark 
                hover:bg-opacity-90 transition-all duration-300 text-base font-bold z-20"
    >
      For Recruiters
    </motion.button>
  </div>

  {/* Background Gradient */}
</section>

        {/* Skills Section */}
        <section 
          ref={skillsRef} 
          className="w-full scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
        >
            <h2 className="text-4xl font-bold text-center mb-12 
                        bg-gradient-to-r from-neopop-primary to-neopop-secondary 
                        text-transparent bg-clip-text">
            Skills
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Lottie Animation */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-[500px] flex items-center justify-center lg:order-1"
            >
                <DisplayLottie animationData={codingPerson} />
            </motion.div>

            {/* Right Side - Skills Content */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8 lg:order-2"
            >
                {/* Skills Categories */}
                <div>
                <h3 className="text-2xl font-bold text-neopop-dark mb-6">Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB"].map((skill) => (
                    <div 
                        key={skill}
                        className="bg-neopop-light p-4 rounded-lg border-4 border-neopop-dark
                                hover:bg-neopop-secondary transition-colors duration-300
                                text-center font-bold shadow-neopop hover:shadow-neopop-lg"
                    >
                        {skill}
                    </div>
                    ))}
                </div>
                </div>

                {/* Tools */}
                <div>
                <h3 className="text-2xl font-bold text-neopop-dark mb-6">Tools & Platforms</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Git", "Docker", "AWS", "VS Code", "Figma", "Jira"].map((tool) => (
                    <div 
                        key={tool}
                        className="bg-neopop-light p-4 rounded-lg border-4 border-neopop-dark
                                hover:bg-neopop-primary hover:text-white transition-colors duration-300
                                text-center font-bold shadow-neopop hover:shadow-neopop-lg"
                    >
                        {tool}
                    </div>
                    ))}
                </div>
                </div>

                {/* Additional Skills or Summary */}
                <div className="bg-white border-4 border-neopop-dark rounded-lg p-6 shadow-neopop">
                <p className="text-lg text-neopop-dark">
                    Passionate about clean code, performance optimization, and creating 
                    seamless user experiences. Always eager to learn and adapt to new technologies.
                </p>
                </div>
            </motion.div>
            </div>
        </motion.div>
        </div>
        </section>

        {/* Other sections remain the same */}
        {/* Experience Section */}
        <section 
          ref={experienceRef} 
          className="w-full scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

        <div className="relative">
          {/* Timeline container with adjusted spacing */}
          <div className="relative mt-16 mb-24">
            {/* Section Banners */}
            <SectionBanner type="professional" />
            <SectionBanner type="academic" />

            <BranchingTimeline experiences={organizedExperiences} />

            {/* Experience cards container */}
            <div 
              className="relative" 
              style={{ 
                height: `${(Math.max(
                  experiences.filter(exp => exp.type === 'professional').length,
                  experiences.filter(exp => exp.type === 'academic').length
                ) * 400) + 100}px` // Added extra height for banner
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
        </div>
      </motion.div>
      </div>
    </section>

        {/* Projects Section */}
        <section 
          ref={projectsRef} 
          className="w-full scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
        
        <p className="text-center text-neopop-dark mb-12 text-lg">
          Click the card to dive deeper!
        </p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </motion.div>
    </div>
    </section>

        {/* Survey Section */}
        <section 
          ref={surveyRef} 
          className="w-full scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
          </div>
        </section>
      </div>
      </main>
    </div>
  );
};

export default Portfolio;