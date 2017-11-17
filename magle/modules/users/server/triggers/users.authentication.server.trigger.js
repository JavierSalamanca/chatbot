'use strict';

var path = require('path'),
    config = require(path.resolve('./config/env/default')),
    request = require("request");

/**
 * Ejecutado después del inicio de sesión de usuario.
 * @param params    Parámetros preparados para el usuario.
 * @param callback  Función de callback para finalizar la ejecución.
 */
exports.onAfterSignin = function (params, callback) {

  callback(params.request); //Sin tareas adicionales
};

/**
 * Ejecutado despúes de registro del usuario.
 * Se preparan las distintas variables a considerar.
 * @param params    Parámetros preparados para el usuario.
 * @param callback  Función de callback para finalizar la ejecución.
 */
exports.onAfterSignup = function (params, callback) {

  //Genera dirección URL para módulo de Mundos Virtuales
  var url = "http://158.251.88.54:7117/players/" + params.request.username;  //config.virtualworld.url + params.request.username;
  var obj = {
    "json": {
      "niceName": params.request.displayName,   //Nombre completo de usuario
      "email": params.request.email,            //Correo electronico de usuario
      "gender": (params.request.gender ? params.request.gender : "M")           //Género de usuario
    }
  };

  //Se realiza petición de registro a servicio web de Mundos Virtuales
  request.post(
      url,
      obj,
      function (error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body)
        if (!error && response.statusCode === 201) {
          console.log("User successfully registered in Virtual Worlds!" + response.statusCode);
          callback(params.request);
        } else {
          console.log("User has NOT successfully registered in Virtual Worlds: " + error.code);
          callback(null);
        }
      }
  );

};
