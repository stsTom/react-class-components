import { useState } from 'react'
import { Modal } from './components/Modal'
import { MainPage } from './pages/MainPage'
import { ReactHookFormComponent } from './features/react_hook_form/ReactHookForm'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <MainPage openModal={handleModalToggle}/>
      <Modal isOpen={isModalOpen} closeModal={handleModalToggle}>
        <ReactHookFormComponent />
      </Modal>
    </>
  )
}

export default App
