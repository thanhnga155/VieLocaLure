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
import { GetCustomerById, UpdateCustomerById } from '../../../../services/AccountApi';

const sampleCustomer = {
    'id': 0,
    'name': 'Nguyen The Anh',
    'phoneNumber': '0934365550',
    'address': 'Ho Chi Minh City',
    'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
}

const EditForm = ({editModal, setEditModal, toggleOpen, id}) => {

    const [customer, setCustomer] = useState({});
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(()=> {
        const fetchCustomer = async () => {
            try {
                const data = await GetCustomerById(id);
                setCustomer(data);
            } catch (error) {
                console.log('Error fetch customer with id:', error);
            }
        }

        fetchCustomer();

        if (Object.keys(customer).length === 0) {
            setCustomer(sampleCustomer);
        }

        setName(customer.name);
        setPhoneNumber(customer.phoneNumber);

    }, [customer]);


    const updateName = (event) => {
        setName(event.target.value);
        
    }

    const updatePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleEdit = async() => {
        const data = {
            name,
            phoneNumber
        }
        try {
            const response = await UpdateCustomerById(id, data);
            if (response.ok) {
                setEditModal(false);
                console.log('Successfully update customer');
            }
        } catch (error) {
            console.log('Error PUTTING a new customer:', error);
        }

        setEditModal(false);
    }

    return (
        Object.keys(customer).length > 0 &&
        <MDBModal open={editModal} setOpen={setEditModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Edit Customer</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
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
                        <MDBBtn onClick={handleEdit}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default EditForm;