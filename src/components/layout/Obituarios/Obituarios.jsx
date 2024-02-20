import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import "./Obituarios.css";
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

const Obituarios = () => {
  const [obituarios, setObituarios] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Obtener la fecha actual si no hay fecha seleccionada
    const currentDate = selectedDate || DateTime.local().setZone('America/Bogota').toISODate();

    axios.get(`https://paraiso-node-api-0c5186e80e32.herokuapp.com/api/obituarios?fecha=${currentDate}`)
      .then(response => {
        setObituarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        setHasError(true);
      });
  }, [selectedDate]); // El efecto se ejecutará cuando selectedDate cambie

  DateTime.local().setLocale('es');
  const bogotaTime = DateTime.local().setZone('America/Bogota');
  const formattedDate = bogotaTime.toLocaleString(DateTime.DATE_FULL);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
   
  };

  // Función para formatear la fecha como DD/MM/AAAA
const formatFechaMongo = (fecha) => {
  let formattedDate = '';

  try {
    const date = DateTime.fromISO(fecha, { zone: 'America/Bogota' });
    const adjustedDate = date.plus({ hours: 6 });
    // Formatear la fecha ajustada
    formattedDate = adjustedDate.toFormat('yyyy-MM-dd');
    console.log(formattedDate);
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
  }

  return formattedDate;
};

  // Declaración de filteredObituarios
  const filteredObituarios = obituarios.filter(obituario => {
    if (selectedDate) {
      const formattedApiDate = formatFechaMongo(obituario.fecha);
      return formattedApiDate === selectedDate;
    }
    return true;
  });

  return (
    <Fragment>

<div className='ObiturariosTitle'>
        <h1 className='genericTtitle'>OBITUARIOS</h1>
        <img src="https://paraisocementerio.a2hosted.com/wp-content/uploads/2024/01/Memorial-Service.png" width={52} alt="" />
      </div>


      <div className="containerMainObi">
        <div>
          <h3 className='parrafoVerde'>Servicios del dia</h3>
          <h3 className='parrafoGris'>{formattedDate}</h3>
        </div>
      </div>

      <div className='SelectorFecha'>
        <label htmlFor="fechaSelector" className="labelFecha" >Seleccionar fecha: </label>
        <input type="date" id="fechaSelector" onChange={handleDateChange} />
      </div>

      <div className='ObituariosContainer'>
        <div className='ObituariosSubcontainer'>
          <div className="container-hijo izquierdaObi">
            <img className='ObiImage' src="https://paraisocementerio.a2hosted.com/wp-content/uploads/2024/01/Obituarios.jpg" width={210} height={210} alt="" />
          </div>
          <div className="grid obituario-grilla">
            {hasError || filteredObituarios.length === 0 ? (
              <h3>No hay obituarios disponibles</h3>
            ) : (
              filteredObituarios.slice(0, 4).map(obituario => (
                <div className="grid-item" key={obituario.id}>
                  <h3 className='nombrePersona'>{obituario.nombre} (Q.E.P.D)</h3>
                  <p>VELACIÓN: {obituario.velacion}</p>
                  <p>EXEQUIAS: {obituario.exequias}</p>
                  <p>FECHA: {formatFechaMongo(obituario.fecha)}</p>
                  <i className="bi bi-watch"> <span className='hora'>HORA: {obituario.hora}</span></i> <br />
                  <i className="bi bi-geo-alt-fill"> <span className='hora'>DESTINO FINAL: {obituario.destino_final}</span></i>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Link to="/ObituariosGenerales">
        <div className="cards-container">
          <button className='greenButton'>Ver todos</button>
        </div>
      </Link>
    </Fragment>
  );
}

export default Obituarios;


