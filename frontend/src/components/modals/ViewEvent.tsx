import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewEvent({showModal, handleCloseModal, selectedEvent}) {
    return ( 
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>{selectedEvent?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p><strong>Data:</strong> {selectedEvent?.start?.toLocaleDateString()}</p>
            <p><strong>Descrição:</strong> {selectedEvent?.extendedProps?.description || "Sem descrição"}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
            </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default ViewEvent;