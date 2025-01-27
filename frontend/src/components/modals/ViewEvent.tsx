import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewEvent({showModal, handleCloseModal, selectedEvent}) {
    return ( 
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header className="bg-gray-900 text-white" closeButton>
                <Modal.Title>{selectedEvent?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <strong>Data:</strong> {selectedEvent?.start?.toLocaleDateString()}<br/>
            <strong>Local:</strong> {selectedEvent?.extendedProps?.local || "Sem local"}<br/>
            <strong>Convidados:</strong> {selectedEvent?.extendedProps?.guests || "Sem convidados"}<br/>
            <strong>Descrição:</strong> {selectedEvent?.extendedProps?.description || "Sem descri��o"}<br/>
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