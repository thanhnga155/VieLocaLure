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
import { GetPage } from '../../../../services/PageApi';
import { Typeahead } from 'react-bootstrap-typeahead';
import { UpdateMenuItemById } from '../../../../services/MenuApi';

var samplePage = [
    {id: 1, name_en: 'Area'},
    {id: 2, name_en: 'North Vietnam'},
    {id: 3, name_en: 'South Vietnam'},
    {id: 4, name_en: 'Central Vietnam'},
    {id: 5, name_en: 'Tour'},
    {id: 6, name_en: 'Contact'},
    {id: 7, name_en: 'Destination'},
];

const EditMenuForm = ({editModal, setEditModal, toggleOpen, id}) => {

    const [pageId, setPageId] = useState();
    const [page, setPage] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                setPage(await GetPage());
            } catch (error) {
                console.log('Error fetching pages:', error);
            }
        }

        fetchPages();

        if (page.length === 0) {
            setPage(samplePage);
        }

    }, [page]);


    const handleEdit = async() => {
        const data = {
            pageId
        }
        try {
            const response = await UpdateMenuItemById(id, data);
            if (response.ok) {
                setEditModal(false);
                console.log('Successfully update menu');
            }
        } catch (error) {
            console.log('Error PUTTING a new menu item:', error);
        }

        setEditModal(false);
    }

    return (
        page.length > 0 &&
        <MDBModal open={editModal} setOpen={setEditModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Edit Navbar</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <Form>
                            <Form.Label>Select menu:</Form.Label>
                            <Typeahead
                                onChange={(selected) => {
                                    if (selected.length > 0) {
                                        setPageId(selected[0].id);
                                    }
                                }}
                                options={page}
                                labelKey='name_en'
                            />
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

export default EditMenuForm;