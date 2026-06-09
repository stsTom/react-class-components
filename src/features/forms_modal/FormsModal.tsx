import { useState, useCallback } from 'react'
import { Modal } from '../../components/Modal'
import { ReactHookFormComponent } from '../../features/react_hook_form/ReactHookForm'
import { UncontrolledForm } from '../../features/uncontrolled_forms/UncontrolledForm'

type FormType = 'uncontrolled' | 'rhf'

interface FormsModalProps{
  isModalOpen: boolean;
  setIsModalOpen: (a: boolean) => void
}

export function FormsModal({isModalOpen, setIsModalOpen}: FormsModalProps) {
  const [activeForm, setActiveForm] = useState<FormType>('rhf')

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return(
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <label style={{ marginBottom: '16px' }}>
        Form type
        <br />
        <span>
          <small>Uncontrolled Form</small>
        </span>
        <input
          type="checkbox"
          id="form-type"
          name="form-type"
          role="switch"
          style={{ margin: '6px' }}
          checked={activeForm === 'rhf'}
          onChange={(e) => setActiveForm(e.target.checked ? 'rhf' : 'uncontrolled')}
        />
        <span>
          <small>React Hook Form</small>
        </span>
      </label>

      {activeForm === 'uncontrolled' ? (
        <UncontrolledForm closeModal={closeModal}/>
      ) : (
        <ReactHookFormComponent closeModal={closeModal}/>
      )}
    </Modal>
  )
}