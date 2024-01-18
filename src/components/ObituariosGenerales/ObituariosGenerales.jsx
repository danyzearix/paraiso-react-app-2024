import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react'
import "./ObituariosGenerales.css"
import { DateTime } from 'luxon';



const ObituariosGenerales = () => {

const [ObituariosGenerales, setObituariosGenerales] = useState([]);

useEffect(() => {
  // Realizar la solicitud a la API (ajusta la URL de la API según tu configuración)
  axios.get('https://paraiso-api-dev-jajx.1.us-1.fl0.io/api/obituarios')
    .then(response => {
      setObituariosGenerales(response.data); 
      // Actualizar el estado con los datos de la API
    })
    .catch(error => {
      console.error('Error al obtener los datos de la API:', error);
    });
}, []);

// Definir el locale en español
DateTime.local().setLocale('es');

// Obtener la fecha actual en la zona horaria de Bogotá (GMT-5)
const bogotaTime = DateTime.local().setZone('America/Bogota');

// Formatear la fecha para mostrar solo el día de hoy en español
const formattedDate = bogotaTime.toLocaleString(DateTime.DATE_FULL);
  return (
    <Fragment>

    <div className="obituariosGeneral">
      <div className="obituariosGeneral-header">
        <h1 className="obituariosGeneral-title">Obituarios</h1>
      </div>

      <div className="containerMainObi">
        <div>
        <h3 className='parrafoVerde'>Servicios del dia</h3>
        <h3 className='parrafoGris'>{formattedDate}</h3>
        </div>
    </div>

      <div className='ObiturariosTitle'>
        <h1 className='genericTtitle'>Servicios del día</h1>
        <img src="https://elparaisoparquecementerio.com.co/wp-content/uploads/2023/06/Memorial-Service.png" width={52} alt="" />
    </div>
    
    <div className='ObituariosGeneralesContainer'>
        <div className="grid">
          {ObituariosGenerales.map(obituario => (
            <div className="grid-item" key={obituario.id}>
              <h3 className='nombrePersona'>{obituario.nombre} (Q.E.P.D)</h3>
              <p>VELACIÓN: {obituario.velacion}</p>
              <p>EXEQUIAS: {obituario.exequias}</p>
              <i className="bi bi-watch"> <span className='hora'>HORA: {obituario.hora}</span></i> <br />
              <i className="bi bi-geo-alt-fill"> <span className='hora'>DESTINO FINAL: {obituario.destino_final}</span></i>
              <a href="https://www.ejemplo.com">Ir a Ejemplo.com</a>
            </div>
            
          ))}
      </div>
    </div>
    
    <div className="cards-container">
          <button className='greenButton'>Ver todos</button>
    </div>
  </div>
</Fragment>

  )
}

export default ObituariosGenerales