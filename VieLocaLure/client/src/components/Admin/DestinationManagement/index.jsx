import React, { useEffect, useState } from 'react'
import { DeleteDestination, GetDestination } from '../../../services/DestinationApi';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from 'react-bootstrap';
import EditForm from './EditForm';
import AddForm from './AddForm';
import { MDBBtn, MDBIcon, MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';

const sampleDestination = [
    {
        id: 0,
        name_en: "Landmark 81",
        name_vi: "Landmark 81",
        image: [
            'https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg',
            'https://ik.imagekit.io/tvlk/blog/2024/01/landmark-81-cover.jpg?tr=dpr-2.625,h-320,q-25,w-320',
        ],
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
        image: [
            'https://statics.vinpearl.com/du-lich-vinh-Ha-Long-hinh-anh1_1625911963.jpg',
            'https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-vinh-ha-long-1.jpg?tr=dpr-2,w-675',
        ],
        province: {
            id: 1,
            name_en: "Quang Ninh",
            name_vi: "Quảng Ninh"
        },
    }
]

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
        field: 'name_en', 
        headerName: 'Name', 
        width: 350, 
        renderHeader: () => (
            <strong>
            {'Name '}
            </strong>
        ) 
    },
    {
        field: 'image', 
        headerName: 'Image', 
        width: 300, 
        renderHeader: () => (
            <strong>
            {'Image '}
            </strong>
        ),
        renderCell: (params) => (
            <img width={100} height={100} src={params.value[0]} alt="destination" />
        )
    },
    {
        field: 'province', 
        headerName: 'Province', 
        width: 200, 
        renderHeader: () => (
            <strong>
            {'Province'}
            </strong>
        ),
        valueGetter: (province) => {
            return province.name_en
        }
    },
];

const DestinationManagement = () => {
    const [destination, setDestination] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({});
    const [matchDestinations, setMatchDestinations] = useState();
    const [query, setQuery] = useState('');
    
    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);


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

    const handleRowSelected = (ids) => {
        setNumSelected(ids.length);
        setRowIdSelected(ids);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setQuery(query);

        const filterDestinations = destination.filter((item) => {
            return item.name_en.toLowerCase().includes(query);
        });
        setMatchDestinations(filterDestinations);
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
                    await DeleteDestination(id);
                } catch (error) {
                    console.log('Error deleting menu item');
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


    return (
        destination.length > 0 &&
        <div style={{ marginBottom: '10px', width: '100%', position: 'relative' }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
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
                        Add a new destination
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
                        </>
                    :
                        <MDBInputGroup className='justify-content-end'>
                            <MDBInput placeholder='Search' onKeyUp={handleSearch}/>
                            <MDBBtn rippleColor='dark' style={{"height": "fit-content"}}>
                                <MDBIcon icon='search' />
                            </MDBBtn>
                        </MDBInputGroup>
                }
            </Toolbar>
         
            <DataGrid
                rows={query.length === 0 ? destination : matchDestinations}                        
                rowHeight={150}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
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

export default DestinationManagement;