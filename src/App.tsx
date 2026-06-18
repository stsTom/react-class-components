import { MainPage } from './pages/MainPage';
import { FormsModal } from './features/forms_modal/FormsModal';
import { useCallback, useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <MainPage openModal={openModal} />
      <FormsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}

export default App;
