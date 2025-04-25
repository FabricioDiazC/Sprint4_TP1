import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id){
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes(){
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

//Sprint 3 TP1
   
//Crear Superheroe
export async function crearSuperheroe(datosSuperheroe) {
    return await superHeroRepository.crearSuperheroe(datosSuperheroe);
}

//Actualizar superheroe por id
export async function actualizarSuperheroe(id, datosActualizados) {
    return await superHeroRepository.actualizarSuperheroe(id, datosActualizados);
}

//Borrar a un Superheroe por ID
export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminarSuperheroe(id);
}

//Borrar un Superheroe por Nombre
export async function borrarSuperheroPorNombre(nombre) {
    return await superHeroRepository.borrarSuperheroPorNombre(nombre)
  }
