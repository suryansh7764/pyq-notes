export enum ResourceType {
  QUESTION_PAPER = 'Previous Year Question Paper',
  NOTES = 'Class Notes',
  SYLLABUS = 'Syllabus'
}

export enum Semester {
  SEM_1 = 'Semester 1',
  SEM_2 = 'Semester 2',
  SEM_3 = 'Semester 3',
  SEM_4 = 'Semester 4',
  SEM_5 = 'Semester 5',
  SEM_6 = 'Semester 6',
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  course: string; // e.g., B.Sc Physics Hons
  semester: Semester;
  year: string;
  type: ResourceType;
  downloadUrl: string;
  dateAdded: string;
}

export interface FilterState {
  course: string;
  semester: string;
  subject: string;
  type: string;
}

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}