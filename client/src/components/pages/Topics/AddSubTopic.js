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
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { useState } from 'react';

const AddSubTopic = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button color='secondary' onClick={e => setModal(!modal)}>
        <i className='fas fa-plus text-dark'></i>
      </Button>

      <Modal toggle={setModal} isOpen={modal}>
        <ModalHeader>
          <h2>Add Subtopic</h2>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input placeholder='Enter Topic Name' />
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

export default AddSubTopic;
