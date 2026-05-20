-- =============================================================
-- BASE DE DATOS: db_eventos
-- MICROSERVICIO: Eventos
-- Descripción: Gestión de eventos, invitados, solicitudes de servicios.
-- =============================================================

CREATE TABLE evento (
    id_evento         SERIAL        PRIMARY KEY,
    id_cliente        INT           NOT NULL, -- Externa a db_usuarios
    id_mascota_bday   INT           NOT NULL, -- Externa a db_usuarios
    id_especie        INT           NOT NULL, -- Externa a db_catalogo
    id_tematica       INT           ,         -- Externa a db_catalogo
    id_lugar          INT           ,         -- Externa a db_catalogo
    id_estado         INT           NOT NULL, -- Externa a db_catalogo
    fecha_evento      DATE          NOT NULL,
    hora_inicio       TIME          NOT NULL,
    hora_fin          TIME,
    num_humanos       INT           NOT NULL CHECK (num_humanos >= 0),
    observaciones     TEXT,
    creado_en         TIMESTAMP     NOT NULL DEFAULT NOW(),
    actualizado_en    TIMESTAMP     NOT NULL DEFAULT NOW(),
    deleted_at        TIMESTAMP,
    CONSTRAINT chk_hora CHECK (hora_fin IS NULL OR hora_fin > hora_inicio)
);

CREATE INDEX idx_evento_cliente  ON evento(id_cliente);
CREATE INDEX idx_evento_fecha    ON evento(fecha_evento);
CREATE INDEX idx_evento_estado   ON evento(id_estado);

CREATE TABLE invitado_mascota (
    id_invitado       SERIAL  PRIMARY KEY,
    id_evento         INT     NOT NULL REFERENCES evento(id_evento),
    id_mascota        INT     NOT NULL, -- Externa a db_usuarios
    id_adulto_resp    INT     NOT NULL, -- Externa a db_usuarios
    confirmado        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (id_evento, id_mascota)
);

CREATE TABLE solicitud_servicio (
    id_solicitud_serv  SERIAL       PRIMARY KEY,
    id_evento          INT          NOT NULL REFERENCES evento(id_evento),
    id_tipo_servicio   INT          NOT NULL, -- Externa a db_catalogo
    cantidad           INT          NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    notas              TEXT,
    created_at         TIMESTAMP    NOT NULL DEFAULT NOW(),
    UNIQUE (id_evento, id_tipo_servicio)
);
