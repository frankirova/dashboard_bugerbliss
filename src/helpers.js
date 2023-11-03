import { v4 as uuidv4 } from "uuid";
export const getUuid = () => {
  return uuidv4();
};

export const getOptions = () => {

};

export const formatDate = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    const fechaFormateada = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;

    return fechaFormateada;
  };
