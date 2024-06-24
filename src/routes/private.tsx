import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import "./style.css"

interface PrivateProps {
    children: ReactNode,
}

export function Private({ children }: PrivateProps) {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem('@userData', JSON.stringify(userData))

                setLoading(false)
                setSigned(true)
            } else {
                setLoading(true)
                setSigned(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    if(loading) {
        return (
            <div className="loading">
                <p className="text-loading">Carregando...</p>
            </div>
        )
    }

    if(!signed) {
        return <Navigate  to="/login" />
    }

    return children
}