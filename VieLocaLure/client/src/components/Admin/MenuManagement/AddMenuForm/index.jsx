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
import { convertToMetaUrl } from '../../../../utils/convertMetaUrl';
import { AddMenuItem } from '../../../../services/MenuApi';
import { Typeahead } from 'react-bootstrap-typeahead';
import { GetPage } from '../../../../services/PageApi';

var samplePage = [
    {id: 1, name_en: 'Area'},
    {id: 2, name_en: 'North Vietnam'},
    {id: 3, name_en: 'South Vietnam'},
    {id: 4, name_en: 'Central Vietnam'},
    {id: 5, name_en: 'Tour'},
    {id: 6, name_en: 'Contact'},
    {id: 7, name_en: 'Destination'},
];

const AddMenuForm = ({addModal, setAddModal, toggleOpenAdd, id}) => {
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

    const handleAdd = async() => {
        let level = 1, parentId = null;
        if (id.length === 1) {
            level = 2;
            parentId = id[0]
        }

        const data = {
            level,
            pageId,
            parentId
        }
        console.log(data);
        try {
            const response = await AddMenuItem(data);
            if (response.ok) {
                setAddModal(false);
                console.log('Successfully add new menu');
            }
        } catch (error) {
            console.log('Error POSTING a new menu item:', error);
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
                        <MDBBtn onClick={handleAdd}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default AddMenuForm;