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
import { GetProvince, GetProvinceById, UpdateProvinceById } from '../../../../services/ProvinceApi';
import { GetDestinationById } from '../../../../services/DestinationApi';

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

const destinationSample = {
    id: 0,
    name_en: "Landmark 81",
    name_vi: "Landmark 81",
    province: {
        id: 0,
        name_en: "Ho Chi Minh City",
        name_vi: "Thành phố Hồ Chí Minh"
    },
};

const EditForm = ({editModal, setEditModal, toggleOpen, id}) => {

    const [destination, setDestination] = useState({});
    const [province, setProvince] = useState([]);
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [selectedProvince, setSelectedProvince] = useState();

    useEffect(()=> {
        const fetchDestination = async () => {
            try {
                const data = await GetDestinationById(id);
                const province = await GetProvinceById(data.provinceId);
                data.province = province;
                setDestination(data);
            } catch (error) {
                console.log('Error fetch destination with id:', error);
            }
        }

        fetchDestination();

        if (Object.keys(destination).length === 0) {
            setDestination(destinationSample);
        }

        setNavName_en(destination.name_en)
        setNavName_vi(destination.name_vi)

    }, [destination]);

    useEffect(() => {
        if (Object.keys(destination).length !== 0) {
            setSelectedProvince(destination.province.id);
        }
    }, [destination]);

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
            province: selectedProvince
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
                                        province.map(item => (
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