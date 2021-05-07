# ChallengeJS
## Objetivo
Desarrollar una aplicación para administración de presupuesto personal. La misma debe
permitir crear y editar ingresos y egresos de dinero, y mostrar un balance resultante de las
operaciones registradas.

## Secciones
### Login
Formulario de registro y acceso para autentificar el usuario y poder mostrar la información correspondiente. 

### Home
La pantalla de inicio deberá mostrar el balance actual, es decir, el resultante de los ingresos 
y egresos de dinero cargados, y un listado de los últimos 10 registrados.

### ABM de operaciones
  * Formulario de registro de operación.
  * Listado de operaciones registradas.
  * Desde el listado, se puede modificar o eliminar una operación registrada previamente. 
    No se puede modificar el tipo de operación.
  * Filtrado por categoría.

## Tecnologías aplicadas
  * API en Node.js con express y sequelize.
  * Frontend en React.js
  * Peticiones AJAX.
