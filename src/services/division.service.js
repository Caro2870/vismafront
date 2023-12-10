// OtroArchivo.js

import axiosInstance from './axiosInstance';

// Supongamos que tienes varios parámetros
const perPage = 20;
const page = 2;
const search = 'ejemplo';
const orderColumn = 'nombre';
const orderDirection = 'asc';
const filterColumn = 'columna';
const filterValue = 'valor';

// Construyes la URL con todos los parámetros
const url = `/divisiones/listar?per_page=${perPage}&page=${page}&search=${search}&order_column=${orderColumn}&order_direction=${orderDirection}&filter_column=${filterColumn}&filter_value=${filterValue}`;

// Realizas la solicitud GET con la URL que incluye los parámetros
axiosInstance.get(url)
  .then(response => {
    console.log('Datos recibidos:', response.data);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });
