-- =============================================================
-- BASE DE DATOS: DogSitter Chile — Plataforma de Gestión de
--                Eventos Temáticos para Mascotas
-- Motor:         PostgreSQL 15
-- Normalización: Tercera Forma Normal (3FN)
-- Versión:       1.0  |  Proyecto académico — Ingeniería de Software
-- =============================================================

-- -------------------------------------------------------------
-- LIMPIEZA PREVIA (orden inverso a dependencias FK)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS marcaje_turno         CASCADE;
DROP TABLE IF EXISTS incidente             CASCADE;
DROP TABLE IF EXISTS tipo_incidente        CASCADE;
DROP TABLE IF EXISTS evento_staff          CASCADE;
DROP TABLE IF EXISTS rol_staff             CASCADE;
DROP TABLE IF EXISTS minuta_final          CASCADE;
DROP TABLE IF EXISTS bebestible            CASCADE;
DROP TABLE IF EXISTS tipo_bebestible       CASCADE;
DROP TABLE IF EXISTS menu_humano           CASCADE;
DROP TABLE IF EXISTS insumo_torta          CASCADE;
DROP TABLE IF EXISTS tipo_torta            CASCADE;
DROP TABLE IF EXISTS menu_canino           CASCADE;
DROP TABLE IF EXISTS menu_evento           CASCADE;
DROP TABLE IF EXISTS invitado_mascota      CASCADE;
DROP TABLE IF EXISTS solicitud_servicio    CASCADE;
DROP TABLE IF EXISTS tipo_servicio         CASCADE;
DROP TABLE IF EXISTS evento               CASCADE;
DROP TABLE IF EXISTS tematica             CASCADE;
DROP TABLE IF EXISTS estado_evento        CASCADE;
DROP TABLE IF EXISTS lugar                CASCADE;
DROP TABLE IF EXISTS empleado             CASCADE;
DROP TABLE IF EXISTS cargo                CASCADE;
DROP TABLE IF EXISTS mascota              CASCADE;
DROP TABLE IF EXISTS tamano_mascota       CASCADE;
DROP TABLE IF EXISTS especie              CASCADE;
DROP TABLE IF EXISTS cliente              CASCADE;
DROP TABLE IF EXISTS usuario              CASCADE;
DROP TABLE IF EXISTS rol_usuario          CASCADE;


-- =============================================================
-- 1. TABLAS DE CATÁLOGO / LOOKUP  (no dependen de otras)
-- =============================================================

-- -------------------------------------
-- 1.1 Roles de acceso al sistema
-- -------------------------------------
CREATE TABLE rol_usuario (
    id_rol        SERIAL       PRIMARY KEY,
    nombre_rol    VARCHAR(50)  NOT NULL UNIQUE,   -- 'CLIENTE', 'ADMINISTRADOR', 'STAFF'
    descripcion   TEXT
);

-- -------------------------------------
-- 1.2 Usuarios del sistema
-- -------------------------------------
CREATE TABLE usuario (
    id_usuario    SERIAL       PRIMARY KEY,
    email         VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol        INT          NOT NULL REFERENCES rol_usuario(id_rol),
    activo        BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en     TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- -------------------------------------
-- 1.3 Clientes (dueños de mascotas)
-- -------------------------------------
CREATE TABLE cliente (
    id_cliente    SERIAL       PRIMARY KEY,
    id_usuario    INT          NOT NULL UNIQUE REFERENCES usuario(id_usuario),
    nombre        VARCHAR(100) NOT NULL,
    apellido      VARCHAR(100) NOT NULL,
    telefono      VARCHAR(20),
    rut           VARCHAR(12)  UNIQUE           -- opcional, formato chileno
);

-- -------------------------------------
-- 1.4 Especies de mascotas
-- -------------------------------------
CREATE TABLE especie (
    id_especie    SERIAL      PRIMARY KEY,
    nombre        VARCHAR(60) NOT NULL UNIQUE   -- 'Canino', 'Felino', etc.
);

-- -------------------------------------
-- 1.5 Tamaños de mascota (para cálculo gastronómico)
-- -------------------------------------
CREATE TABLE tamano_mascota (
    id_tamano     SERIAL      PRIMARY KEY,
    nombre        VARCHAR(30) NOT NULL UNIQUE,  -- 'Pequeño', 'Mediano', 'Grande'
    albondigas    INT         NOT NULL,          -- multiplicador: 2 / 3 / 4
    CHECK (albondigas > 0)
);

-- -------------------------------------
-- 1.6 Mascotas
-- -------------------------------------
CREATE TABLE mascota (
    id_mascota    SERIAL       PRIMARY KEY,
    id_cliente    INT          NOT NULL REFERENCES cliente(id_cliente),
    id_especie    INT          NOT NULL REFERENCES especie(id_especie),
    id_tamano     INT          NOT NULL REFERENCES tamano_mascota(id_tamano),
    nombre        VARCHAR(100) NOT NULL,
    raza          VARCHAR(100),
    fecha_nac     DATE,
    peso_kg       NUMERIC(5,2)
);

-- -------------------------------------
-- 1.7 Cargos del personal operativo
-- -------------------------------------
CREATE TABLE cargo (
    id_cargo      SERIAL      PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,
    -- 'Coordinador','Monitor Canino','Garzón','Técnico Veterinario','Animador'
    descripcion   TEXT
);

-- -------------------------------------
-- 1.8 Empleados (staff)
-- -------------------------------------
CREATE TABLE empleado (
    id_empleado   SERIAL       PRIMARY KEY,
    id_usuario    INT          NOT NULL UNIQUE REFERENCES usuario(id_usuario),
    id_cargo      INT          NOT NULL REFERENCES cargo(id_cargo),
    nombre        VARCHAR(100) NOT NULL,
    apellido      VARCHAR(100) NOT NULL,
    telefono      VARCHAR(20),
    disponible    BOOLEAN      NOT NULL DEFAULT TRUE
);

-- -------------------------------------
-- 1.9 Lugares de evento
-- -------------------------------------
CREATE TABLE lugar (
    id_lugar      SERIAL       PRIMARY KEY,
    nombre        VARCHAR(120) NOT NULL,
    direccion     VARCHAR(200) NOT NULL,
    comuna        VARCHAR(80),
    ciudad        VARCHAR(80)  NOT NULL DEFAULT 'Santiago',
    aforo_maximo  INT          CHECK (aforo_maximo > 0)
);

-- -------------------------------------
-- 1.10 Estados de un evento
-- -------------------------------------
CREATE TABLE estado_evento (
    id_estado     SERIAL      PRIMARY KEY,
    nombre        VARCHAR(40) NOT NULL UNIQUE
    -- 'Solicitado','Aprobado','Rechazado','En Ejecución','Finalizado','Cancelado'
);

-- -------------------------------------
-- 1.11 Temáticas de evento
-- -------------------------------------
CREATE TABLE tematica (
    id_tematica   SERIAL       PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL UNIQUE,
    descripcion   TEXT
);

-- -------------------------------------
-- 1.12 Tipos de servicio adicional
-- -------------------------------------
CREATE TABLE tipo_servicio (
    id_tipo_servicio  SERIAL      PRIMARY KEY,
    nombre            VARCHAR(80) NOT NULL UNIQUE,
    descripcion       TEXT
    -- 'Menú Canino','Menú Humano','Decoración','Entretenimiento','Fotografía', etc.
);

-- -------------------------------------
-- 1.13 Tipos de torta canina
-- -------------------------------------
CREATE TABLE tipo_torta (
    id_tipo_torta   SERIAL      PRIMARY KEY,
    nombre          VARCHAR(60) NOT NULL UNIQUE  -- 'Vegana','Proteica','Fría'
);

-- -------------------------------------
-- 1.14 Tipos de bebestible
-- -------------------------------------
CREATE TABLE tipo_bebestible (
    id_tipo_beb   SERIAL      PRIMARY KEY,
    nombre        VARCHAR(60) NOT NULL UNIQUE,   -- 'Sin Alcohol','Con Alcohol'
    factor_litros NUMERIC(4,2),   -- litros por persona (1.0 sin alc)
    factor_unid   INT             -- unidades por persona (3 con alc)
);

-- -------------------------------------
-- 1.15 Roles de staff en evento (distinto de cargo general)
-- -------------------------------------
CREATE TABLE rol_staff (
    id_rol_staff  SERIAL      PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,
    descripcion   TEXT
);

-- -------------------------------------
-- 1.16 Tipos de incidente en bitácora
-- -------------------------------------
CREATE TABLE tipo_incidente (
    id_tipo_inc   SERIAL      PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,   -- 'Conducta','Salud','Accidente','Otro'
    genera_alerta BOOLEAN     NOT NULL DEFAULT FALSE
);


-- =============================================================
-- 2. ENTIDAD CENTRAL: EVENTO
-- =============================================================

CREATE TABLE evento (
    id_evento         SERIAL        PRIMARY KEY,
    id_cliente        INT           NOT NULL REFERENCES cliente(id_cliente),
    id_mascota_bday   INT           NOT NULL REFERENCES mascota(id_mascota),
    -- mascota cumpleañera (determina la especie permitida)
    id_especie        INT           NOT NULL REFERENCES especie(id_especie),
    -- desnormalización controlada para validar especie en regla de negocio
    id_tematica       INT           REFERENCES tematica(id_tematica),
    id_lugar          INT           REFERENCES lugar(id_lugar),
    id_estado         INT           NOT NULL REFERENCES estado_evento(id_estado),
    fecha_evento      DATE          NOT NULL,
    hora_inicio       TIME          NOT NULL,
    hora_fin          TIME,
    num_humanos       INT           NOT NULL CHECK (num_humanos >= 0),
    -- total de humanos adultos asistentes
    observaciones     TEXT,
    creado_en         TIMESTAMP     NOT NULL DEFAULT NOW(),
    actualizado_en    TIMESTAMP     NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_hora CHECK (hora_fin IS NULL OR hora_fin > hora_inicio)
);

-- Índices frecuentes
CREATE INDEX idx_evento_cliente  ON evento(id_cliente);
CREATE INDEX idx_evento_fecha    ON evento(fecha_evento);
CREATE INDEX idx_evento_estado   ON evento(id_estado);


-- =============================================================
-- 3. ASISTENTES MASCOTAS AL EVENTO
--    (Relación N:M entre Evento y Mascota)
--    Regla: misma especie que mascota cumpleañera
--    Regla: 1 adulto humano por mascota (se verifica por num_humanos = COUNT)
-- =============================================================

CREATE TABLE invitado_mascota (
    id_invitado       SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL REFERENCES evento(id_evento),
    id_mascota        INT     NOT NULL REFERENCES mascota(id_mascota),
    id_adulto_resp    INT     NOT NULL REFERENCES cliente(id_cliente),
    -- adulto responsable de ESTA mascota invitada
    confirmado        BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (id_evento, id_mascota)
);


-- =============================================================
-- 4. SERVICIOS SOLICITADOS POR EVENTO
--    (N:M Evento × TipoServicio con cantidad / notas)
-- =============================================================

CREATE TABLE solicitud_servicio (
    id_solicitud_serv  SERIAL       PRIMARY KEY,
    id_evento          INT          NOT NULL REFERENCES evento(id_evento),
    id_tipo_servicio   INT          NOT NULL REFERENCES tipo_servicio(id_tipo_servicio),
    cantidad           INT          NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    notas              TEXT,
    UNIQUE (id_evento, id_tipo_servicio)
);


-- =============================================================
-- 5. MENÚ DEL EVENTO (cabecera)
-- =============================================================

CREATE TABLE menu_evento (
    id_menu           SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL UNIQUE REFERENCES evento(id_evento),
    -- 1:1 con Evento
    generado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    aprobado          BOOLEAN   NOT NULL DEFAULT FALSE
);


-- =============================================================
-- 6. MENÚ CANINO (detalle calculado)
-- =============================================================

CREATE TABLE menu_canino (
    id_menu_canino    SERIAL        PRIMARY KEY,
    id_menu           INT           NOT NULL UNIQUE REFERENCES menu_evento(id_menu),
    perros_pequenos   INT           NOT NULL DEFAULT 0 CHECK (perros_pequenos >= 0),
    perros_medianos   INT           NOT NULL DEFAULT 0 CHECK (perros_medianos >= 0),
    perros_grandes    INT           NOT NULL DEFAULT 0 CHECK (perros_grandes >= 0),
    total_albondigas  INT           NOT NULL DEFAULT 0,
    -- (P×2)+(M×3)+(G×4)
    gramaje_proteina_kg NUMERIC(6,3) NOT NULL DEFAULT 0,
    -- (total_albóndigas / 10) × 0.25 kg
    id_tipo_torta     INT           REFERENCES tipo_torta(id_tipo_torta)
);


-- =============================================================
-- 7. INSUMOS DE TORTA CANINA
--    (depende del tipo de torta y del número de porciones)
--    Tabla separada para cumplir 3FN: los insumos dependen de
--    (id_menu_canino, id_tipo_torta) → los sacamos a su propia tabla
-- =============================================================

CREATE TABLE insumo_torta (
    id_insumo         SERIAL        PRIMARY KEY,
    id_menu_canino    INT           NOT NULL REFERENCES menu_canino(id_menu_canino),
    id_tipo_torta     INT           NOT NULL REFERENCES tipo_torta(id_tipo_torta),
    nombre_insumo     VARCHAR(100)  NOT NULL,  -- 'Avena', 'Plátano', 'Carne/Pollo', …
    cantidad_kg       NUMERIC(8,3)  NOT NULL,
    unidades          INT                       -- para insumos en unidades (huevos)
);


-- =============================================================
-- 8. MENÚ HUMANO
-- =============================================================

CREATE TABLE menu_humano (
    id_menu_humano    SERIAL        PRIMARY KEY,
    id_menu           INT           NOT NULL UNIQUE REFERENCES menu_evento(id_menu),
    total_humanos     INT           NOT NULL CHECK (total_humanos >= 0),
    unid_finger_food  INT           NOT NULL DEFAULT 0,
    -- total_humanos × 3
    kg_carne_sliders  NUMERIC(8,3)  NOT NULL DEFAULT 0,
    -- unid_finger_food × 0.04 kg
    tablas_picoteo    INT           NOT NULL DEFAULT 0,
    -- total_humanos / 10
    litros_sin_alc    NUMERIC(8,2)  NOT NULL DEFAULT 0,
    -- total_humanos × 1 L
    unid_con_alc      INT           NOT NULL DEFAULT 0
    -- total_humanos × 3 unidades
);


-- =============================================================
-- 9. BEBESTIBLES (desglose si se necesita granularidad)
-- =============================================================

CREATE TABLE bebestible (
    id_bebestible     SERIAL        PRIMARY KEY,
    id_menu_humano    INT           NOT NULL REFERENCES menu_humano(id_menu_humano),
    id_tipo_beb       INT           NOT NULL REFERENCES tipo_bebestible(id_tipo_beb),
    cantidad          NUMERIC(8,2)  NOT NULL CHECK (cantidad >= 0),
    -- litros o unidades según tipo
    UNIQUE (id_menu_humano, id_tipo_beb)
);


-- =============================================================
-- 10. ASIGNACIÓN DE STAFF AL EVENTO
--     Reglas automáticas:
--       Coordinador  = 1 fijo
--       Monitor can. = CEIL(N_perros / 5)
--       Garzón       = CEIL(N_humanos / 10)
--       Vet. Guardia = 1 obligatorio
-- =============================================================

CREATE TABLE evento_staff (
    id_evento_staff   SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL REFERENCES evento(id_evento),
    id_empleado       INT     NOT NULL REFERENCES empleado(id_empleado),
    id_rol_staff      INT     NOT NULL REFERENCES rol_staff(id_rol_staff),
    asignado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (id_evento, id_empleado)
);

CREATE INDEX idx_evento_staff_evento   ON evento_staff(id_evento);
CREATE INDEX idx_evento_staff_empleado ON evento_staff(id_empleado);


-- =============================================================
-- 11. MARCAJE DE TURNO (staff en ejecución)
-- =============================================================

CREATE TABLE marcaje_turno (
    id_marcaje      SERIAL    PRIMARY KEY,
    id_evento_staff INT       NOT NULL REFERENCES evento_staff(id_evento_staff),
    inicio_turno    TIMESTAMP NOT NULL,
    fin_turno       TIMESTAMP,
    CONSTRAINT chk_turno CHECK (fin_turno IS NULL OR fin_turno > inicio_turno)
);


-- =============================================================
-- 12. BITÁCORA DE INCIDENTES
-- =============================================================

CREATE TABLE incidente (
    id_incidente    SERIAL    PRIMARY KEY,
    id_evento       INT       NOT NULL REFERENCES evento(id_evento),
    id_evento_staff INT       NOT NULL REFERENCES evento_staff(id_evento_staff),
    -- quién reporta
    id_tipo_inc     INT       NOT NULL REFERENCES tipo_incidente(id_tipo_inc),
    id_mascota      INT       REFERENCES mascota(id_mascota),
    -- mascota involucrada (opcional)
    descripcion     TEXT      NOT NULL,
    registrado_en   TIMESTAMP NOT NULL DEFAULT NOW(),
    resuelto        BOOLEAN   NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_incidente_evento ON incidente(id_evento);


-- =============================================================
-- 13. MINUTA FINAL
-- =============================================================

CREATE TABLE minuta_final (
    id_minuta         SERIAL    PRIMARY KEY,
    id_evento         INT       NOT NULL UNIQUE REFERENCES evento(id_evento),
    -- 1:1 con Evento
    generado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    url_pdf           TEXT,
    -- ruta o URL del archivo generado
    resumen_menu      TEXT,
    resumen_staff     TEXT,
    resumen_incidentes TEXT,
    enviado_cliente   BOOLEAN   NOT NULL DEFAULT FALSE
);


-- =============================================================
-- 14. DATOS SEMILLA (Inserts de catálogos)
-- =============================================================

-- Roles de usuario
INSERT INTO rol_usuario (nombre_rol, descripcion) VALUES
  ('CLIENTE',        'Dueño de mascota que solicita eventos'),
  ('ADMINISTRADOR',  'Gestiona el negocio y aprueba reservas'),
  ('STAFF',          'Personal operativo del evento');

-- Especies
INSERT INTO especie (nombre) VALUES
  ('Canino'),
  ('Felino');

-- Tamaños de mascota (con multiplicador de albóndigas)
INSERT INTO tamano_mascota (nombre, albondigas) VALUES
  ('Pequeño', 2),
  ('Mediano', 3),
  ('Grande',  4);

-- Cargos del personal
INSERT INTO cargo (nombre, descripcion) VALUES
  ('Coordinador',        'Responsable general del evento (1 fijo por evento)'),
  ('Monitor Canino',     'Supervisión y cuidado de mascotas (1 cada 5 perros)'),
  ('Garzón',             'Atención al público humano (1 cada 10 humanos)'),
  ('Técnico Veterinario','Guardia sanitaria obligatoria en cada evento'),
  ('Animador',           'Entretenimiento temático del evento');

-- Estados del evento
INSERT INTO estado_evento (nombre) VALUES
  ('Solicitado'),
  ('Aprobado'),
  ('Rechazado'),
  ('En Ejecución'),
  ('Finalizado'),
  ('Cancelado');

-- Tipos de torta canina
INSERT INTO tipo_torta (nombre) VALUES
  ('Vegana'),
  ('Proteica'),
  ('Fría');

-- Tipos de bebestible
INSERT INTO tipo_bebestible (nombre, factor_litros, factor_unid) VALUES
  ('Sin Alcohol', 1.00, NULL),
  ('Con Alcohol', NULL,    3);

-- Tipos de incidente
INSERT INTO tipo_incidente (nombre, genera_alerta) VALUES
  ('Conducta',  FALSE),
  ('Salud',     TRUE),
  ('Accidente', TRUE),
  ('Otro',      FALSE);

-- Roles de staff en evento
INSERT INTO rol_staff (nombre, descripcion) VALUES
  ('Coordinador de Evento',  'Lidera la operación en terreno'),
  ('Monitor Canino',         'Cuida y supervisa mascotas durante el evento'),
  ('Garzón',                 'Sirve menú humano y atiende a los invitados'),
  ('Técnico Veterinario',    'Guardia sanitaria, actúa ante incidentes de salud'),
  ('Animador',               'Conduce actividades y entretenimiento temático');

-- Tipos de servicio
INSERT INTO tipo_servicio (nombre, descripcion) VALUES
  ('Menú Canino',     'Albóndigas, torta y bocados especie-seguros para mascotas'),
  ('Menú Humano',     'Finger food, sliders, tablas de picoteo y bebestibles'),
  ('Decoración',      'Ambientación temática del espacio'),
  ('Entretenimiento', 'Animador y actividades interactivas'),
  ('Fotografía',      'Registro fotográfico del evento'),
  ('Bolsa Sorpresa',  'Pack de recuerdo para cada mascota invitada');

-- Temáticas de ejemplo
INSERT INTO tematica (nombre, descripcion) VALUES
  ('Paw Patrol',         'Temática de patrulla canina'),
  ('Selva',              'Decoración selvática con animales'),
  ('Marinero',           'Temática náutica y de playa'),
  ('Princesa',           'Temática de cuentos de princesas'),
  ('Superheroes',        'Temática de personajes heroicos'),
  ('Sin Temática',       'Evento sin decoración temática específica');


-- =============================================================
-- FIN DEL SCRIPT
-- =============================================================