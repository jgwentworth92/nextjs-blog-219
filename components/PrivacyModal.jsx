import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

const PrivacyModal = ({ onAgree }) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const agreed = localStorage.getItem('privacyPolicyAgreed') === 'true'
    if (!agreed) {
      setShowModal(true)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem('privacyPolicyAgreed', 'true')
    setShowModal(false)
    onAgree()
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please read our <a href="privacy.html" target="_blank">Privacy Policy</a> carefully before using our website.</p>
        <p>Do you agree to our Privacy Policy?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Disagree
        </Button>
        <Button variant="primary" onClick={handleAgree}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PrivacyModal