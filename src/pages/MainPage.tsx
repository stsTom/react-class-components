interface MainPageProps {
  openModal: () => void
}

export function MainPage({ openModal } : MainPageProps){
  return(
    <main >
      <header>
        <button onClick={openModal}>Modal</button>
      </header>
    </main>
  )
}