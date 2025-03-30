import React from 'react'
import "./AsaidBarEstilo.css";
import { CardSprintAsaid } from './cardSprintAsaid/CardSprintAsaid';
import { useAppStore } from '../../store/store'; // Importa el store


export const AsaidBar = () => {
    const sprints = useAppStore((state) => state.sprints);
    return (
        <>
            <div className='asideBarContenedor'>
                <div className='botoneraBacklog'>
                    <button className='botonBlacklog'>
                        <h6>Backlog</h6>
                    </button>
                </div>
                <div className='divListaSprints'>
                    <h4>Lista de Sprints</h4>
                    {sprints.length === 0 ? (
                        <p>No hay sprints creados.</p>
                    ) : (
                        sprints.map((sprint) => (
                            <CardSprintAsaid key={sprint.id} sprint={sprint} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
