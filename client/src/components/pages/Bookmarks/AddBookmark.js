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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // CustomInput,
  // Label,
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

const year = new Date().getFullYear();
const years = Array.from(new Array(50), (val, index) => year - index);

const AddBookmark = () => {
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Years');
  const [formDetails, setFormDetails] = useState({
    bookmarkUrl: '',
    year: null,
  });

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Button color='secondary' onClick={e => setModal(!modal)}>
        <i className='fas fa-plus text-dark'></i>
      </Button>

      <Modal toggle={setModal} isOpen={modal}>
        <ModalHeader>
          <h2>Add Bookmark</h2>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                value={formDetails.bookmarkUrl}
                onChange={e => setFormDetails({ bookmarkUrl: e.target.value })}
                placeholder='Bookmark URL'
              />
            </FormGroup>
            <FormGroup>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className='btn-dark' caret>
                  {dropdownValue}
                </DropdownToggle>
                <DropdownMenu>
                  <Scrollbars style={{ height: 100 }}>
                    {years.map(year => (
                      <DropdownItem
                        onClick={e => {
                          setFormDetails({
                            year: parseInt(e.target.textContent, 10),
                          });
                          setDropdownValue(e.target.textContent);
                        }}
                      >
                        {year}
                      </DropdownItem>
                    ))}
                  </Scrollbars>
                </DropdownMenu>
              </Dropdown>
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

export default AddBookmark;
