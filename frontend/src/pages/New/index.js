import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';

import './styles.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    );

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        console.log(data);
        const response = await api.post('/spots', data, {
            headers: { user_id }
        });
        history.push('/dashboard');
    }


    return (
        <form onSubmit={handleSubmit}>

            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select image" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                type="text"
                placeholder="Sua empresa tio"
                id="company"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">TECNOLOGIAS *<span>(separadas por virgula)</span></label>
            <input
                type="text"
                placeholder="Quais techs são usadas"
                id="techs"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIARIA *<span>(em branco == gratis)</span></label>
            <input
                placeholder="Valor cobrado por dia"
                id="price"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type='submit'>Cadastrar</button>


        </form>
    );
}