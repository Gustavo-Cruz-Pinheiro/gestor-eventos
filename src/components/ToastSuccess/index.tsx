import React from 'react';
import { Toast } from 'react-bootstrap';

interface ToastSuccessProps {
    show: boolean;
    message: string;
    onClose: () => void;
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({ show, message, onClose }) => {
    return (
        <Toast
            show={show}
            onClose={onClose}
            style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                zIndex: 9999,
                minWidth: '300px',
            }}
            delay={5000}
            autohide
            bg="success"
        >
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default ToastSuccess;
