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
        field: 'province', 
        headerName: 'Province', 
        width: 400, 
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
                        Add a new destination
                    </Typography>
                )}

                {
                    numSelected > 0 && 
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
                }
            </Toolbar>
            <DataGrid
                rows={destination}
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