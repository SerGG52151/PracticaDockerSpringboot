# ---- Stage 1: Build the frontend ----
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Build backend
FROM maven:3.9-eclipse-temurin-17 AS backend-build

WORKDIR /app/backend

COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

COPY backend/src ./src

# Copy the frontend build output into Spring Boot static resources
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static/

RUN mvn clean package -DskipTests

# Runtime 
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=backend-build /app/backend/target/*.jar practicaspringboot.jar

# Copy the data directory so items.json is available at runtime
COPY data ./data

EXPOSE 8080

ENV ITEMS_FILE_PATH=data/items.json

CMD ["java", "-jar", "practicaspringboot.jar"]