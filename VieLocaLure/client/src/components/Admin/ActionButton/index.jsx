import React from 'react'
import { Button } from 'react-bootstrap';

const ActionButton = ({ id, level }) => {
    const onEdit = (id) => {

    }

    const onDelete = (id) => {

    }

    const onAdd = (id) => {

    }
    return (
        <div className="d-flex justify-content-start">
            <Button variant="warning" className="px-2 py-0 me-2" onClick={() => onEdit(id)}>
                Edit
            </Button>
            <Button variant="danger" className="px-2 py-0 me-2" onClick={() => onDelete(id)}>
                Delete
            </Button>
            {level === 1 &&  
                <Button variant="primary" className="px-2 py-0" onClick={() => onAdd(id)}>
                    Add
                </Button>
            }
        </div>
    )
}

export default ActionButton;