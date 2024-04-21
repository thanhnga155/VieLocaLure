import React, { useRef, useState } from 'react';
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
import { convertToMetaUrl } from '../../../../utils/convertMetaUrl';
import { AddArea } from '../../../../services/AreaApi';
import RichText from '../../../RichText';

const AddForm = ({addModal, setAddModal, toggleOpenAdd}) => {
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [nav_url, setNavUrl] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const fileInputRef = useRef(null);


    const updateNavNameEn = (event) => {
        setNavName_en(event.target.value);
        setNavUrl(convertToMetaUrl(event.target.value))
        
    }

    const updateNavNameVi = (event) => {
        setNavName_vi(event.target.value);
    }

    const updateNavUrl = (event) => {
        setNavUrl(event.target.value);
    }

    const handleTextChange = (text) => {
        setContent(text);
    }

    const handleOnChangeImage = () => {
        const file = fileInputRef.current.files[0];
        const reader = new FileReader();
            
        reader.onloadend = () => {
            setImgSrc(reader.result);
        };
    
        if (file) {
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    const handleAdd = async() => {
        const data = new FormData();
        data.append('navName_en', navName_en);
        data.append('navName_vi', navName_vi);
        data.append('nav_url', nav_url);
        data.append('content', content);
        data.append('image', image);

        try {
            const response = await AddArea(data);
            if (response.ok) {
                // setAddModal(false);
                console.log('Successfully add new area');
            }
        } catch (error) {
            console.log('Error POSTING a new area:', error);
        }

        setAddModal(false);
    }

    return (
        <MDBModal open={addModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog size='fullscreen'>
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
                            <Form.Group className="mb-3" controlId="name_vi">
                                <Form.Label>Cover photo:</Form.Label>
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="upload"
                                        multiple={false}
                                        onChange={handleOnChangeImage}
                                        accept='image/*'
                                        hidden={true}
                                        id="img-upload1"
                                    />
                                    <label htmlFor="img-upload1" style={{borderRadius: "5px"}} className='main-box p-2 me-2'>Choose an image</label>
                                    {imgSrc && <img width={"300px"} src={imgSrc} alt="Uploaded" />}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nav_url">
                                <Form.Label>Url:</Form.Label>
                                <Form.Control onChange={updateNavUrl} value={nav_url} type="text" placeholder="Enter URL" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nav_url">
                                <Form.Label>Content:</Form.Label>
                                <RichText onTextChange={handleTextChange} content={content}/>
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