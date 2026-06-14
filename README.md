# DOGSITTER 🐾

![Logo DogSitter](https://i.postimg.cc/SRp68095/logo-dogsitter.png)

Proyecto DOGSITTER - Plataforma integral de servicios para mascotas

## 📋 Descripción

DOGSITTER es una plataforma integral desarrollada como proyecto final de Ingeniería de Software, diseñada para conectar a dueños de mascotas con proveedores de servicios confiables. La plataforma ofrece gestión de usuarios, catálogo de servicios, eventos relacionados con mascotas y operaciones de reserva.

## 🚀 Características Principales

- **Arquitectura de Microservicios**: Sistema distribuido con servicios independientes para usuarios, catálogos, eventos y operaciones
- **API Gateway**: Punto de entrada unificado para todas las solicitudes externas
- **Autenticación y Autorización**: Sistema seguro con JWT y roles personalizados
- **Notificaciones en Tiempo Real**: Implementación con WebSocket
- **Frontend Moderno**: Interfaz de usuario responsive y amigable
- **Persistencia SQL**: Bases de datos PostgreSQL para todos los microservicios
- **Orquestación con Docker**: Despliegue sencillo con Docker Compose

## 🛠️ Stack Tecnológico

### Backend
- **Java 21**
- **Spring Boot 3.5.x**
- **Spring Data JPA**
- **Spring Security**
- **JWT (Java Web Token)**
- **PostgreSQL**
- **WebSocket**
- **RabbitMQ** (integración con Spring Cloud Stream)

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (vanilla)**
- **Nginx** (servidor web)

### Infraestructura
- **Docker**
- **Docker Compose**

## 📦 Microservicios Incluidos

1. **ms-usuarios**: Gestión de usuarios y autenticación
2. **catalogo**: Catálogo de servicios y proveedores
3. **service-eventos**: Eventos relacionados con mascotas
4. **operaciones**: Gestión de reservas y operaciones
5. **gateway**: API Gateway con Spring Cloud Gateway

## 📁 Estructura del Proyecto

```
Backend/
├── gateway/               # API Gateway
├── ms-usuarios/           # Microservicio de usuarios
├── catalogo/              # Microservicio de catálogos
├── service-eventos/       # Microservicio de eventos
└── operaciones/           # Microservicio de operaciones

Frontend/
├── index.html             # Página principal
├── servicios.html         # Catálogo de servicios
├── registrarse.html       # Registro de usuarios
├── iniciar-sesion.html    # Inicio de sesión
├── evento.html            # Detalles del evento
├── mis-eventos.html       # Eventos del usuario
├── mis-servicios.html     # Servicios del usuario
├── perfil.html            # Perfil de usuario
├── style.css              # Estilos CSS
└── data.js                # Datos de ejemplo

ScriptsBD/
├── db_catalogo.sql
├── db_eventos.sql
├── db_operaciones.sql
├── db_usuarios.sql

docker-compose.yml         # Orquestación de contenedores
```

## ⚙️ Instalación y Ejecución

### Requisitos Previos
- **Docker** y **Docker Compose** instalados
- **Java 21** (JDK) instalado localmente
- **Maven** (para desarrollo local)

### Opción 1: Ejecución con Docker Compose (Recomendada)

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd DOGSITTER
   ```

2. **Arrancar la infraestructura**:
   ```bash
   docker compose up --build
   ```

3. **Acceder a la aplicación**:
   - **Frontend**: [http://localhost](http://localhost)
   - **API Gateway**: [http://localhost:9090](http://localhost:9090)
   - **Documentación Swagger**:
     - Usuarios: [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)
     - Catálogo: [http://localhost:8082/swagger-ui/index.html](http://localhost:8082/swagger-ui/index.html)
     - Eventos: [http://localhost:8083/swagger-ui/index.html](http://localhost:8083/swagger-ui/index.html)
     - Operaciones: [http://localhost:8084/swagger-ui/index.html](http://localhost:8084/swagger-ui/index.html)

4. **Detener la aplicación**:
   ```bash
   docker compose down
   ```

### Opción 2: Ejecución Local (Desarrollo)

#### Backend

1. **Compilar y ejecutar cada microservicio**:
   ```bash
   cd Backend/ms-usuarios
   mvn spring-boot:run
   
   cd ../catalogo
   mvn spring-boot:run
   
   cd ../service-eventos
   mvn spring-boot:run
   
   cd ../operaciones
   mvn spring-boot:run
   ```

2. **Acceder a la API Gateway**:
   - [http://localhost:8080](http://localhost:8080)

#### Frontend

1. **Abrir el archivo index.html** en un navegador moderno:
   ```bash
   xdg-open Frontend/index.html
   ```

## 🔌 Pruebas de Integración

### Secuencia de Uso Recomendada

1. **Registro de Usuario** (ms-usuarios):
   - Crear cuenta como "cliente" o "proveedor"
   - Verificar creación en base de datos:
     ```bash
     docker compose exec db-usuarios psql -U postgres -c "SELECT * FROM usuarios;"
     ```

2. **Inicio de Sesión** (ms-usuarios):
   - Obtener token JWT

3. **Explorar Servicios** (catalogo):
   - [http://localhost](http://localhost) -> Servicios -> Ver todos los servicios

4. **Solicitar Servicio** (operaciones):
   - Crear solicitud de reserva
   - Verificar estado en base de datos:
     ```bash
     docker compose exec db-operaciones psql -U postgres -c "SELECT * FROM solicitudes_servicio;"
     ```

5. **Explorar Eventos** (service-eventos):
   - [http://localhost](http://localhost) -> Eventos -> Ver eventos disponibles

## 📊 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Web Browser)                                 │
│  http://localhost                                       │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│  API Gateway (Spring Cloud Gateway)                     │
│  http://localhost:9090                                  │
└─────────────────────────────────────────────────────────┘
                              │
       ┌──────────┬──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│  ms-   │  │ ms-    │  │ ms-    │  │ ms-    │  │  Rabbit │
│usuarios│  │catalogo│  │eventos │  │operac. │  │  MQ    │
└────────┘  └────────┘  └────────┘  └────────┘  └────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ db-    │  │ db-    │  │ db-    │  │ db-    │  │Rabbit  │
│usuarios│  │catalogo│  │eventos │  │operac. │  │images  │
└────────┘  └────────┘  └────────┘  └────────┘  └────────┘
```

## 📈 Estadísticas del Proyecto

- **Líneas de Código**: ~2,500+ LOC
- **Microservicios**: 5
- **Bases de Datos**: 4 (PostgreSQL)
