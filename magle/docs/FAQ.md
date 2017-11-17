## Preguntas frecuentes (FAQ)

### Instalación de plugin angular a nivel de módulo

La instalación de plugins en Angular deben realizarse únicamente con `bower`.

Para instalar un plugin, deben realizarce los siguientes pasos:
- **Instalar plugin con bower**. Realizar la instalación localizado en la raíz del proyecto :
```
$ bower install angular-plugin-to-install
```
- **SADF***




Esta guía de instalación es para es solo para el entorno de desarrollo.

### Instalación

#### Instalación de NodeJS
Para ejecutar MAGLE, necesitará al menos un NodeJS v6.10.0 (Windows). Si está trabajando en un sistema basado en Debian (Debian, Ubuntu, Mint, etc.), debe tipear :
```
sudo apt-get install xxx_nodejs_xxx
```

#### Instalación de MongoDB

Para el manejo de datos, es necesario establecer el sistema de gestión de base de datos que se basa principalmente en MongoDB v3.4.2 (windows).
```
sudo apt-get install xxx_mongo_xxx
```

### Instalación de Git

Esta versión requiere tener una versión de Git instalada. 
Si estas trabajando en un sistema basado en Debian (Ubuntu, Mint, etc), basta con tipear:
```
sudo apt-get install git
```

### Install Node Package Installer (NPM)
Asegurate de tener npm instalado. Si lo haces, podrás lanzar el comando "npm".
Si no sabes, por favor sigue los pasos de instalación en https://www.npmjs.com/


### Descargar MAGLE

Clone the repository

```
sudo mkdir chamilo2
sudo chown -R `whoami` chamilo2
git clone -b master --single-branch https://github.com/chamilo/chamilo-lms.git chamilo2
```

Checkout branch 2.x

```
cd chamilo2
git checkout --track origin/master
git config --global push.default current
```

### Crear base de datos

You should have a MongoDB user and database created before hand.

### Update dependencies using npm

From the MAGLE folder (in which you should be now if you followed the previous steps), launch:
```
npm update
```

npm update will install packages in order to create a configuration file in:
```
app/config/parameters.yml.dist
```

This will take several minutes in the best case scenario, but should definitely
generate the missing files.


### Start the installer

In your browser, load the "node server.js" URL and follow the installation instructions.
