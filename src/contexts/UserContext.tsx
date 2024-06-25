import { createContext, ReactNode, useState } from "react";
import { db } from "../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextData {
    nome: string;
    email: string;
    atualizarUsuario: (novoNome: string) => Promise<void>;
    logar: (novoNome: string, novoEmail: string) => void;
    deslogar: () => void;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    async function atualizarUsuario(novoNome: string) {
        try {
            const docRef = doc(db, 'users', 'R12opJAlzAV1Arn9LSHIpSs60W53');
            await updateDoc(docRef, {
                nome: novoNome
            });
            setNome(novoNome);
            alert("Nome de usuário alterado com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert("Erro ao atualizar nome de usuário. Tente novamente.");
        }
    }

    function logar(novoNome: string, novoEmail: string) {
        setNome(novoNome);
        setEmail(novoEmail);
    }

    function deslogar() {
        setNome('');
        setEmail('');
        localStorage.removeItem('@userData');
        alert('Usuário deslogado com sucesso!');
    }

    const contextValue: UserContextData = {
        nome,
        email,
        atualizarUsuario,
        logar,
        deslogar
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
