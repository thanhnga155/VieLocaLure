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
import { AddProvince, GetProvince } from '../../../../services/ProvinceApi';

const provinceSample = [
    {
        'name_en': 'Ha Noi',
        'name_vi': 'Hà Nội',
        'id': 1,
        'area': {
            'id': 1,
            'name_en': 'North Vietnam'
        }
    },
    {
        'name_en': 'Hue',
        'name_vi': 'Huế',
        'id': 2,
        'area': {
            'id': 2,
            'name_en': 'Central Vietnam'
        }
    },
    {
        'name_en': 'Ho Chi Minh City',
        'name_vi': 'Thành phố Hồ Chí Minh',
        'id': 3,
        'area': {
            'id': 3,
            'name_en': 'South Vietnam'
        }
    }
];

const AddForm = ({addModal, setAddModal, toggleOpenAdd}) => {
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [selectedProvince, setSelectedProvince] = useState();
    const [province, setProvince] = useState([]);

    useEffect(() => {
        const fetchProvince = async() => {
            try {
                setProvince(await GetProvince());
            } catch (error) {
                console.log('Error fetch province data:', error);
            }
        }

        fetchProvince();

        if (province.length === 0) {
            setProvince(provinceSample);
        }
    }, [province]);

    const updateProvince = (event) => {
        setSelectedProvince(event.target.value);
    }

    const updateNavNameEn = (event) => {
        setNavName_en(event.target.value);
        
    }

    const updateNavNameVi = (event) => {
        setNavName_vi(event.target.value);
    }

    const handleAdd = async() => {
        const data = {
            navName_en,
            navName_vi,
            province: selectedProvince
        }
        try {
            const response = await AddProvince(data);
            if (response.ok) {
                // setAddModal(false);
                console.log('Successfully add new province');
            }
        } catch (error) {
            console.log('Error POSTING a new province:', error);
        }

        setAddModal(false);
    }

    return (
        <MDBModal open={addModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add a new nav bar</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpenAdd}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <Form>
                            <Form.Group className="mb-3" controlId="name_en">
                                <Form.Label>Name (en):</Form.Label>
                                <Form.Control onChange={updateNavNameEn} type="text" value={navName_en} placeholder="Enter name in English" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="name_vi">
                                <Form.Label>Name (vi):</Form.Label>
                                <Form.Control onChange={updateNavNameVi} value={navName_vi} type="text" placeholder="Enter name in Vietnamese" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nav_url">
                                <Form.Label>Province:</Form.Label>
                                <Form.Select onChange={updateProvince} value={selectedProvince}>
                                    {
                                        province.map(item => (
                                            <option onSel={updateProvince} selected={selectedProvince === item.id} value={item.id}>{item.name_en}</option>
                                        ))
                                    }
                                </Form.Select>
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