# SIGPRES - CMB
## Sistema Integrado de Gestión Presupuestal - Contraloría Municipal de Baruta

---
### Requerimientos necesarios
 - Node.js LTS (versión actual al 26/04/2019: 10.15.3)
 - PostgreSQL v9.6 o superior.

### Instrucciones de uso
1) Crear un fork de este repositorio.
2) Clonar el repositorio. 
3) Acceder al directorio raíz del repositorio y ejecutar el comando `npm install`. Posteriormente, ingresar a la carpeta `client` dentro del directorio raíz del repositorio y ejecutar nuevamente `npm install`.
4) Colocar el archivo `.env` en el directorio raíz del repositorio. (*)
5) Instalar de manera global el paquete de NPM llamado `sequelize`, ejecutando el comando: `npm install -g sequelize`. Adicionalmente instalar de manera global el paquete de NPM llamado `nodemon`, ejecutando el comando `npm install -g nodemon`. 
6) Crear una base de datos en Postgres que se llame `sigpres_dev`.
7) Ejecutar las migraciones para poder crear las tablas necesarias para el funcionamiento del sistema. En un terminal, estando en el directorio raíz del repositorio, ejecutar el comando `sequelize db:migrate`. 
8) Una vez ejecutadas las migraciones, estando en el directorio raíz del repositorio, ejecutar el comando `npm seed-db`. Este comando inicializa la base de datos con información básica de prueba para poder hacer un uso mínimo del sistema. 
9) Para ejecutar el sistema, se debe ejecutar en un terminal que se encuentre posicionado en la raíz del directorio del repositorio el comando `npm start`, y se debe ejecutar el mismo comando, pero en otro terminal ubicado en la carpeta `client` dentro de la raíz del directorio del repositorio. Estos comandos iniciarán el backend y el front end del sistema respectivamente.

\*: Contactar a la profesora Marla Corniel al correo `mcorniel [at] usb [dot] ve` para que proporcione el archivo `.env`. Para cualquier duda, contactar con ella. También se recomienda solicitar y revisar el Manual/Informe técnico del sistema el cual ofrece instrucciones sobre el sistema.

### Despliegue del sistema en producción (Heroku)
Actualmente el sistema se encuentra alojado en un dyno en Heroku asociado a la cuenta de correo creada para el desarrollo del sistema. Cada vez que se introduce un nuevo cambio en la rama `master` del repositorio, estos cambios son desplegados en Heroku. Contactar a la prof. Marla Corniel para que coordine el traspaso de la información de acceso a la cuenta de Heroku del sistema  a los nuevos desarrolladores que continuarán con el desarrollo de SIGPRES - CMB. De esta manera, podrán actualizar la configuración de despligue continuo en Heroku para que los nuevos cambios que se introduzcan en la rama master del nuevo repositorio, se desplieguen también en la aplicación de Heroku. Para poder configurar el nuevo repositorio en la aplicación de Heroku, se debe acceder a la cuenta de Heroku del sistema, agregar a los nuevos desarrolladores como colaboradores, y luego en el apartado de `Deploy` se debe actualizar el repositorio de Github configurado. Por esta razón, se recomienda que se utilice la metodología de trabajo denominada [git flow](https://nvie.com/posts/a-successful-git-branching-model/) con el fin de mantener ramas en donde se trabajen los nuevos features a ser introducidos, y una vez que hayan sido suficientemente testeados, se unan a `master`. 

### Recomendaciones para futuros desarrollos
 - Documentar el API con una herramienta como [Swagger](https://swagger.io/). 
 - Elaborar una suite de pruebas de los endpoints del backend con una herramienta como [Postman](https://www.getpostman.com/). 
 - Evaluar la actualización de la versión de React utilizada para introducir el uso de [React Hooks](https://reactjs.org/docs/hooks-intro.html), lo cual puede repercutir positivamente en el performance de la aplicación.
  - En un principio el sistema se llamó SICMB, siglas de Sistema Integrado de la Contraloría Municipal de Baruta. Posteriormente se cambió su nombre a SIGPRES. Actualizar las referencias que aún existan de SICMB a SIGPRES. 
