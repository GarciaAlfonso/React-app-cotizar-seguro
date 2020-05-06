import React/*, {Fragment}*/ from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { primerMayuscula } from '../helper';


const ContenedorResumen = styled.div `
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Lista = styled.li `
    padding: .5rem;
    font-weight: bold;
`;

const Resumen = ({datos}) => {
    
    //Extraer de datos

    const {marca, year, plan} = datos;

    if(marca === '' || year ==='' || plan ==='') {
        return null;
    }else {
        return ( 
            <ContenedorResumen>
                <h2>Resumen de Cotización</h2>
                <ul>
                    <Lista>Marca: { primerMayuscula(marca) }</Lista>
                    <Lista>Plan: { primerMayuscula(plan) }</Lista>
                    <Lista>Año del Auto: { primerMayuscula(year) }</Lista>
                </ul>
            </ContenedorResumen>
         );
    }

   
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}
 
export default Resumen;