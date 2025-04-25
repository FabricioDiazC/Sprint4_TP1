import { body } from 'express-validator';

export const registerValidationRules= () => [

  body("nombreSuperHeroe").trim().notEmpty().withMessage("Nombre de Superheroe obligatorio.").isLength({ min: 3, max: 60 }).withMessage("Nombre de Superheroe debe tener entre 3 y 60 caracteres."),

  body("nombreReal").trim().notEmpty().withMessage("Nombre Real obligatorio.").isLength({ min: 3, max: 60 }).withMessage("Nombre Real debe tener entre 3 y 60 caracteres"),

  body("edad").trim().notEmpty().withMessage("Edad obligatorio.").isInt({ min: 1 }).withMessage("Edad debe ser mayor a cero"),
    
  body("poderes").notEmpty().withMessage("Poderes obligatorio.").isArray({ min: 1 }).withMessage("Poderes no es un array o está vacio"),

];

export const validarSuperheroe = [
  body("nombreSuperheroe").notEmpty().withMessage("El nombre del superhéroe es obligatorio"),

  body("nombreReal").notEmpty().withMessage("El nombre real es obligatorio"),

  body("edad").isInt({ min: 1 }).withMessage("La edad debe ser un número positivo"),

  body("planetaOrigen").notEmpty().withMessage("El planeta de origen es obligatorio"),

  body("debilidad").notEmpty().withMessage("La debilidad es obligatoria"),

  body("poderes").notEmpty().withMessage("Debe tener al menos un poder"),

  body("creador").notEmpty().withMessage("El nombre del creador es obligatorio")
];