import React, { useEffect, useState } from 'react'
import { DeleteMenuItem, GetMenuItems } from '../../../services/MenuApi'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from 'react-bootstrap';
import EditMenuForm from './EditMenuForm';
import AddMenuForm from './AddMenuForm';
// import EditMenuForm from '../AreaManagement/EditForm';
// import AddMenuForm from '../AreaManagement/AddForm';


const columns = [
    {
        field: 'key', 
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
        field: 'navName_en', 
        headerName: 'Name', 
        width: 400, 
        renderHeader: () => (
            <strong>
            {'Name '}
            </strong>
        ) 
    },
    {
        field: 'nav_url', 
        headerName: 'Url', 
        width: 400, 
        renderHeader: () => (
            <strong>
            {'Url '}
            </strong>
        ), 
    },
];


const sampleItems = [
    {
        "id": 1,
        "navName_en": "Homepage",
        "navName_vi": "Trang chủ",
        "nav_url": "/",
        "children": null
    },
    {
        "id": 2,
        "navName_en": "Destination",
        "navName_vi": "Điểm đến",
        "nav_url": "/destination",
        "children": [
            {
                "id": 3,
                "navName_en": "North VietNam",
                "navName_vi": "Miền Bắng",
                "nav_url": "/destination/north-vietnam",
                "children": null
            },
            {
                "id": 4,
                "navName_en": "Central Vietnam",
                "navName_vi": "Miền Trung",
                "nav_url": "/destination/central-vietnam",
                "children": null
            }
        ]
    },
    {
        "id": 5,
        "navName_en": "Tour",
        "navName_vi": "Tour du lịch",
        "nav_url": "/tour",
        "children": null
    },
    // {
    //     "id": 6,
    //     "navName_en": "Contact",
    //     "navName_vi": "Liên hệ",
    //     "nav_url": "/contact",
    //     "children": null
    // }
]

const dataPreparation = (data, parentId=null) => {
    let result = [];

    data.forEach((item, index) => {
        // Create a new object with desired keys
        let newItem = {
            id: item.id,
            navName_en: item.navName_en,
            navName_vi: item.navName_vi,
            nav_url: item.nav_url,
            parent_id: parentId,
        };

        if (parentId === null) {
            newItem.key = index + 1;
        } else {
            newItem.key = `${parentId}.${index+1}`
        }

        // Recursively process children if they exist
        if (item.children && item.children.length > 0) {
            let children = dataPreparation(item.children, item.id);
            result = result.concat(children);
        }

        // Push the new item to the result array
        result.push(newItem);
    });

    result.sort((a, b) => {
        // Convert keys to string for consistent comparison
        const keyA = String(a.key);
        const keyB = String(b.key);
        
        // Compare keys
        if (keyA < keyB) {
            return -1;
        }
        if (keyA > keyB) {
            return 1;
        }
        return 0;
    });

    return result;
}

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [rowIdSelected, setRowIdSelected] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const [alert, setAlert] = useState({});
    const toggleOpen = () => setEditModal(!editModal);
    const toggleOpenAdd = () => setAddModal(!addModal);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menu = await GetMenuItems();
                if (menu) {
                    setMenuItems(menu);
                }
            }
            catch (e) {
                console.log('Error fetch menu data', e);
            }
        }

        fetchMenu();

        if (menuItems.length === 0) {
            let data = dataPreparation(sampleItems)
            setMenuItems(data);
        }

    }, [menuItems]);

    const getKeyById = (id) => {
        const menuItem = menuItems.find(item => item.id === id);
        if (menuItem) {
            return menuItem.key.toString();
        }
        return null;
    }

    const getNumMenuItems = () => {
        return menuItems.filter(item => !item.parent_id).length;
    }

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
                    await DeleteMenuItem(id);
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
        const item = menuItems.find(item => item.id === rowIdSelected[0])
        if (item) {
            setBaseUrl(item.nav_url);
            setAddModal(true);
        } else {
            setBaseUrl('');
            setAddModal(true);
        }
    }
    

    return (
        menuItems.length > 0 &&
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
                    <>
                        <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        >
                            Navbar data rows
                        </Typography>
                        
                        {getNumMenuItems() < 4 &&
                            <Tooltip title="Add">
                                <IconButton className='me-3'>
                                    <AddIcon onClick={onAdd} />
                                </IconButton>
                            </Tooltip>
                        }
                    </>
                )}

                {
                    numSelected > 0 && 
                    <>
                    {
                        numSelected === 1 && rowIdSelected[0] !== 1 && !getKeyById(rowIdSelected[0]).includes('.') && 
                        <Tooltip title="Add">
                            <IconButton className='me-3'>
                                <AddIcon onClick={onAdd} />
                            </IconButton>
                        </Tooltip>
                    }
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
                rows={menuItems}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelected}
                // isRowSelectable={(params) => !(params.row.key).toString().includes('.')}
            />
            {
                showAlert === true && alert.type &&
                    <Alert style={{position: 'absolute', top: '20%', right: '5%'}} variant={alert.type} onClose={() => setShowAlert(false)} dismissible>
                        {alert.message}
                    </Alert>
            }

            <EditMenuForm editModal={editModal} setEditModal={setEditModal} toggleOpen={toggleOpen} id={rowIdSelected}/>
            <AddMenuForm baseUrl={baseUrl} addModal={addModal} setAddModal={setAddModal} toggleOpenAdd={toggleOpenAdd} id={rowIdSelected}/>
        </div>
    )
}

export default Menu;