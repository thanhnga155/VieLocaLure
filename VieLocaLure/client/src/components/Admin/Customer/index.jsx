import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from 'react-bootstrap';
import AddForm from './AddForm';
import EditForm from './EditForm';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { DeleteCustomer, GetCustomer } from '../../../services/AccountApi';
import { cilChart } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const sampleCustomer = [
    {
        'id': 0,
        'name': 'Nguyen The Anh',
        'phoneNumber': '0934365550',
        'address': 'Ho Chi Minh City',
        'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
    },
    {
        'id': 1,
        'name': 'Nguyen Thi Thanh Nga',
        'phoneNumber': '0934365551',
        'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
    },
    {
        'id': 2,
        'name': 'Tran Duy Khoi',
        'phoneNumber': '0934365552',
        'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
    },
    {
        'id': 3,
        'name': 'Nguyen Thi Phuong Lan',
        'phoneNumber': '0934365553',
        'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
    },
    {
        'id': 4,
        'name': 'Le Thi Du Phi',
        'phoneNumber': '0934365554',
        'image': 'https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/1/25/le-quyen-1-1706149866286551549513-210-330-865-1581-crop-1706151560368791677656.jpg'
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
        field: 'name', 
        headerName: 'Full name', 
        width: 350, 
        renderHeader: () => (
            <strong>
            {'Full name'}
            </strong>
        ) 
    },
    {
        field: 'phoneNumber', 
        headerName: 'Phone number', 
        width: 150, 
        renderHeader: () => (
            <strong>
            {'Phone number'}
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
            <img height={100} src={params.value} alt="destination" />
        )
    },
];

const Customer = () => {
    const [customer, setCustomer] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({});
    const [query, setQuery] = useState('');
    const [matchCustomers, setMatchCustomers] = useState([]);
    
    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);


    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const customer = await GetCustomer();
                if (customer) {
                    setCustomer(customer);
                }
            }
            catch (e) {
                console.log('Error fetch customer data', e);
            }
        }

        fetchCustomer();

        if (customer.length === 0) {
            setCustomer(sampleCustomer);
        }

    }, [customer]);

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
                    await DeleteCustomer(id);
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
        const query = e.target.value;
        setQuery(query);

        const filteredCustomer = customer.filter((item) => {
            return item.phoneNumber.includes(query);
        });
        setMatchCustomers(filteredCustomer);
    }


    return (
        customer.length > 0 &&
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
                        Add a new customer
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
                        <Tooltip title="Statistics">
                            <button className='btn'>
                                <CIcon style={{width: '1.3em', height: '1.3rem'}} icon={cilChart} customClassName="nav-icon" />
                            </button>
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
                rows={query.length === 0 ? customer : matchCustomers}
                rowHeight={120}
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


export default Customer;