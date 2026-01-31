import { Resource, ResourceType, Semester } from './types';

export const COURSES = [
  "B.Sc Physics Hons",
  "B.Sc Mathematics Hons",
  "B.Sc Chemistry Hons",
  "B.A. History Hons",
  "B.A. Political Science Hons",
  "B.A. English Hons",
  "B.Com Accounts Hons",
  "B.Tech Computer Science",
];

export const SUBJECTS: Record<string, string[]> = {
  "B.Sc Physics Hons": ["Mathematical Physics", "Mechanics", "Electricity and Magnetism", "Waves and Optics", "Quantum Mechanics", "Thermal Physics"],
  "B.Sc Mathematics Hons": ["Calculus", "Algebra", "Real Analysis", "Differential Equations", "Linear Algebra"],
  "B.Sc Chemistry Hons": ["Inorganic Chemistry", "Physical Chemistry", "Organic Chemistry"],
  "B.A. History Hons": ["Ancient India", "Medieval India", "Modern World History", "History of Jharkhand"],
  "B.A. Political Science Hons": ["Political Theory", "Indian Government", "Comparative Politics", "International Relations"],
  "B.A. English Hons": ["Indian Classical Literature", "European Classical Literature", "Indian Writing in English", "British Poetry"],
  "B.Com Accounts Hons": ["Financial Accounting", "Business Law", "Corporate Accounting", "Cost Accounting"],
  "B.Tech Computer Science": ["Data Structures", "Algorithms", "Operating Systems", "DBMS"],
};

// Generate some mock resources
export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Mechanics - 2022 End Sem',
    subject: 'Mechanics',
    course: 'B.Sc Physics Hons',
    semester: Semester.SEM_1,
    year: '2022',
    type: ResourceType.QUESTION_PAPER,
    downloadUrl: '#',
    dateAdded: '2023-01-15'
  },
  {
    id: '2',
    title: 'Quantum Mechanics - Unit 1 Notes',
    subject: 'Quantum Mechanics',
    course: 'B.Sc Physics Hons',
    semester: Semester.SEM_5,
    year: '2023',
    type: ResourceType.NOTES,
    downloadUrl: '#',
    dateAdded: '2023-08-20'
  },
  {
    id: '3',
    title: 'Financial Accounting - 2021 Previous Year',
    subject: 'Financial Accounting',
    course: 'B.Com Accounts Hons',
    semester: Semester.SEM_1,
    year: '2021',
    type: ResourceType.QUESTION_PAPER,
    downloadUrl: '#',
    dateAdded: '2022-03-10'
  },
  {
    id: '4',
    title: 'History of Jharkhand - Complete Summary',
    subject: 'History of Jharkhand',
    course: 'B.A. History Hons',
    semester: Semester.SEM_4,
    year: '2023',
    type: ResourceType.NOTES,
    downloadUrl: '#',
    dateAdded: '2023-11-05'
  },
  {
    id: '5',
    title: 'Data Structures Question Paper 2023',
    subject: 'Data Structures',
    course: 'B.Tech Computer Science',
    semester: Semester.SEM_3,
    year: '2023',
    type: ResourceType.QUESTION_PAPER,
    downloadUrl: '#',
    dateAdded: '2024-01-20'
  },
  {
    id: '6',
    title: 'Calculus Hand Written Notes',
    subject: 'Calculus',
    course: 'B.Sc Mathematics Hons',
    semester: Semester.SEM_1,
    year: '2022',
    type: ResourceType.NOTES,
    downloadUrl: '#',
    dateAdded: '2022-06-15'
  }
];

// Helper to generate more data if needed
for(let i=0; i<20; i++) {
  MOCK_RESOURCES.push({
    id: `gen-${i}`,
    title: `Sample Paper ${i+1} - ${2018 + (i%5)}`,
    subject: Object.values(SUBJECTS)[i % 5][0],
    course: Object.keys(SUBJECTS)[i % 5],
    semester: Object.values(Semester)[i % 6],
    year: (2019 + (i % 5)).toString(),
    type: i % 2 === 0 ? ResourceType.QUESTION_PAPER : ResourceType.NOTES,
    downloadUrl: '#',
    dateAdded: '2023-09-01'
  });
}
