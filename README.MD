# Pasos para la Ejecución
## 1.	Clona el Repositorio:
Abre una terminal en tu sistema y clona el repositorio de GitHub en tu directorio de trabajo local.
git clone https://github.com/Manuuflorez/Proyecto.git
## 2.	Instala las Dependencias:
Ve al directorio raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias.
npm install 
## 3.	Configura la Base de Datos:
Asegúrate de que tu base de datos esté configurada correctamente. Puedes modificar la configuración de la base de datos en el archivo de configuración app.js, además puedes usar los scripts que están en el archivo db.sql en la carpeta database. 
## 4.	Inicia el Servidor de Desarrollo:
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando.
npm run dev 
Este comando iniciará el servidor Express y estará escuchando en http://localhost:3000. Puedes acceder a la aplicación en tu navegador web utilizando esta URL.
