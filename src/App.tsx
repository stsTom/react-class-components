import { useState } from 'react'
import './App.css'
import { Modal } from './components/Modal'
import { MainPage } from './pages/MainPage'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <MainPage openModal={handleModalToggle}/>
      <Modal isOpen={isModalOpen} closeModal={handleModalToggle}/>
    </>
  )
}

export default App
