FROM node
#Imagen base: node, esto lo toma del dockerhub

WORKDIR /app
#Se crea una carpeta interna donde guardar el proyecto

COPY package.json .
#Se copia el package.json a la carpeta nueva

RUN npm install
#Instala todo

COPY . .
#Copiamos todo el codigo o archivos que faltan

EXPOSE 8080
#le decimos en el puerto en cual trabajamos

CMD [ "npm", "start" ]
#Tiene que ejecutar "npm start" para que funcione, configurar el script