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
import { DeleteArea, GetArea } from '../../../services/AreaApi';

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
        width: 250, 
        renderHeader: () => (
            <strong>
            {'Name '}
            </strong>
        ) 
    },
    {
        field: 'image', 
        headerName: 'Cover Photo', 
        width: 300,
        renderHeader: () => (
            <strong>
            {'Cover Photo '}
            </strong>
        ),
        renderCell: (params) => (
            <img width={100} height={100} src={params.row.image} alt="" />
        )
    },
    {
        field: 'url', 
        headerName: 'Url', 
        width: 300, 
        renderHeader: () => (
            <strong>
            {'Url '}
            </strong>
        ), 
    },
];

const areaSample = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'image': 'https://static.vinwonders.com/production/North-Vietnam-itinerary-banner.jpg',
        'url': '/destination/north-vietnam',
        'id': 1
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'image': 'https://vinadmz.com/wp-content/uploads/2017/02/GOLDEN-BRIDGE-1024x678.jpg',
        'url': '/destination/central-vietnam',
        'id': 2
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'image': 'https://media.vietravel.com/images/NewsPicture/Ho-Chi-Minh-City_4.jpg',
        'url': '/destination/south-vietnam',
        'id': 3
    }
];

const dataPreparation = (data) => {
    if (data.length !== 0) {
        data.sort((a, b) => a.id - b.id);
    }
    return data;
}

const AreaManagement = () => {

    const [area, setArea] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({});
    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);


    useEffect(() => {
        const fetchArea = async () => {
            try {
                const area = await GetArea();
                if (area) {
                    setArea(dataPreparation(area));
                }
            }
            catch (e) {
                console.log('Error fetch area data', e);
            }
        }

        fetchArea();

        if (area.length === 0) {
            setArea(dataPreparation(areaSample));
        }

        

    }, [area]);


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
                    await DeleteArea(id);
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
        area.length > 0 &&
        <div style={{ minHeight: 500, width: '100%', position: 'relative', marginBottom: '2rem' }}>
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
                        Add a new area
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
                rows={area}
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

export default AreaManagement;