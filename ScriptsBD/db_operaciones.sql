-- =============================================================
-- BASE DE DATOS: db_operaciones
-- MICROSERVICIO: Operaciones y Menú
-- Descripción: Cálculo de menús, asignación de staff, incidentes y minutas.
-- =============================================================

CREATE TABLE menu_evento (
    id_menu           SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL UNIQUE, -- Externa a db_eventos
    generado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    aprobado          BOOLEAN   NOT NULL DEFAULT FALSE,
    deleted_at        TIMESTAMP
);

CREATE TABLE menu_canino (
    id_menu_canino    SERIAL        PRIMARY KEY,
    id_menu           INT           NOT NULL UNIQUE REFERENCES menu_evento(id_menu),
    perros_pequenos   INT           NOT NULL DEFAULT 0 CHECK (perros_pequenos >= 0),
    perros_medianos   INT           NOT NULL DEFAULT 0 CHECK (perros_medianos >= 0),
    perros_grandes    INT           NOT NULL DEFAULT 0 CHECK (perros_grandes >= 0),
    total_albondigas  INT           NOT NULL DEFAULT 0,
    gramaje_proteina_kg NUMERIC(6,3) NOT NULL DEFAULT 0,
    id_tipo_torta     INT           -- Externa a db_catalogo
);

CREATE TABLE insumo_torta (
    id_insumo         SERIAL        PRIMARY KEY,
    id_menu_canino    INT           NOT NULL REFERENCES menu_canino(id_menu_canino),
    id_tipo_torta     INT           NOT NULL, -- Externa a db_catalogo
    nombre_insumo     VARCHAR(100)  NOT NULL,
    cantidad_kg       NUMERIC(8,3)  NOT NULL,
    unidades          INT
);

CREATE TABLE menu_humano (
    id_menu_humano    SERIAL        PRIMARY KEY,
    id_menu           INT           NOT NULL UNIQUE REFERENCES menu_evento(id_menu),
    total_humanos     INT           NOT NULL CHECK (total_humanos >= 0),
    unid_finger_food  INT           NOT NULL DEFAULT 0,
    kg_carne_sliders  NUMERIC(8,3)  NOT NULL DEFAULT 0,
    tablas_picoteo    INT           NOT NULL DEFAULT 0,
    litros_sin_alc    NUMERIC(8,2)  NOT NULL DEFAULT 0,
    unid_con_alc      INT           NOT NULL DEFAULT 0
);

CREATE TABLE bebestible (
    id_bebestible     SERIAL        PRIMARY KEY,
    id_menu_humano    INT           NOT NULL REFERENCES menu_humano(id_menu_humano),
    id_tipo_beb       INT           NOT NULL, -- Externa a db_catalogo
    cantidad          NUMERIC(8,2)  NOT NULL CHECK (cantidad >= 0),
    UNIQUE (id_menu_humano, id_tipo_beb)
);

CREATE TABLE evento_staff (
    id_evento_staff   SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL, -- Externa a db_eventos
    id_empleado       INT     NOT NULL, -- Externa a db_usuarios
    id_rol_staff      INT     NOT NULL, -- Externa a db_catalogo
    asignado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (id_evento, id_empleado)
);

CREATE INDEX idx_evento_staff_evento   ON evento_staff(id_evento);

CREATE TABLE marcaje_turno (
    id_marcaje      SERIAL    PRIMARY KEY,
    id_evento_staff INT       NOT NULL REFERENCES evento_staff(id_evento_staff),
    inicio_turno    TIMESTAMP NOT NULL,
    fin_turno       TIMESTAMP,
    CONSTRAINT chk_turno CHECK (fin_turno IS NULL OR fin_turno > inicio_turno)
);

CREATE TABLE incidente (
    id_incidente    SERIAL    PRIMARY KEY,
    id_evento       INT       NOT NULL, -- Externa a db_eventos
    id_evento_staff INT       NOT NULL REFERENCES evento_staff(id_evento_staff),
    id_tipo_inc     INT       NOT NULL, -- Externa a db_catalogo
    id_mascota      INT       ,         -- Externa a db_usuarios
    descripcion     TEXT      NOT NULL,
    registrado_en   TIMESTAMP NOT NULL DEFAULT NOW(),
    resuelto        BOOLEAN   NOT NULL DEFAULT FALSE,
    deleted_at      TIMESTAMP
);

CREATE INDEX idx_incidente_evento ON incidente(id_evento);

CREATE TABLE minuta_final (
    id_minuta         SERIAL    PRIMARY KEY,
    id_evento         INT       NOT NULL UNIQUE, -- Externa a db_eventos
    generado_en       TIMESTAMP NOT NULL DEFAULT NOW(),
    url_pdf           TEXT,
    resumen_menu      TEXT,
    resumen_staff     TEXT,
    resumen_incidentes TEXT,
    enviado_cliente   BOOLEAN   NOT NULL DEFAULT FALSE
);
