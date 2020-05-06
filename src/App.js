import React, {useState} from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div `
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div `
  background-color: #ffffff;
  padding: 3rem;
`;


function App() {

  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca:'',
      year:'',
      plan:''
    }
  });

  //Extraer datos del State

  const {cotizacion, datos} = resumen;

  //State para el simbolo cargando
  const [cargando, setCargando] = useState(false);

  return (
    <Contenedor>
      <Header
        titulo='Cotizador de Seguro'
      />

      <ContenedorFormulario>
        <Formulario
          setResumen={setResumen}
          setCargando={setCargando}
        />

        {cargando && <Spinner/>}

        <Resumen
          datos={datos}
        />
        {!cargando && 
        <Resultado
          cotizacion={cotizacion}
        />}
        
      </ContenedorFormulario>


    </Contenedor>
    
  );
}

export default App;
