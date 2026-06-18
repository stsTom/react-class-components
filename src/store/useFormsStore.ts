import { create } from 'zustand';
import { COUNTRIES } from './CountryList';

export type FormStore = 'React Hook Form' | 'Uncontrolled Form';

export interface Submission {
  id: string;
  source: FormStore;
  submittedAt: Date;
  name: string;
  age: number;
  email: string;
  country: string;
  imageName: string;
  imageBase64: string;
}

interface FormsStore {
  submissions: Submission[];
  countries: typeof COUNTRIES;
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
}

export const useFormsStore = create<FormsStore>((set) => ({
  submissions: [],
  countries: COUNTRIES,
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [
        {
          ...submission,
          id: crypto.randomUUID(),
          submittedAt: new Date(),
        },
        ...state.submissions,
      ],
    })),
}));
