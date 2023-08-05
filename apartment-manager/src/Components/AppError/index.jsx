import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../Redux/App/action";

const AppError = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.app);
  console.log("error: In AppError", error);

  const handleClose = () => dispatch(setError(""));

  return (
    <Modal
      show={!!error}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AppError;
