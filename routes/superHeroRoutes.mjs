import express from 'express';
import { body, validationResult } from "express-validator";
import{
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroeController,
    borrarSuperheroePorNombreController,
    mostrarFormularioAgregarSuperheroe,
    agregarSuperheroeController,
    editarSuperheroeController,
    mostrarFormularioEditarSuperheroe
    
} from '../controllers/superheroesController.mjs';
import { registerValidationRules } from '../middleware/validationRules.js';
import { validarSuperheroe } from '../middleware/validationRules.js';
import { handleValidationErrors } from '../middleware/errorMiddleware.js';

const router = express.Router();

router.post('/heroes/agregar', validarSuperheroe, handleValidationErrors,agregarSuperheroeController);
router.post('/heroes/crearConValidacion', registerValidationRules(), handleValidationErrors, crearSuperheroeController);
//Etapa 3 - Sprint 3 - Tp3
router.post('/heroes/crear', crearSuperheroeController);
//Fin estapa 3 - Sprint 3 - Tp3


router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/agregar', mostrarFormularioAgregarSuperheroe);
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id/editar', mostrarFormularioEditarSuperheroe); //Etapa 4 - Sprint 3 - Tp 3
router.get('/heroes/:id', obtenerSuperheroePorIdController);

//Actualizar Superheroe Por ID
router.put('/heroes/actualizarPorID/:id', actualizarSuperheroeController);
router.put('/heroes/:id/editar', editarSuperheroeController); //Etapa 4 - Sprint 3 - Tp 3

//Borrar Superheroe por ID
router.delete('/heroes/eliminarPorID/:id', eliminarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperheroeController); //Etapa 5 - Sprint 3 - Tp3
//Borrar Superheore por Nombre
router.delete('/heroes/borrarPorNombre/:nombre', borrarSuperheroePorNombreController);


export default router;
