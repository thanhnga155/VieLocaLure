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
import { GetArea, GetAreaById } from '../../../../services/AreaApi';
import { GetProvinceById, UpdateProvinceById } from '../../../../services/ProvinceApi';

const sampleProvince = {
    'name_en': 'Hue',
    'name_vi': 'Huế',
    'id': 2,
    'area': {
        'id': 2,
        'name_en': 'Central Vietnam'
    }
}

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

const EditForm = ({editModal, setEditModal, toggleOpen, id}) => {

    const [province, setProvince] = useState({});
    const [area, setArea] = useState([]);
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [selectedProvince, setSelectedProvince] = useState();

    useEffect(()=> {
        const fetchProvince = async () => {
            try {
                const data = await GetProvinceById(id);
                const area = await GetAreaById(data.area_id);
                data.area = area;
                setProvince(data);
            } catch (error) {
                console.log('Error fetch province with id:', error);
            }
        }

        fetchProvince();

        if (Object.keys(province).length === 0) {
            setProvince(sampleProvince);
        }

        setNavName_en(province.name_en)
        setNavName_vi(province.name_vi)

    }, [province]);

    useEffect(() => {
        if (Object.keys(province).length !== 0) {
            setSelectedProvince(province.area.id);
        }
    }, [province]);

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


    const updateNavNameEn = (event) => {
        setNavName_en(event.target.value);
        
    }

    const updateNavNameVi = (event) => {
        setNavName_vi(event.target.value);
    }

    const updateProvince = (event) => {
        setSelectedProvince(event.target.value);
    }

    const handleEdit = async() => {
        const data = {
            navName_en,
            navName_vi,
            area: selectedProvince
        }
        try {
            const response = await UpdateProvinceById(id, data);
            if (response.ok) {
                // setAddModal(false);
                console.log('Successfully update provicne');
            }
        } catch (error) {
            console.log('Error PUTTING a new province:', error);
        }

        setEditModal(false);
    }

    return (
        Object.keys(province).length > 0 &&
        <MDBModal open={editModal} setOpen={setEditModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Edit Province</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
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
                                        area.map(item => (
                                            <option onSel={updateProvince} selected={selectedProvince === item.id} value={item.id}>{item.name_en}</option>
                                        ))
                                    }
                                </Form.Select>
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