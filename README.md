# Practica de Docker

Para construir la imagen usa el siguiente comando desde el directorio de practicaspringboot.

```bash
docker build -f backend/Dockerfile -t practicaspringboot .
```


Para correr la imagen, usa el siguiente comando desde el mismo directorio.

```bash
docker run -p 8080:8080 -v spring_items_data:/app/data practicaspringboot
```

Si ya tienes la imagen en .tar, usa el siguiente comando desde el directorio para cargar la imagen a tu ambiente de Docker. 

```bash
docker load -i practicaspringdocker.tar
```
