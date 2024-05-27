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
import { convertToMetaUrl } from '../../../../utils/convertMetaUrl';
import { GetAreaById, UpdateAreaById } from '../../../../services/AreaApi';
import RichText from '../../../RichText';

const sampleMenu = {
    'name_en': 'North Vietnam',
    'name_vi': 'Miền Bắc',
    'url': '/destination/north-vietnam',
    'image': 'https://vietnam.travel/sites/default/files/styles/top_banner/public/2023-02/shutterstock_1900070254_1.jpg?itok=XkGlqHC7',
    'content': `<p>Editor’s Note:&nbsp;<em>A version of this story appears in CNN’s Meanwhile in the Middle East newsletter, a three-times-a-week look inside the region’s biggest stories.&nbsp;</em><a href="https://www.cnn.com/newsletters/meanwhile-in-middle-east?source=nl-acq_article" rel="noopener noreferrer" target="_blank" style="color: inherit;"><em>Sign up here.</em></a></p><p><strong>Beirut, LebanonCNN&nbsp;—&nbsp;</strong></p><p>The scope of&nbsp;<a href="https://www.cnn.com/middleeast/live-news/israel-iran-gaza-conflict-news-04-19-24/index.html" rel="noopener noreferrer" target="_blank" style="color: var(--theme-paragraph__link-color);">Israel’s military response</a>&nbsp;to Iran’s first-ever direct attack on the country remains murky. Israeli officials have&nbsp;<a href="https://www.cnn.com/middleeast/live-news/israel-hamas-war-gaza-news-04-18-24/h_de4b078288862b3845cd890b97046b6a" rel="noopener noreferrer" target="_blank" style="color: var(--theme-paragraph__link-color);">yet to publicly acknowledge</a>&nbsp;responsibility for reported overnight explosions in parts of Iran on Friday. Tehran has&nbsp;<a href="https://www.cnn.com/2024/04/18/middleeast/isfahan-iran-explosion-intl-hnk" rel="noopener noreferrer" target="_blank" style="color: var(--theme-paragraph__link-color);">dismissed these</a>&nbsp;as attacks by “tiny drones” that were shot down by its air defense systems.</p><p>Iran may be downplaying what was likely to have been a significant but limited Israeli attack, but that seems to be secondary to the larger forces at play. What is plain to see is that both Iran and Israel are keen to wrap up the most&nbsp;<a href="https://www.cnn.com/2024/04/18/middleeast/iran-foreign-minister-israel-warning-intl-hnk/index.html" rel="noopener noreferrer" target="_blank" style="color: var(--theme-paragraph__link-color);">dangerous escalation</a>&nbsp;between the two regional powerhouses to date.</p><p><br></p><p><br></p><p><img src="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2147921496.jpg?q=w_1110,c_fill" alt="People walk on the streets and as they continue their daily lives after the news of the attacks in Isfahan, Iran on Friday."></p><p><br></p><p><br></p><p>shudsbvfhd</p>`,
    'id': 1
}

const EditForm = ({editModal, setEditModal, toggleOpen, id}) => {

    const [area, setArea] = useState({});
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [nav_url, setNavUrl] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(()=> {
        const fetchArea = async () => {
            try {
                setArea(await GetAreaById(id));
            } catch (error) {
                console.log('Error fetch area with id:', error);
            }
        }

        fetchArea();

        if (Object.keys(area).length === 0) {
            setArea(sampleMenu);
        }

        setNavName_en(area.name_en)
        setNavName_vi(area.name_vi)
        setNavUrl(area.url)
        setContent(area.content)
        setImgSrc(area.image)

    }, [area]);

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


    const updateNavNameEn = (event) => {
        setNavName_en(event.target.value);
        setNavUrl('/destination/' + convertToMetaUrl(event.target.value))
        
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

    const handleEdit = async() => {
        const data = new FormData();
        data.append('navName_en', navName_en);
        data.append('navName_vi', navName_vi);
        data.append('nav_url', nav_url);
        data.append('content', content);
        data.append('image', image);

        try {
            const response = await UpdateAreaById(id, data);
            if (response.ok) {
                setEditModal(false);
                console.log('Successfully update area');
            }
        } catch (error) {
            console.log('Error PUTTING a new area:', error);
        }

        setEditModal(false);
    }

    return (
        Object.keys(area).length > 0 &&
        <MDBModal open={editModal} setOpen={setEditModal} tabIndex='-1'>
            <MDBModalDialog size='fullscreen'>
                <MDBModalContent className='px-5'>
                    <MDBModalHeader>
                        <MDBModalTitle>Edit area</MDBModalTitle>
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
                            <Form.Group className="mb-3" controlId="name_vi">
                                <Form.Label>Cover photo:</Form.Label>
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="user[image]"
                                        multiple={false}
                                        onChange={handleOnChangeImage}
                                        accept='image/*'
                                        hidden={true}
                                        id="img-upload"
                                    />
                                    <label htmlFor="img-upload" style={{borderRadius: "5px"}} className='main-box p-2 me-2'>Choose an image</label>
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
                        <MDBBtn onClick={handleEdit}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default EditForm;