# Proyecto-Grafos-

# Idea del Proyecto
 
Búsqueda de Residencia Ideal Basada en Ubicaciones Cercanas.

# Contexto y Objetivo

La búsqueda de una vivienda adecuada es una decisión compleja y depende de diversos factores, como el costo, la ubicación y la cercanía a lugares clave para la vida cotidiana. Para muchos, una de las prioridades al elegir una residencia es la facilidad de desplazamiento a sus lugares de trabajo, educación y servicios básicos. Este programa que permite buscar residencias en función de la distancia a ubicaciones específicas, como el lugar de trabajo, escuelas, supermercados, y otros puntos de interés, optimizando el tiempo de desplazamiento del usuario.

## Autores

* **José Simón García Castellanos** - *(C.I: 30.786.086)* - [DarthNeo03](https://github.com/DarthNeo03)
* **Moisés Alfonso Terán Rivas** - *(C.I: 30.601.063)* - [teranMoises](https://github.com/teranMoises)
* **Paola Valentina Marcano Salas** - *(C.I: 30.975.611)* - [PaolaMarcano](https://github.com/PaolaMarcano)
* **Crisangelly Del Valle Hernández Fernández** - *(C.I: 30.954.251)* - [Crisangelly](https://github.com/Crisangelly)

## Desarrollado para:

Universidad Valle del Momboy

Matemática Combinatoria - Prof. Yackeline González

## Instrucciones

Para instalar y probar este proyecto, tenga en cuenta lo siguiente:

### Requisitos

*	Un navegador web
*	Node.js con npm
*	Conexión a internet (para acceder al servido de la API REST)
* Archivos .env con los secretos para conectarse a la API dentro de las carpetas client y server:


### Descargue los archivos .env aquí:

[Descargar variables de entorno](https://drive.google.com/drive/folders/1eFY6quLbgcoe7vsQMf3SDf9MAM8ZtGpc?usp=sharing)

(Colocar dichos archivos en las carpetas del repositorio a las que corresponden)

### Instalación

Una vez descargada y descomprimida la carpeta del repositorio, o tenerlo clonado, abra una terminal en la ruta de dicha carpeta, abra su editor de codigo de preferencia y ejecute los siguientes comando para instalar las dependencias necesarias para su funcionamiento:

1. Abrir dos terminales y siguiente a eso ejecutar los siguientes comandos en cada terminal:

```
cd frontend
```
```
cd backend
```
2. Ejecute el siguiente comando para instalar las dependencias necesarias para frontend y backend de nuestro programa

```
npm install
```

3. Ejecutar la página en ambas terminales como desarrollo con:

```
npm run dev
```

4. Ir a la ruta con el puerto asignado para ver la página, esta ruta se puede ver por consola

## Construido con:

* [Node.js](https://nodejs.org/en) - Dependencias
* [Neo4j](https://workspace-preview.neo4j.io/workspace/query?ntid=google-oauth2%7C106513881723715641431) - Base de Datos
* [Vite y React](https://vitejs.dev/) - Usado para crear componentes y empaquetar

* [OSM](https://www.openstreetmap.org/#map=7/7.357/-65.726) - Api para crear el mapa
* [OSRM](https://project-osrm.org/docs/v5.5.1/api/#general-options) - Api para trazar las rutas en el mapa
* [Leaflet](https://leafletjs.com/reference.html) - librería para la creación del mapa e integración de las APIs