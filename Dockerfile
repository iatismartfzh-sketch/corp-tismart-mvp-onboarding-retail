# ETAPA 1: Build de Angular
FROM node:18-alpine as build-stage

WORKDIR /app

# Copiamos los package.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# --- PUNTO CLAVE ---
# Compilamos para producción definiendo la base-href
# Esto hace que todos los scripts y estilos apunten a /onboarding-retail/
RUN npm run build -- --configuration production --base-href /onboarding-retail/

# ETAPA 2: Servidor Nginx
FROM nginx:alpine as production-stage

# 1. Creamos la carpeta física que simula la URL
RUN mkdir -p /usr/share/nginx/html/onboarding-retail

# 2. Copiamos los archivos compilados
# OJO: En Angular modernos (v17+) la ruta suele ser dist/NOMBRE-PROYECTO/browser
# Si tu versión es antigua, quita la parte de /browser
COPY --from=build-stage /app/dist/onboarding-retail/browser /usr/share/nginx/html/onboarding-retail

# 3. Copiamos nuestra configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]