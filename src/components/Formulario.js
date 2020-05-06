import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper'


const Campo = styled.div `
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.div `
    flex: 0 0 100px;
`;

const Select = styled.select `
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input `
    margin: 0 1rem;
`;

const Button = styled.button `
    width:  35%;
    background-color: #00838F;
    padding: 10px;
    color: #ffffff;
    font-family: 'Slabo 27px', serif;
    font-weight: bold;
    font-size: 1.3rem;
    border-radius: 50px;
    outline:none;
    transition: background-color .4s ease;
    margin-top: 2rem;
    &:hover {
        background-color: rgb(127, 224, 237);
        cursor: pointer;
        color: black
        
    }
    
`;
const Boton = styled.div `
    display: flex;
    justify-content: flex-end;
`;

const Error = styled.div `
    background-color: red;
    padding: 1rem;
    width: 100%;
    color: white;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;

`;

const Formulario = ({setResumen, setCargando}) => {

    //State para los datos del formulario

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    //Extraer los valores del State
    const {marca, year, plan} = datos;

    //Validar los campos del Formulario
    const [error, setError] = useState(false);

    //leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = (e) => {
        setDatos ({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el Usuario presiona Submit para Cotizar

    const cotizarSeguro = e => {
        e.preventDefault();

        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        //precio base de 2000
        let resultado = 2000;

        //obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        
        //por cada año hay que restar el 3%
        resultado -= ((diferencia * 3) * resultado) /100;
        
        //calcularMarca es la funcion que calcula el incremento de valor por marca
        resultado = calcularMarca(marca) * resultado;
        
        //Asiatico 5%
        //Americano 15%
        //Europeo 30%

        //Basico aumenta 20%
        //Completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);

        resultado = parseFloat(resultado * incrementoPlan).toFixed(2);

        //Spinner Cargando

        setCargando(true);

        setTimeout(() => {
            setCargando(false);

            //Muestra el resumen Total
            setResumen({
                cotizacion: Number(resultado),
                datos
    
            });
        }, 3000);

        
        

    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >

            {error && <Error>Todos los Campos son Obligatorios</Error>}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />Básico
                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Boton>
                <Button type="submit">Cotizar</Button>
            </Boton>
        </form>
     );
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}
 
export default Formulario;