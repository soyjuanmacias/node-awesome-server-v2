# ¿Como crear un CRUD sin morir en el intento?

En esta carpeta `todos` encontrarás 3 archivos `todos.config.js`, `todos.model.js`, y `todos.routes.js`.

Basta con duplicar esta carpeta y habrás creado un CRUD.

Para terminar de crear el CRUD con los nuevos datos recuerda lo siguiente:

- Cambiar el objeto `entity` en el archivo config y el import de `scheme` y `routes`.
- Modificar los middleware del archivo `routes`.
- En el archivo `routes` no necesitas cambiar el nombre de los métodos.
- en el archivo `src/api/index.js` crear la nueva ruta para el crud.