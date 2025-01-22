export const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son validos.
    Necesitamos recibir los seguientes datos:
    - Nombre: String, pero recibimos ${usuario.nombre}
    - Apellido: String, peeero recibimos ${usuario.apellido}
    - Email: String, recibimos ${usuario.email}
    `
}