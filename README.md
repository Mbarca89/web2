# TPI Fotaza

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* Sequelize
* Pug
* Bootstrap
* JWT
* Multer
* Sharp

## Funcionalidades implementadas

* Registro e inicio de sesión de usuarios.
* Publicación de fotografías.
* Múltiples imágenes por publicación.
* Etiquetas y descripciones.
* Licencias con y sin copyright.
* Búsqueda de publicaciones.
* Comentarios.
* Likes.
* Valoraciones.
* Seguimiento de usuarios.
* Feed de publicaciones de usuarios seguidos.
* Denuncias de publicaciones.
* Perfil público de usuarios.
* Panel personal del usuario.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Mbarca89/web2
cd web2
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` utilizando como base el archivo `.env.example`.

Inicializar la base de datos:

```bash
npm run db:init
```

Popular la base de datos:

```bash
npm run db:seed
```

Iniciar la aplicación:

```bash
npm start
```

La aplicación quedará disponible en:

```txt
http://localhost:3000
```

## Variables de entorno

Las variables necesarias se encuentran en el archivo `.env.example`.

## Usuarios de prueba

mbarca89
Password: 123456

otro
Password: 123456

otrousuario2
Password: 123456

otrousuario3
Password: 123456

## Base de datos

La variable DB del env debe estar seteada en "pg" para usar la base de datos local.

El proyecto incluye el script necesario para crear la estructura de la base de datos local mediante:


```bash
npm run db:init
```

Popular la base de datos con:

```bash
npm run db:seed
```

## Despliegue

Aplicación en producción:

https://web2-sepia-chi.vercel.app/feed

Repositorio GitHub:

https://github.com/Mbarca89/web2

Video en Youtube:
https://www.youtube.com/watch?v=qi66PTLrGes

## Problemas encontrados durante el desarrollo

* Configuración y despliegue de la aplicación en Vercel.
    Tuve que cambiar el metodo usado para sesiones de usuario de express session a JWT
* Manejo y optimización de imágenes para evitar superar los límites de tamaño permitidos por Vercel.
    Vercel no aceptaba payloads muy grandes, asi que ademas de la implementacion de sharp, tuve que aplicar un compresor a nivel de browser para reducir el tamaño de las imagenes antes de subirlas a Vercel usando la libreria browser-image-compression.
* Organización de componentes Pug reutilizables.
    Mientras desarrollaba nuevos componentes y funcionalidades, surgieron algunos componentes como el modal o algunos scripts que necesitaba usarlos en multiples vistas, asi que decidi separarlas para reutilizarlas y evitar codigo duplicado.
* Implementación de relaciones complejas entre usuarios, publicaciones, comentarios, valoraciones y seguidores.
    No fue un problema de por si, pero si requirio cuidado extra para asegurarme que todo esta relacionado correctamente.
