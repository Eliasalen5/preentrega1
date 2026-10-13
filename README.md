# Turnos y Reservas — Pre-entrega 1 (Administrador de servicios)

Proyecto Node.js con **ESM** que implementa la clase `ServiceManager` para gestionar los
servicios de un sistema de turnos y reservas. Los servicios se persisten en un archivo
JSON (`src/data/services.json`).

## Requisitos

- Node.js 18 o superior (usa módulos ESM nativos).

## Instalación

```bash
npm install
```

## Variables de entorno

Creá un archivo `.env` en la raíz del proyecto, tomando como base `.env.example`:

| Variable   | Descripción                                  | Ejemplo       |
| ---------- | -------------------------------------------- | ------------- |
| `PORT`     | Puerto de la aplicación                      | `8080`        |
| `NODE_ENV` | Entorno de ejecución                         | `development` |

```
PORT=8080
NODE_ENV=development
```

Si falta alguna de estas variables, la aplicación **falla al iniciar** con un mensaje
claro (validación en `src/config/env.config.js`).

## Ejecución

```bash
npm start
```

o en modo desarrollo (reinicio automático):

```bash
npm run dev
```

Al ejecutar, `src/app.js` muestra por consola una demostración del uso de cada método
del `ServiceManager`.

## Estructura del proyecto

```
src/
  config/env.config.js        # Carga y valida las variables de entorno
  managers/ServiceManager.js  # Lógica de negocio de los servicios
  data/services.json          # Persistencia de los servicios
  app.js                      # Punto de entrada (demo por consola)
package.json
.env.example
.gitignore
README.md
```

## Recurso `services`

Cada servicio tiene la siguiente forma:

```json
{
  "id": 1,
  "name": "Consulta general",
  "description": "Consulta médica general de 30 minutos",
  "duration": 30,
  "price": 5000,
  "category": "salud",
  "available": true
}
```

| Campo         | Tipo      | Descripción                                |
| ------------- | --------- | ------------------------------------------ |
| `id`          | `number`  | Identificador único (generado internamente) |
| `name`        | `string`  | Nombre del servicio                         |
| `description` | `string`  | Descripción del servicio                    |
| `duration`    | `number`  | Duración en minutos                         |
| `price`       | `number`  | Precio del servicio                         |
| `category`    | `string`  | Categoría del servicio                      |
| `available`   | `boolean` | Si el servicio está disponible              |

## Uso de `ServiceManager`

```js
import ServiceManager from "./managers/ServiceManager.js";

const serviceManager = new ServiceManager();
```

### `getServices()`

Devuelve todos los servicios.

```js
const services = await serviceManager.getServices();
```

### `getServiceById(id)`

Devuelve el servicio con ese `id` o `null` si no existe.

```js
const service = await serviceManager.getServiceById(1); // servicio o null
```

### `addService(serviceData)`

Agrega un servicio. El `id` se **genera internamente** (no se recibe como parámetro).
Valida que estén presentes `name`, `description`, `duration`, `price`, `category` y
`available`. Si faltan campos, devuelve `null`.

```js
const nuevo = await serviceManager.addService({
  name: "Sesión de kinesiología",
  description: "Sesión de kinesiología de 40 minutos",
  duration: 40,
  price: 7000,
  category: "salud",
  available: true,
});
```

### `updateService(id, updatedData)`

Actualiza el servicio. No permite modificar el `id`. Devuelve el servicio actualizado o
`null` si no existe.

```js
const actualizado = await serviceManager.updateService(1, { price: 5500 });
```

### `deleteService(id)`

Elimina el servicio. Devuelve el servicio eliminado o `null` si no existe.

```js
const eliminado = await serviceManager.deleteService(1);
```
