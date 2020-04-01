import React, { useEffect } from 'react';
import { FiPower, FiTrash } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesLogo from '../../assets/logo.svg'
import { useState } from 'react';

export default function Profile() {
        const [incidents, setIncidents] = useState([]);
        const ongName = localStorage.getItem('ongName');
        const ongId = localStorage.getItem('ongId');
        const history = useHistory();

        //fica ouvindo a variavel ongId e caso ela mude, e disparada a funcao
        useEffect(() => {
                api.get('profile', {
                        headers: {
                                Authorization: ongId,
                        }
                }).then(response => {
                        setIncidents(response.data);
                })

        }, [ongId]);
        
       async function handleDeleteIncident(id){
                try {
                      await api.delete(`incidents/${id}`, {
                              headers: {
                                      Authorization:ongId,
                              }
                      });  
                      setIncidents(incidents.filter(incidents => incidents.id !== id))
                } catch (error) {
                        alert('erro ao deletar caso');
                }
        }

        function handleLogout(){
                localStorage.clear();
                history.push('/');
        }

        return (
                <div className="profile-container">
                        <header>
                                <img src={heroesLogo} alt='Be The Hero' />
                                <span>Bem vindo, {ongName}</span>
                                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                                <button type='button' onClick={handleLogout}>
                                        <FiPower size={18} color='#e02041' />

                                </button>
                        </header>

                        <h1>Casos Cadastrados</h1>

                        <ul>
                                {incidents.map(incidents => (
                                        <li key={incidents.id}> 
                                                <strong>Caso:</strong>
                                                <p>{incidents.title}</p>

                                                <strong>Descricao</strong>
                                                <p>{incidents.description}</p>

                                                <strong>Valor</strong>
                                                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incidents.value)}</p>

                                                <button type='button' onClick={() => handleDeleteIncident(incidents.id)}>
                                                        <FiTrash size={20} color='#a8a8b3' />
                                                </button>
                                        </li>
                                ))}


                        </ul>

                </div>

        );

}