-- =============================================================
-- BASE DE DATOS: db_catalogo
-- MICROSERVICIO: Catálogos
-- Descripción: Datos maestros, especies, temáticas, servicios.
-- =============================================================

CREATE TABLE especie (
    id_especie    SERIAL      PRIMARY KEY,
    nombre        VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE tamano_mascota (
    id_tamano     SERIAL      PRIMARY KEY,
    nombre        VARCHAR(30) NOT NULL UNIQUE,
    albondigas    INT         NOT NULL,
    CHECK (albondigas > 0)
);

CREATE TABLE lugar (
    id_lugar      SERIAL       PRIMARY KEY,
    nombre        VARCHAR(120) NOT NULL,
    direccion     VARCHAR(200) NOT NULL,
    comuna        VARCHAR(80),
    ciudad        VARCHAR(80)  NOT NULL DEFAULT 'Santiago',
    aforo_maximo  INT          CHECK (aforo_maximo > 0),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE tematica (
    id_tematica   SERIAL       PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL UNIQUE,
    descripcion   TEXT,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    deleted_at    TIMESTAMP
);

CREATE TABLE tipo_servicio (
    id_tipo_servicio  SERIAL      PRIMARY KEY,
    nombre            VARCHAR(80) NOT NULL UNIQUE,
    descripcion       TEXT
);

CREATE TABLE tipo_torta (
    id_tipo_torta   SERIAL      PRIMARY KEY,
    nombre          VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE tipo_bebestible (
    id_tipo_beb   SERIAL      PRIMARY KEY,
    nombre        VARCHAR(60) NOT NULL UNIQUE,
    factor_litros NUMERIC(4,2),
    factor_unid   INT
);

CREATE TABLE rol_staff (
    id_rol_staff  SERIAL      PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,
    descripcion   TEXT
);

CREATE TABLE tipo_incidente (
    id_tipo_inc   SERIAL      PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,
    genera_alerta BOOLEAN     NOT NULL DEFAULT FALSE
);

CREATE TABLE estado_evento (
    id_estado     SERIAL      PRIMARY KEY,
    nombre        VARCHAR(40) NOT NULL UNIQUE
);

-- Datos Semilla
INSERT INTO especie (nombre) VALUES ('Canino'), ('Felino');

INSERT INTO tamano_mascota (nombre, albondigas) VALUES
  ('Pequeño', 2), ('Mediano', 3), ('Grande',  4);

INSERT INTO tipo_torta (nombre) VALUES
  ('Vegana'), ('Proteica'), ('Fría');

INSERT INTO tipo_bebestible (nombre, factor_litros, factor_unid) VALUES
  ('Sin Alcohol', 1.00, NULL), ('Con Alcohol', NULL, 3);

INSERT INTO rol_staff (nombre, descripcion) VALUES
  ('Coordinador de Evento',  'Lidera la operación en terreno'),
  ('Monitor Canino',         'Cuida y supervisa mascotas durante el evento'),
  ('Garzón',                 'Sirve menú humano y atiende a los invitados'),
  ('Técnico Veterinario',    'Guardia sanitaria, actúa ante incidentes de salud'),
  ('Animador',               'Conduce actividades y entretenimiento temático');

INSERT INTO tipo_incidente (nombre, genera_alerta) VALUES
  ('Conducta',  FALSE), ('Salud', TRUE), ('Accidente', TRUE), ('Otro', FALSE);

INSERT INTO estado_evento (nombre) VALUES
  ('Solicitado'), ('Aprobado'), ('Rechazado'), ('En Ejecución'), ('Finalizado'), ('Cancelado');

INSERT INTO tipo_servicio (nombre, descripcion) VALUES
  ('Menú Canino',     'Albóndigas, torta y bocados especie-seguros para mascotas'),
  ('Menú Humano',     'Finger food, sliders, tablas de picoteo y bebestibles'),
  ('Decoración',      'Ambientación temática del espacio'),
  ('Entretenimiento', 'Animador y actividades interactivas'),
  ('Fotografía',      'Registro fotográfico del evento'),
  ('Bolsa Sorpresa',  'Pack de recuerdo para cada mascota invitada');

INSERT INTO tematica (nombre, descripcion) VALUES
  ('Paw Patrol',         'Temática de patrulla canina'),
  ('Selva',              'Decoración selvática con animales'),
  ('Marinero',           'Temática náutica y de playa'),
  ('Princesa',           'Temática de cuentos de princesas'),
  ('Superheroes',        'Temática de personajes heroicos'),
  ('Sin Temática',       'Evento sin decoración temática específica');
