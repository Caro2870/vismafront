// axiosInstance.js

import axios from 'axios';

// Crea una instancia de Axios con la ruta base predefinida
const instance = axios.create({
  baseURL: 'https://g7pnfi6km5.execute-api.us-east-1.amazonaws.com/api/',
  // Puedes agregar otros encabezados, tiempo de espera, etc., según sea necesario
  timeout: 5000, // Por ejemplo, un tiempo de espera de 5 segundos
});

export default instance;
