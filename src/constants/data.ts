import { FaHtml5 } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg'
import { DiAndroid } from 'react-icons/di';
import { HiOutlineCode } from 'react-icons/hi';

export const DATA = {
    personalInfo: {
        name: 'Dalveer Singh', 
        role: 'Full Stack Developer',
        email: 'dalveersidhu97@gmail.com',
        address: 'Brampton, ON',
        phone: '+19029880900',
    },
    socialLinks: {
        linkedIn: '',
        gitHub: '',
        facebook: ''
    },
    about: {
        desc: "I am a full-stack web developer near Toronto Ontario. I got my interest in coding since 12th grade that's why I did my Graduation and Postgraduation in computer. Now, Coding has become my favourite passion and I love seeing the results of my efforts.",
        strengths: {
          'Fullstack Web development': {
						Icon: CgWebsite,
						desc: 'Single or Multipage fullstack websites using Node.js, Express.js, Next.js, React.js, Core PHP, Spring MVC, SQL or NoSQL databases etc.'
					},
          'Front End Web Development': {
						Icon:FaHtml5,
						desc: 'I can build responsive front end websites using HTML, CSS, JS, React.js, JQery etc.'
					},
          'API Development': {
						Icon: HiOutlineCode,
						desc: 'I can make APIs using Node.js, Next.js, Core PHP, MongoDB, Mongoose, SQL, Web Tokesn etc.'
					},
					'Android Apps': {
						Icon: DiAndroid,
						desc: 'I am able to create such simple android apps that use simple UI, API calls, local storage. I made a Quiz app which avaliable in projects section.'
					} 
        }
    },
    skills: {
			'Back-End': [
				{ name: 'Express.js', level: '90%' },
				{ name: 'GraphQL', level: '90%' },
				{ name: 'Sequelize.js', level: '80%' },
				{ name: 'Mongoose.js', level: '70%' },
				{ name: 'Jest for Unit testing', level: '90%' },
			],
			'Front-End': [
				{ name: 'React.js', level: '90%' },
				{ name: 'JQuery', level: '90%' },
				{ name: 'TailwindCSS', level: '90%' },
				{ name: 'Bootstrap', level: '80%' },
				{ name: 'React Testing Library for Testing', level: '90%' },
			],
			'Programming Languages': [
				{ name: 'Javascript', level: '90%' },
				{ name: 'Typescript', level: '90%' },
				{ name: 'HTML5 & CSS3', level: '90%' },
				{ name: 'Java', level: '80%' },
				{ name: 'PHP', level: '70%' },
				{ name: 'Python', level: '70%' },
			],
			'Frameworks / Libraries': [
				{ name: 'Node.js', level: '90%' },
				{ name: 'Next.js', level: '70%' },
				{ name: 'GraphQL', level: '80%' },
				{ name: 'Socket.io', level: '70%' },
				{ name: 'Redux.js / Redux Tookit', level: '90%' },
				{ name: 'OAuth, JWT', level: '90%' },
			],
			'Database': [
				{ name: 'PostgreSQL', level: '90%' },
				{ name: 'MySQL', level: '90%' },
				{ name: 'SQL Server', level: '90%' },
				{ name: 'MongoDB', level: '80%' },
				{ name: 'Mongoose (ORM) / Redux Tookit', level: '80%' },
				{ name: 'Sequelize (ORM)', level: '80%' },
			],
			'More': [
				{ name: 'Docker', level: '80%' },
				{ name: 'Github & GitLab', level: '90%' },
				{ name: 'REST APIs', level: '90%' },
				{ name: 'MVC Architecture', level: '90%' },
				{ name: 'Test Driven Development (TDD)', level: '80%' },
				{ name: 'Unit Testing', level: '80%' },
				{ name: 'Agile methodologies, JIRA', level: '80%' },
				{ name: 'Chrome Extensions', level: '80%' },
			]
    },
    experience: {
			work: {
				desc: 'With 1 year of experience as a fullstack Nodejs/Typescript developer.',
				history: [
					{ 
						role: 'Full Stack Developer',
						type: 'Full Time',
						from: '',
						to: '',
						comapany: '',
						address: '',
						roles: [
							'Developed REST API using Node.js, Typescript, Sequelize.js, and PostgresSQL database for the New World NFT Platform.',
							'Developed Front-End App Using React.js, Redux.js, Typescript, TailwindCSS, etc.'
						]
					},
					{ 
						role: 'Web Developer',
						type: 'Intern',
						from: '',
						to: '',
						comapany: '',
						address: '',
						roles: [
							'Developed REST API using Node.js, Typescript, Sequelize.js, and PostgresSQL database for the New World NFT Platform.',
							'Developed Front-End App Using React.js, Redux.js, Typescript, TailwindCSS, etc.'
						]
					}
				]
			},
			personal: {
				desc: 'I have create many project since last 3.5 years Such as Movies Websites to download movies, Youtube video, playlist or channle dowloader using Youtube API, android app for movies. Some of them whose source code still I have are :-',
				projects: [
					{
						name: 'AssignDaku.com',
						desc: 'Utilized My Own SMS API, Typescript, Next.js, Custom Express Server, React.js, Mongoose, Strip Payments, TailwindCSS. Here I help others with programming bugs, assignments, and projects. I control user requests through my admin panel. This domain directly accesses my computer IP, so it may not open if my computer is turned off.',
						images: ['https://www.dalveersidhu.com/img/assigndaku.jpg'],
						skills: [ 'Node.js', 'Next.js', 'React.js', 'Typescript', 'Mongoose', 'TailwindCSS', 'HTML5 & CSS3', 'Redux.js' ],
						github: 'https://github.com/dalveersidhu97/assigndaku',
						deployed: 'https://assigndaku.com/',
					}
				]
			}
    },
    resume: {
			link: 'MyResume.pdf',
			desc: 'Web developer with ability to learn and collaborate in rapidly changing evironments and compositions. Worked through 1000+ hours of bootcamp structure, learning Javascript, Node.js, React.js, Next.js, Typescript and many more. Eager to tackle web development/design challenges to achieve lasting impact on user experience.',
			education: [
				{
					name: 'Computer Software and Database Development',
					institute: 'Lambton College',
					level: 'Post Graduate Diploma',
					campus: 'Toronto Campus',
					gpa: 'GPA 3.6',
					duration: '2 years',
					from: 'May 2020',
					to: 'May 2022'
				},
				{
					name: 'Bachelor of Computer Application',
					institute: 'Punjabi University',
					level: 'Bachelors Degree',
					campus: 'Patiala Campus',
					gpa: 'GPA 3.0',
					duration: '3 years',
					from: 'May 2016',
					to: 'May 2019'
				}
			]
    }
}