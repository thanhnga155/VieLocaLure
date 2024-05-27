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
import { DeleteProvince, GetProvince } from '../../../services/ProvinceApi';
import { MDBBtn, MDBIcon, MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';

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
        width: 400, 
        renderHeader: () => (
            <strong>
            {'Name '}
            </strong>
        ) 
    },
    {
        field: 'area', 
        headerName: 'Area', 
        width: 400, 
        renderHeader: () => (
            <strong>
            {'Area'}
            </strong>
        ),
        valueGetter: (area) => {
            return area.name_en
        }
    },
];

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


const ProvinceManagement = () => {

    const [province, setProvince] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({});
    const [query, setQuery] = useState('');
    const [matchProvince, setMatchProvince] = useState([]);

    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);


    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const province = await GetProvince();
                if (province) {
                    setProvince(province);
                }
            }
            catch (e) {
                console.log('Error fetch province data', e);
            }
        }

        fetchProvince();

        if (province.length === 0) {
            setProvince(provinceSample);
        }

        

    }, [province]);

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
                    await DeleteProvince(id);
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

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setQuery(query);

        const filteredProvince = province.filter((item) => {
            return item.name_en.toLowerCase().includes(query);
        });
        setMatchProvince(filteredProvince);
    }
    

    return (
        province.length > 0 &&
        <div style={{ height: 370, width: '100%', position: 'relative' }}>
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
                        Add a new province
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
                rows={query.length === 0 ? province : matchProvince}
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

export default ProvinceManagement;