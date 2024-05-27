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
import { Col, Container, Form, Row } from 'react-bootstrap';
import { convertToMetaUrl } from '../../../../utils/convertMetaUrl';
import RichText from '../../../RichText';
import { Typeahead } from 'react-bootstrap-typeahead';
import { GetDestination } from '../../../../services/DestinationApi';
import { AddTour } from '../../../../services/TourApi';
import '../styles.scss';

const sampleDestination = [
    {
        id: 0,
        name_en: "Landmark 81",
        name_vi: "Landmark 81",
        province: {
            id: 0,
            name_en: "Ho Chi Minh City",
            name_vi: "Thành phố Hồ Chí Minh"
        },
    },
    {
        id: 1,
        name_en: "Ha Long Bay",
        name_vi: "Vịnh Hạ Long",
        province: {
            id: 1,
            name_en: "Quang Ninh",
            name_vi: "Quảng N"
        },
    }
]

const AddForm = ({addModal, setAddModal, toggleOpenAdd}) => {
    const [navName_en, setNavName_en] = useState('');
    const [navName_vi, setNavName_vi] = useState('');
    const [duration, setDuration] = useState('');
    const [departureDates, setDepartureDates] = useState([]);
    const [destination, setDestination] = useState([]);
    const [chosenDestination, setChosenDestination] = useState();
    const [chosenDeparture, setChosenDeparture] = useState();
    const [transport, setTransport] = useState('');
    const [nav_url, setNavUrl] = useState('');
    const [content, setContent] = useState('');
    const inputRef = [useRef(null), useRef(null), useRef(null)];
    const [adultPrice, setAdultPrice] = useState(0);
    const [childPrice, setChildPrice] = useState(0);
    const [infantPrice, setInfantPrice] = useState(0);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const destination = await GetDestination();
                if (destination) {
                    setDestination(destination);
                }
            }
            catch (e) {
                console.log('Error fetch destination data', e);
            }
        }

        fetchDestination();

        if (destination.length === 0) {
            setDestination(sampleDestination);
        }
    }, [destination]);

    const handleInputClick = (index) => {
        if (inputRef[index].current) {
            inputRef[index].current.select();
        }
    };


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

    const updateDuration = (event) => {
        setDuration(event.target.value);
    }

    const updateTransport = (event) => {
        setTransport(event.target.value);
    }

    const updateAdultPrice = (event, index) => {
        const newDepartureDates = [...departureDates];
        newDepartureDates[index].adultPrice = event.target.value;
        setDepartureDates(newDepartureDates);
        setAdultPrice(event.target.value);
    }

    const updateChildPrice = (event, index) => {
        const newDepartureDates = [...departureDates];
        newDepartureDates[index].childPrice = event.target.value;
        setDepartureDates(newDepartureDates);
        setChildPrice(event.target.value);
    }

    const updateInfantPrice = (event, index) => {
        const newDepartureDates = [...departureDates];
        newDepartureDates[index].infantPrice = event.target.value;
        setDepartureDates(newDepartureDates);
        setInfantPrice(event.target.value);
    }

    const updateDepartureDates = (event) => {
        setDepartureDates([
            ...departureDates,
            {
                date: event.target.value,
                adultPrice: adultPrice,
                childPrice: childPrice,
                infantPrice: infantPrice
            }
        ]);
    }

    const editDepartureDates = (event, index) => {
        const newDepartureDates = [...departureDates];
        newDepartureDates[index].date = event.target.value;
        setDepartureDates(newDepartureDates);
    };

    const handleRemoveDate = (index) => {
        const newDepartureDates = [...departureDates];
        newDepartureDates.splice(index, 1);
        setDepartureDates(newDepartureDates);
    };

    const handleTextChange = (text) => {
        setContent(text);
    }

    const handleAdd = async() => {
        const data = {
            title_en: navName_en,
            title_vi: navName_vi,
            url: nav_url,
            duration,
            transport,
            departure: chosenDeparture.id,
            destination: chosenDestination.id,
            schedule: departureDates,
            description: content
        };

        try {
            const response = await AddTour(data);
            if (response.ok) {
                setAddModal(false);
                console.log('Successfully add new tour');
            }
        } catch (error) {
            console.log('Error POSTING a new tour:', error);
        }

        setAddModal(false);
    }

    return (
        <MDBModal open={addModal} setOpen={setAddModal} tabIndex='-1'>
            <MDBModalDialog size='fullscreen'>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add a new tour</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpenAdd}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="name_en">
                                        <Form.Label>Title (en):</Form.Label>
                                        <Form.Control onChange={updateNavNameEn} type="text" value={navName_en} placeholder="Enter name in English" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="name_vi">
                                        <Form.Label>Title (vi):</Form.Label>
                                        <Form.Control onChange={updateNavNameVi} value={navName_vi} type="text" placeholder="Enter name in Vietnamese" />
                                    </Form.Group>                            
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="nav_url">
                                        <Form.Label>Url:</Form.Label>
                                        <Form.Control onChange={updateNavUrl} value={nav_url} type="text" placeholder="Enter URL" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Group className="mb-3" controlId="nav_url">
                                        <Form.Label>Departure:</Form.Label>
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="name_en"
                                            onChange={setChosenDeparture}
                                            options={destination}
                                            placeholder="Choose a departure"
                                            selected={chosenDeparture}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Group className="mb-3" controlId="nav_url">
                                        <Form.Label>Destination:</Form.Label>
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="name_en"
                                            onChange={setChosenDestination}
                                            options={destination}
                                            placeholder="Choose a destination"
                                            selected={chosenDestination}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Group className="mb-3" controlId="duration">
                                        <Form.Label>Duration:</Form.Label>
                                        <Form.Control onChange={updateDuration} value={duration} type="text" placeholder="Enter duration" />
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Group className="mb-3" controlId="transport">
                                        <Form.Label>Transport:</Form.Label>
                                        <Form.Control onChange={updateTransport} value={transport} type="text" placeholder="Enter transport" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="departure-date">
                                        <Form.Label>Departure dates:</Form.Label>
                                        {
                                            departureDates.length === 0 ? 
                                            <>
                                                <p className='ms-3' style={{fontStyle: 'italic'}}>No departures created!</p>
                                                <ul>
                                                    <li>
                                                        <Form.Control className='w-25' onChange={updateDepartureDates} value="" type="date"/>
                                                    </li>
                                                </ul>
                                            </>
                                            :
                                            <ol>
                                                {
                                                    departureDates.map((data, index) => (
                                                        <li className='my-4 departures-data'>
                                                            <div className='d-flex align-items-center departure-dates'>
                                                                <Form.Control 
                                                                    value={data.date} 
                                                                    onChange={(event) => editDepartureDates(event, index)} 
                                                                    className='w-25' 
                                                                    type="date" 
                                                                    placeholder="Enter price ($)" 
                                                                />
                                                                <button 
                                                                    className='btn btn-danger ms-3 edit-departure'
                                                                    onClick={() => handleRemoveDate(index)}
                                                                    type='button'    
                                                                > <i className="fa fa-trash"></i> </button>
                                                            </div>

                                                            <Container className='mt-1'>
                                                                <Row>
                                                                    <Col sm={4} xs={12}>
                                                                        <Form.Group className="mb-3" controlId="a-price">
                                                                            <Form.Label>Adult price:</Form.Label>
                                                                            <Form.Control 
                                                                                onChange={(event) => updateAdultPrice(event, index)} 
                                                                                value={data.adultPrice} 
                                                                                type="number" 
                                                                                step={0.01} 
                                                                                placeholder="Enter price ($)"
                                                                                ref={inputRef[0]}
                                                                                onClick={() => handleInputClick(0)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col sm={4} xs={12}>
                                                                        <Form.Group className="mb-3" controlId="c-price">
                                                                            <Form.Label>Child price:</Form.Label>
                                                                            <Form.Control 
                                                                                onChange={(event) => updateChildPrice(event, index)} 
                                                                                value={data.childPrice} 
                                                                                type="number" 
                                                                                step={0.01} 
                                                                                placeholder="Enter price ($)"
                                                                                ref={inputRef[1]}
                                                                                onClick={() => handleInputClick(1)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col sm={4} xs={12}>
                                                                        <Form.Group className="mb-3" controlId="i-price">
                                                                            <Form.Label>Infant price:</Form.Label>
                                                                            <Form.Control 
                                                                                onChange={(event) => updateInfantPrice(event, index)} 
                                                                                value={data.infantPrice} 
                                                                                type="number" 
                                                                                step={0.01} 
                                                                                placeholder="Enter price ($)"
                                                                                ref={inputRef[2]}
                                                                                onClick={() => handleInputClick(2)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </li>
                                                    ))
                                                }
                                                <li className='mt-4'>
                                                    <Form.Control className='w-25' value="" onChange={updateDepartureDates} type="date" />
                                                </li>
                                            </ol>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="nav_url">
                                    <Form.Label>Description:</Form.Label>
                                    <RichText onTextChange={handleTextChange} content={content}/>
                                </Form.Group>
                            </Row>
                        </Container>

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