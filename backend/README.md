1. crear base de datos admPresupuestos.


REQUEST DE BUDGET

Ruta para mostrar toda la lista de un user, cambiar id por el valor del id que queremos buscar:

    http://localhost:3050/api/budget/all/id

Ruta para mostrar los últimos 10 elementos de la lista, cambiar id por el valordel id que queremos buscar:

    http://localhost:3050/api/budget/last10/id

Ruta para mostrar todos los elementos de una categoria, cambiar el id y la categoria por los valores correspondientes:

    http://localhost:3050/api/budget/filter/id/categoria

Ruta para agregar un movimeiento, agregar en el body la información: idUser, date, description, amount, category, type,

    http://localhost:3050/api/budget/add

Ruta para modificar un movimiento:

    http://localhost:3050/api/budget/update

Ruta para eliminar un movimiento, cambiar el valor de id por el id de la transaccion:

    http://localhost:3050/api/budget/delete/id

REQUEST DE BALANCE

Ruta para mostrar el balance de un usuario, cambiar id por el valordel id que queremos buscar:

    http://localhost:3050/api/balance/id

Ruta para modificar el balance de un usuario, cambiar id por el valordel id que queremos buscar:

    http://localhost:3050/api/balance/update/id

RUTAS DE USUARIOS

Para crear un usuario usamos la siguiente ruta, en el body debemos pasar los siguientes datos: email, username, password

    http://localhost:3050/api/user/register

Para hacer el login usamos la siguiente ruta, en el body debemos agregar email y password:

    http://localhost:3050/api/user/login