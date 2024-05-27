import React, { useEffect, useRef, useState } from 'react';
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
import { GetProvince } from '../../../../services/ProvinceApi';
import { AddDestination } from '../../../../services/DestinationApi';
import { Typeahead } from 'react-bootstrap-typeahead';

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
    const [images, setImages] = useState([]);
    const [imgSrcs, setImgSrcs] = useState([]);

    const fileInputRef = useRef(null);

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

    const handleOnChangeImage = () => {
        const files = fileInputRef.current.files;
        const newImages = [...images];
        const newImgSrcs = [...imgSrcs];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                newImgSrcs.push(reader.result);
                setImgSrcs(newImgSrcs);
            };

            if (file) {
                reader.readAsDataURL(file);
                newImages.push(file);
            }
        }

        setImages(newImages);
    };

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
        const data = new FormData();
        data.append('navName_en', navName_en);
        data.append('navName_vi', navName_vi);
        data.append('province', selectedProvince);
        
        for (let i = 0; i < images.length; i++) {
            data.append('image[]', images[i]);
        }

        try {
            const response = await AddDestination(data);
            if (response.ok) {
                setAddModal(false);
                console.log('Successfully add new destination');
            }
        } catch (error) {
            console.log('Error POSTING a new destination:', error);
        }

        setAddModal(false);
    }

    
    const handleDeleteImage = (index) => {
        const newImages = [...images];
        const newImgSrcs = [...imgSrcs];

        newImages.splice(index, 1);
        newImgSrcs.splice(index, 1);

        setImages(newImages);
        setImgSrcs(newImgSrcs);
    };

    return (
        <MDBModal open={addModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog size='lg'>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add a new destination</MDBModalTitle>
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

                            <Form.Group className="mb-3" controlId="name_vi">
                                <Form.Label>Images:</Form.Label>
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="upload"
                                        multiple={true}
                                        onChange={handleOnChangeImage}
                                        accept='image/*'
                                        hidden={true}
                                        id="img-upload2"
                                    />
                                    {/* {imgSrc && <img width={"300px"} src={imgSrc} alt="Uploaded" />} */}
                                    <div className="container">
                                        <div className="row d-flex align-items-center">
                                            {imgSrcs.map((src, index) => (
                                                <div key={index} className="col-md-4 mb-3 position-relative">
                                                    <img width={"100%"} height={"200px"} src={src} alt={`Uploaded ${index}`} />
                                                    <button 
                                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" 
                                                        onClick={() => handleDeleteImage(index)}
                                                        type='button'>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <label htmlFor="img-upload2" style={{borderRadius: "100px", height: "40px", width: "40px"}} className='main-box p-2 me-2 d-flex justify-content-center align-items-center'>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nav_url">
                                <Form.Label>Province:</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name_en"
                                    onChange={setSelectedProvince}
                                    options={province}
                                    placeholder="Choose a province"
                                    selected={selectedProvince}
                                />
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