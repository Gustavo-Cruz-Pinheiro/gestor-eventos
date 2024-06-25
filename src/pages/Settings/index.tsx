import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const Settings = () => {
    const [lightTheme, setLightTheme] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('lightTheme') === 'true';
        setLightTheme(storedTheme);
    }, []);

    const handleThemeToggle = () => {
        const newTheme = !lightTheme;
        setLightTheme(newTheme);
        localStorage.setItem('lightTheme', newTheme.toString());
    };

    return (
        <>
            <h1 className="h5 m-0 ms-3"></h1>
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Tema Claro"
                checked={lightTheme}
                onChange={handleThemeToggle}
                className="ms-auto me-3"
            />
        </>
    );
};
