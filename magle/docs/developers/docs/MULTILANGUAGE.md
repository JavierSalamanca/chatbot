## Soporte multilenguaje

Siempre es una buena práctica extraer strings de IU del código de tu app y conservarlas en un archivo externo. MAGLE facilita esta tarea con un directorio de recursos de idioma en cada módulo que puede ser desarrollado.

Una vez que decidas los idiomas que admitirás, crea los subdirectorios de recursos y los archivos de recursos de strings. Por ejemplo:

```
modules/
    mi_modulo/
       client/
           lang/
               en_US.client.lang.json
               es_CL.client.lang.json
```
Por defecto, se incluyen los idiomas en-US y es-CL.

Agrega los valores de string para cada configuración regional en el archivo correspondiente.

## Construir módulos utilizando idiomas

<ADAPTAR> Puedes hacer referencia a tus recursos de string en el código fuente y en otros archivos XML usando el nombre del recurso definido por el atributo name del elemento <string>.

En tu código fuente, puedes hacer referencia a un recurso de string con la sintaxis R.string.<string_name>. Existen diferentes métodos disponibles que aceptan un recurso de string de esta manera. </ADAPTAR>

- Agregar en la ruta `cliente/lang/en_us`.

Se debe agregar un prefijo por módulo, generalmente tres letras iniciales del módulo.
Por ejemplo:
- Articles -> ART_
- Monitor -> MON_
- Management -> MNG_


## ¿Cómo agregar un nuevo idioma?

TODO: Redacción para agregar nuevo idioma.

- Agregar tarea a grunt.

En el archivo grunt ...

```
"merge-json": {
  "en_US": {  // English / United States
    src: ["modules/**/lang/en_US.client.lang.json"],
    dest: "public/lang/lang_en_US.json"
  },
  "es_CL": {  // Español / Chile
    src: ["modules/**/lang/es_CL.client.lang.json"],
    dest: "public/lang/lang_es_CL.json"
  }
}
```

- Probar idioma
