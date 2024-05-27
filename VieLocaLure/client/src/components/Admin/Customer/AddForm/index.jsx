import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import { AddCustomer } from '../../../../services/AccountApi';



const AddForm = ({addModal, setAddModal, toggleOpenAdd}) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const updateName = (event) => {
        setName(event.target.value);
        
    }

    const updatePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleAdd = async() => {
        const data = {
            name,
            phoneNumber
        }
        try {
            const response = await AddCustomer(data);
            if (response.ok) {
                // setAddModal(false);
                console.log('Successfully add new customer');
            }
        } catch (error) {
            console.log('Error POSTING a new customer:', error);
        }

        setAddModal(false);
    }

    return (
        <MDBModal open={addModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add a new customer</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpenAdd}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <Form>
                            <Form.Group className="mb-3" controlId="name_en">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control onChange={updateName} type="text" value={name} placeholder="Enter customer's name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="name_vi">
                                <Form.Label>Phone number:</Form.Label>
                                <Form.Control onChange={updatePhoneNumber} value={phoneNumber} type="number" placeholder="Enter name in Vietnamese" />
                            </Form.Group>
                        </Form>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn onClick={handleAdd}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default AddForm;