export const resume = {
  name: 'Antoni Rygulski',
  title: 'Software Engineer',
  about: [
    "Hello, I'm Antoni.",
    '',
    "I'm a software engineer who recently graduated from the University of San Francisco with a degree in Computer Science and a concentration in Artificial Intelligence. During my studies I interned in both San Francisco, California and Gdańsk, Poland, where I built full-stack applications and gained experience working on real-world projects.",
    '',
    "I enjoy creating software that's clean, reliable, and thoughtfully engineered. I like understanding how systems work from end to end, from user interfaces to backend architecture, and I'm always looking to learn something new. I'm also passionate about AI and modern software development.",
  ],
  experience: [
    {
      role: 'Software Engineer Intern',
      company: 'Consilient Labs',
      location: 'San Francisco, CA',
      period: 'January 2026 – May 2026',
      technologies: ['MCP', 'TypeScript', 'Node.js', 'Redis', 'BullMQ'],
      details: [
        'At Consilient Labs, I led a team of 3 interns to design and develop a Model Context Protocol (MCP) server that enabled LLMs to interact with custom external tools. Using TypeScript and Node.js, I designed a modular architecture that made it easy to add new tools without modifying the server\'s core, making the platform more scalable and maintainable. On top of that, I implemented asynchronous job processing with BullMQ and Redis to handle long-running tasks efficiently.',
      ],
    },
    {
      role: 'Software Engineer Intern',
      company: 'IDO Electronics',
      location: 'Gdańsk, Poland',
      period: 'May 2025 – August 2025',
      technologies: ['Vue.js', 'TypeScript'],
      details: [
        'During my internship at IDO Electronics, I developed and deployed a production-ready web application that ran on Modbus-to-M-Bus conversion devices. I built features that communicated with the backend through REST API endpoints, handling data exchange between the client and server to configure, monitor, and manage each device. I also gave weekly presentations to my department, sharing project progress, technical decisions, and key milestones.',
      ],
    },
  ],
  projects: [
    {
      name: 'Travel Tracker',
      url: 'https://travel-tracker-six-alpha.vercel.app/',
      details: [
        'A full-stack web app where the user marks countries they’ve visited on an interactive world map and see live stats for countries and continents visited.',
        'Built with React, Node.js, Express, and MongoDB. Users can sign up, log in, and save their map — visited countries are stored per account and load back on the next visit.',
      ],
    },
    {
      name: 'Climate Change & Human Displacement Forecasting',
      url: '/MLproject.pdf',
      details: [
        'A machine learning project that tries to predict how many people will be displaced in a given country and year, based on climate and disaster data. We merged UNHCR refugee records, IDMC disaster impacts, and NASA climate observations, then trained decision tree, Random Forest, and XGBoost models with a time-based split. We also built an interactive tool so users can explore projected displacement under different climate scenarios through 2030.',
      ],
    },
  ],
  contact: {
    phone: '(415) 650-7825',
    email: 'antek.rygulski@gmail.com',
    github: 'https://github.com/devAntekRygulski',
    linkedin: 'https://www.linkedin.com/in/antoni-rygulski-5b8878298/',
  },
  fileUrl: '/resume.pdf',
}
