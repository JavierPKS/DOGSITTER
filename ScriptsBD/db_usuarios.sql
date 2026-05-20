-- =============================================================
-- BASE DE DATOS: db_usuarios
-- MICROSERVICIO: Usuarios y Seguridad
-- Descripción: Gestión de usuarios, clientes, empleados y mascotas.
-- =============================================================

CREATE TABLE rol_usuario (
    id_rol        SERIAL       PRIMARY KEY,
    nombre_rol    VARCHAR(50)  NOT NULL UNIQUE,
    descripcion   TEXT,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE usuario (
    id_usuario    SERIAL       PRIMARY KEY,
    email         VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol        INT          NOT NULL REFERENCES rol_usuario(id_rol),
    activo        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE cliente (
    id_cliente    SERIAL       PRIMARY KEY,
    id_usuario    INT          NOT NULL UNIQUE REFERENCES usuario(id_usuario),
    nombre        VARCHAR(100) NOT NULL,
    apellido      VARCHAR(100) NOT NULL,
    telefono      VARCHAR(20),
    rut           VARCHAR(12)  UNIQUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE cargo (
    id_cargo      SERIAL       PRIMARY KEY,
    nombre        VARCHAR(80)  NOT NULL UNIQUE,
    descripcion   TEXT,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE empleado (
    id_empleado   SERIAL       PRIMARY KEY,
    id_usuario    INT          NOT NULL UNIQUE REFERENCES usuario(id_usuario),
    id_cargo      INT          NOT NULL REFERENCES cargo(id_cargo),
    nombre        VARCHAR(100) NOT NULL,
    apellido      VARCHAR(100) NOT NULL,
    telefono      VARCHAR(20),
    disponible    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE mascota (
    id_mascota    SERIAL       PRIMARY KEY,
    id_cliente    INT          NOT NULL REFERENCES cliente(id_cliente),
    id_especie    INT          NOT NULL, -- Referencia externa a db_catalogo.especie
    id_tamano     INT          NOT NULL, -- Referencia externa a db_catalogo.tamano_mascota
    nombre        VARCHAR(100) NOT NULL,
    raza          VARCHAR(100),
    fecha_nac     DATE,
    peso_kg       NUMERIC(5,2),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

-- Datos semilla
INSERT INTO rol_usuario (nombre_rol, descripcion) VALUES
  ('CLIENTE',        'Dueño de mascota que solicita eventos'),
  ('ADMINISTRADOR',  'Gestiona el negocio y aprueba reservas'),
  ('STAFF',          'Personal operativo del evento');

INSERT INTO cargo (nombre, descripcion) VALUES
  ('Coordinador',        'Responsable general del evento (1 fijo por evento)'),
  ('Monitor Canino',     'Supervisión y cuidado de mascotas (1 cada 5 perros)'),
  ('Garzón',             'Atención al público humano (1 cada 10 humanos)'),
  ('Técnico Veterinario','Guardia sanitaria obligatoria en cada evento'),
  ('Animador',           'Entretenimiento temático del evento');
