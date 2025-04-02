import React from 'react'
import "./AsaidBarEstilo.css";


export const AsaidBar = () => {

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

                </div>
            </div>
        </>
    )
}
//{sprints.length === 0 ? (
//    <p>No hay sprints creados.</p>
//) : (
//    sprints.map((sprint) => (
//        <CardSprintAsaid key={sprint.id} sprint={sprint} />
//    ))
//)}
//const sprints = useAppStore((state) => state.sprints);