import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        console.log(response.data);
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }

    return (
        <>
            <p>
                BlaBla <strong>BlaBlaBla</strong> BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBl   <strong>BlaBlaBla</strong>  aBlaBlaBlaBlaBlaBlaBlaBla
				</p>
            <form onSubmit={handleSubmit} >
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu melhor email tio"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit"	>Entrar</button>
            </form>

        </>
    );
}