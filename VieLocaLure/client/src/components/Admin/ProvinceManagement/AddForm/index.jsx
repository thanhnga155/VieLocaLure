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
import { GetArea } from '../../../../services/AreaApi';
import { AddProvince } from '../../../../services/ProvinceApi';

const areaSample = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'url': '/destination/north-vietnam',
        'id': 1
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'url': '/destination/central-vietnam',
        'id': 2
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'url': '/destination/south-vietnam',
        'id': 3
    }
];

const AddForm = ({addModal, setAddModal, toggleOpenAdd}) => {
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [selectedProvince, setSelectedProvince] = useState();
    const [area, setArea] = useState([]);

    useEffect(() => {
        const fetchArea = async() => {
            try {
                setArea(await GetArea());
            } catch (error) {
                console.log('Error fetch area data:', error);
            }
        }

        fetchArea();

        if (area.length === 0) {
            setArea(areaSample);
        }
    }, [area]);

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
            area: selectedProvince
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
                                <Form.Label>Area:</Form.Label>
                                <Form.Select onChange={updateProvince} value={selectedProvince}>
                                    {
                                        area.map(item => (
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