# Demo Angular


## Description
Desarrollado para fines demostrativos y prácticos con [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1, donde se plantean los siguientes requisitos:

- Realizar aplicación SPA con opciones de registro, login, perfil de usuario utilizando el framework boostrap como diseño de interfas. 

- Se desea restringuir el acceso algunas rutas para que solo  usuarios logeado puedan acceder

- Los campos de formularios deben tener validaciones y se debe mostrar los errores para cada campo.

- Se desea cargar imagen como avatar del perfil de usuario.

- Se desea que exista breadcrumb en cada página.

- Se desea mostrar notificaciones al usuario cuando una operación ha sido realizada correcta o incorrectamente.


## Desarrollo

- Se utilizan la plantilla [NiceAdmin](https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/) y se apdata para el framework Angular 13.1.0

- Se crean rutas y componentes para las páginas login, register, profile, contact, faq, tables, error404.

- Los formulario de [login](src\app\views\pages\login\login.component.ts), [registro](src\app\views\pages\register\register.component.ts) y [perfil](src\app\views\pages\profile\profile.component.ts) se hacen reactivos con validaciones. 

- Se crea las directivas **FormControlValidationDirective** y  **FormSubmitValidationDirective** para mostrar los errores de validacion en campos de formularios que reaccionen antes los eventos de modificación o submit.

- Se crea alert [component](src\app\components\alert\alert.component.ts) y [servicio](src\app\components\alert\alert.service.ts) con funcionalidades reactivas para mostrar mensajes de notificaciones.

- Se crea componente para la [carga de imagenes](src\app\components\upload-image\upload-image.component.ts) con atributos y eventos personalizables.

- Se crea componente para la creacion de menú o [navegación](src\app\components\nav\nav.component.ts)

- Se crea un [servicio](src\app\services\api.service.ts) para el acceso a todas las peticiones con el api rest como son login, registro, obtener y actualizar datos del perfil, cargar imagen en el servidor.

- Se controla el acceso por [JWT](https://github.com/auth0/angular2-jwt) a las [rutas](src\app\app-routing.module.ts) *home* y *profile* con la implemetación de la interfas [CanActivate](src\app\services\auth.guard.ts).

- Se crea [interceptor](src\app\http.interceptor.ts) http para agregar en headers el JWT de seguridad, asi como controlar los errores que puedan haber ocurrido en la petición.

- Se crea [Servicio](src\app\services\main.service.ts) para [reaccionar](src\app\containers\default-layout\default-layout.component.ts) antes las modifificaciones de los datos del usuario y de las rutas (para cambiar el titulo de la página y la creación del [breadcrumb](src\app\components\breadcrumb\breadcrumb.component.ts))


## Implementación de la solución

1. Clonar repositorio: https://github.com/yurisnel/InstaShareAngular
2. Descargar dependencias: npm install
3. Ejecutar servidor: npm start o ng serve
4. Abrir navegador en: http://localhost:4200/

<img
src="preview/profile.png"
raw=true
alt=""
style="margin:10px"
/>

**PD:** Este proyecto requiere de un Api Rest que esta desarrollado en  https://github.com/yurisnel/InstaShareApiNest


