import { SubmissionList } from "../features/submissions_list/SubmissionsList"

interface MainPageProps {
  openModal: () => void
}

export function MainPage({ openModal } : MainPageProps){
  return(
    <main >
      <header>
        <button onClick={openModal}>Modal</button>
      </header>
      <section>
        <SubmissionList />
      </section>
    </main>
  )
}