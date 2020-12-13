import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  // CustomInput,
  // Label,
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { useState } from 'react';

const AddSubject = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button color='dark' onClick={e => setModal(!modal)}>
        <i className='fas fa-plus'></i>
      </Button>

      <Modal toggle={setModal} isOpen={modal}>
        <ModalHeader>
          <h2>Add Subject</h2>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input placeholder='Enter Subject Name' />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={e => setModal(!modal)} color='dark'>
            Cancel
          </Button>
          <Button color='light'>Add</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddSubject;
