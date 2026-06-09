import { create } from 'zustand'

export type FormStore = 'React Hook Form' | 'Uncontrolled Form'

export interface Submission {
  id: string
  source: FormStore
  submittedAt: Date
  name: string
  age: number
  email: string
  country: string
  imageName: string
}

interface FormsStore {
  submissions: Submission[]
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void
}

export const useFormsStore = create<FormsStore>((set) => ({
  submissions: [],
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
}))