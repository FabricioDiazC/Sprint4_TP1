import { obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe, 
    eliminarSuperheroe,
    borrarSuperheroPorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try{
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superheroe no encontrado'});
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener el superheroe', error: error.message});
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        /*const superheroesFormateados = renderizarListaSuperheroes(superheroes);*/
        /*res.status(200).json(superheroesFormateados);*/
        res.render('dashboard', { 
            title: 'Lista de Superheroes',
            superheroes });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}

//SPRINT 3 TP1

export async function crearSuperheroeController(req, res) {
    try {
        const datosSuperheroe = req.body;
        const nuevoSuperheroe = await crearSuperheroe(datosSuperheroe);
        res.status(201).json(renderizarSuperheroe(nuevoSuperheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

//Actualizar Superheroe por ID
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(renderizarSuperheroe(superheroeActualizado));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message });
    }
}

//Eliminar Superheroe por ID
/*
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(renderizarSuperheroe(superheroeEliminado));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}
    */


export async function borrarSuperheroePorNombreController(req, res) {
    try {
      const { nombre } = req.params;
      const superheroe = await borrarSuperheroPorNombre(nombre);
      if (!superheroe) {
        return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
      }
  
      const superheroeFormateado = renderizarSuperheroe(superheroe);
      res.status(200).json(superheroeFormateado);
    } catch (error) {
      res
        .status(500)
        .send({
          mensaje: "Error al obtener el superhéroe",
          error: error.message,
        });
    }
}

//TP 3 SPRINT 3
//mÉTODO pARA rENDERIZAR
export function mostrarFormularioAgregarSuperheroe(req, res) {
    res.render('addSuperhero', { 
        error: null,
        title: 'Agregar Superhéroe' 
    });
}


export async function agregarSuperheroeController(req, res) {
    try {
        console.log("Datos recibidos:", req.body); //Log para ver qué llega
        // Obtener datos del formulario
        const { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombreSuperheroe || !nombreReal || !edad || !planetaOrigen || !debilidad || !poderes || !creador) {
            return res.render('addSuperhero', { error: "Todos los campos son obligatorios" });
        }

        // Convertir poderes, aliados y enemigos en arrays
        const poderesArray = poderes.split(',').map(p => p.trim());
        const aliadosArray = aliados ? aliados.split(',').map(a => a.trim()) : [];
        const enemigosArray = enemigos ? enemigos.split(',').map(e => e.trim()) : [];

        // Crear el superhéroe
        await crearSuperheroe({
            nombreSuperHeroe: nombreSuperheroe,
            nombreReal,
            edad: parseInt(edad),
            planetaOrigen,
            debilidad,
            poderes: poderesArray,
            aliados: aliadosArray,
            enemigos: enemigosArray,
            creador
        });

        // Redirigir al dashboard después de agregar
        res.redirect('/api/heroes');
        console.log('Datos recibidos:', req.body);
    } catch (error) {
        res.render('addSuperhero', { error: "Error al agregar superhéroe" });
    }
}

export async function mostrarFormularioEditarSuperheroe(req, res) {
    try {
        const id = req.params.id;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) return res.status(404).send('Superhéroe no encontrado');

        res.render('editSuperhero', { 
            title: 'Editar Superhéroe',
            superheroe });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
}


export async function editarSuperheroeController(req, res) {
    try {
        const id = req.params.id;
        const { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;

        const poderesArray = poderes.split(',').map(p => p.trim());
        const aliadosArray = aliados ? aliados.split(',').map(a => a.trim()) : [];
        const enemigosArray = enemigos ? enemigos.split(',').map(e => e.trim()) : [];

        await actualizarSuperheroe(id, {
            nombreSuperHeroe: nombreSuperheroe,
            nombreReal,
            edad: parseInt(edad),
            planetaOrigen,
            debilidad,
            poderes: poderesArray,
            aliados: aliadosArray,
            enemigos: enemigosArray,
            creador
        });

        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send('Error al editar el superhéroe');
    }
}

//Eliminar Superheroe por ID
//Metodo nuevo para la Etapa 4 del tp 3 del Sprint 3
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        await eliminarSuperheroe(id);
        res.status(200).json({ mensaje: "Superhéroe eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}