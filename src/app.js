import config from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const serviceManager = new ServiceManager();

const runDemo = async () => {
  console.log(
    `Entorno: ${config.nodeEnv} | Puerto configurado: ${config.port}\n`
  );

  console.log("== Servicios actuales ==");
  console.log(await serviceManager.getServices());

  console.log("\n== Buscar servicio existente (id 1) ==");
  console.log(await serviceManager.getServiceById(1));

  console.log("\n== Buscar servicio inexistente (id 999) ==");
  console.log(await serviceManager.getServiceById(999));

  console.log("\n== Agregar servicio válido ==");
  const createdService = await serviceManager.addService({
    name: "Sesión de kinesiología",
    description: "Sesión de kinesiología de 40 minutos",
    duration: 40,
    price: 7000,
    category: "salud",
    available: true,
  });
  console.log(createdService);

  console.log("\n== Agregar servicio incompleto (debe devolver null) ==");
  console.log(await serviceManager.addService({ name: "Servicio incompleto" }));

  console.log("\n== Actualizar servicio creado (intenta cambiar el id) ==");
  console.log(
    await serviceManager.updateService(createdService.id, {
      id: 999,
      price: 7500,
    })
  );

  console.log("\n== Eliminar servicio creado ==");
  console.log(await serviceManager.deleteService(createdService.id));

  console.log("\n== Eliminar servicio inexistente (debe devolver null) ==");
  console.log(await serviceManager.deleteService(999));
};

runDemo();
