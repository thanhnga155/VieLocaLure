import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from 'react-bootstrap';
import EditForm from './EditForm';
import AddForm from './AddForm';
import { DeleteTour, GetTour } from '../../../services/TourApi';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const sampleTour = [
    {
        'title': 'Visit of the Mekong 3 days from Ho Chi Minh',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '09/15/2024',
            '10/03/2024'
        ],
        'id': 0,
        'url': '/tour/visit-of-the-mekong-3-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 1,
        'url': '/tour/visit-of-the-mekong-4-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 2,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 3,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 4,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 5,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    },
    {
        'title': 'Ho Chi Minh City Tour PM',
        'image': 'https://images.ctfassets.net/bth3mlrehms2/6X0Vw0vJBPMbAvK8XZqJMV/65e38d3d02a8f23fcc090bb80d01744c/iStock-481711830.jpg?w=3593&h=2771&fl=progressive&q=50&fm=jpg',
        'destination': 'Ho Chi Minh City',
        'duration': 'Half Day (Daily Departure)',
        'transport': 'Van',
        'description': 'As the most vibrant city in the country, Ho Chi Minh City is truly an...',
        'price': '820,000',
        'schedule': [
            '09/03/2024',
            '10/03/2024'
        ],
        'id': 6,
        'url': '/tour/visit-of-the-mekong-5-days-from-ho-chi-minh'
    },
];

const columns = [
    {
        field: 'id', 
        headerName: '#', 
        width: 100, 
        align: 'center', 
        headerAlign: 'center', 
        renderHeader: () => (
            <strong>
            {'#'}
            </strong>
        ),
    },
    {
        field: 'title', 
        headerName: 'Tour name', 
        width: 400, 
        renderHeader: () => (
            <strong>
            {'Title '}
            </strong>
        ) 
    },
    {
        field: 'destination', 
        headerName: 'Place', 
        width: 250, 
        renderHeader: () => (
            <strong>
            {'Place '}
            </strong>
        ) 
    },
    {
        field: 'schedule', 
        headerName: 'Departure dates', 
        align: 'center',
        width: 150, 
        renderHeader: () => (
            <strong>
            {'Departure quantity'}
            </strong>
        ) ,
        renderCell: (params) => (
            params.value.length
        ) 
    },
];

const Tour = () => {
    const [tour, setTour] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({});
    const [query, setQuery] = useState('');
    const [matchTours, setMatchTours] = useState([]);
    
    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);


    useEffect(() => {
        const fetchTour = async () => {
            try {
                const tour = await GetTour();
                if (tour) {
                    setTour(tour);
                }
            }
            catch (e) {
                console.log('Error fetch destination data', e);
            }
        }

        fetchTour();

        if (tour.length === 0) {
            setTour(sampleTour);
        }

    }, [tour]);

    const handleRowSelected = (ids) => {
        setNumSelected(ids.length);
        setRowIdSelected(ids);
    }


    const onEdit = () => {
        if (numSelected > 1) {
            setAlert({
                'message': 'You can only edit 1 row once!',
                'type': 'warning'
            })
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
            return ;
        }
        setEditModal(true);
    }

    const onDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete the selected?');
        if (confirmed) {
            rowIdSelected.map(async (id) => {
                try {
                    await DeleteTour(id);
                } catch (error) {
                    console.log('Error deleting tour');
                }
            });
                
            setAlert({
                'message': 'All selected item have been deleted!',
                'type': 'success'
            })

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                window.location.reload();
            }, 2000)
        }
    }

    const onAdd = () => {
        setAddModal(true);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setQuery(query);

        const filteredTours = tour.filter((item) => {
            return item.title.toLowerCase().includes(query);
        });
        setMatchTours(filteredTours);
    }


    return (
        tour.length > 0 &&
        <div style={{ marginBottom: 10, width: '100%', position: 'relative' }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
                className='d-flex justify-content-between'
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    >
                        <Tooltip title="Add">
                            <IconButton>
                                <AddIcon onClick={onAdd} />
                            </IconButton>
                        </Tooltip>
                        Add a new tour
                    </Typography>
                )}

                {
                    numSelected > 0 ? 
                    <>
                        <Tooltip title="Edit">
                            <IconButton className='me-3'>
                                <EditIcon onClick={onEdit} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon onClick={onDelete}/>
                            </IconButton>
                        </Tooltip>
                    </> :
                    <>
                        <MDBInputGroup className='justify-content-end'>
                            <MDBInput placeholder='Search' onKeyUp={handleSearch}/>
                            <MDBBtn rippleColor='dark' style={{"height": "fit-content"}}>
                                <MDBIcon icon='search' />
                            </MDBBtn>
                        </MDBInputGroup>
                    </>
                }
            </Toolbar>
            <DataGrid
                rows={query.length === 0 ? tour : matchTours}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelected}
            />
            {
                showAlert === true && alert.type &&
                    <Alert style={{position: 'absolute', top: '20%', right: '5%'}} variant={alert.type} onClose={() => setShowAlert(false)} dismissible>
                        {alert.message}
                    </Alert>
            }

            <EditForm editModal={editModal} setEditModal={setEditModal} toggleOpen={toggleOpen} id={rowIdSelected}/>
            <AddForm addModal={addModal} setAddModal={setAddModal} toggleOpenAdd={toggleOpenAdd}/>
        </div>
    )
}


export default Tour;