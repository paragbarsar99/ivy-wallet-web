import { useState } from "react"
import { Button, Modal } from 'flowbite-react';
import { AddDetails } from "../../hooks/AddDetails";

export const AddExpense = () => {

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    return (
        <div className="addexpbtn slide-up">
            <Button onClick={() => props.setOpenModal('default')}>
                Add<i className="fa-solid fa-plus ml-3"></i>
            </Button>
            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Add Expense</Modal.Header>
                <Modal.Body>
                    <AddDetails />
                </Modal.Body>
            </Modal>
        </div>
    )
}