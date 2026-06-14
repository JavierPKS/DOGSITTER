package com.apigateway.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import java.net.URI;

import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;
import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;

@Configuration
public class GatewayConfig {

    @Bean
    public RouterFunction<ServerResponse> usuariosRoute() {
        String host = System.getenv().getOrDefault("MS_USUARIOS_HOST", "localhost");
        URI uri = URI.create("http://" + host + ":8081");
        return route("ms-usuarios")
                .route(path("/api/v1/clientes/**"), http()).before(uri(uri))
                .route(path("/api/v1/clientes"), http()).before(uri(uri))
                .route(path("/api/v1/empleados/**"), http()).before(uri(uri))
                .route(path("/api/v1/empleados"), http()).before(uri(uri))
                .route(path("/api/v1/mascotas/**"), http()).before(uri(uri))
                .route(path("/api/v1/mascotas"), http()).before(uri(uri))
                .route(path("/api/v1/usuarios/**"), http()).before(uri(uri))
                .route(path("/api/v1/usuarios"), http()).before(uri(uri))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> catalogoRoute() {
        String host = System.getenv().getOrDefault("MS_CATALOGO_HOST", "localhost");
        URI uri = URI.create("http://" + host + ":8082");
        return route("ms-catalogo")
                .route(path("/api/v1/catalogo/**"), http()).before(uri(uri))
                .route(path("/api/v1/catalogo"), http()).before(uri(uri))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> eventosRoute() {
        String host = System.getenv().getOrDefault("MS_EVENTOS_HOST", "localhost");
        URI uri = URI.create("http://" + host + ":8083");
        return route("ms-eventos")
                .route(path("/api/v1/eventos/**"), http()).before(uri(uri))
                .route(path("/api/v1/eventos"), http()).before(uri(uri))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> operacionesRoute() {
        String host = System.getenv().getOrDefault("MS_OPERACIONES_HOST", "localhost");
        URI uri = URI.create("http://" + host + ":8084");
        return route("ms-operaciones")
                .route(path("/api/v1/operaciones/**"), http()).before(uri(uri))
                .route(path("/api/v1/operaciones"), http()).before(uri(uri))
                .route(path("/api/v1/turnos/**"), http()).before(uri(uri))
                .route(path("/api/v1/turnos"), http()).before(uri(uri))
                .route(path("/api/v1/incidentes/**"), http()).before(uri(uri))
                .route(path("/api/v1/incidentes"), http()).before(uri(uri))
                .route(path("/api/v1/staff/**"), http()).before(uri(uri))
                .route(path("/api/v1/staff"), http()).before(uri(uri))
                .route(path("/api/v1/gastronomia/**"), http()).before(uri(uri))
                .route(path("/api/v1/gastronomia"), http()).before(uri(uri))
                .route(path("/api/v1/minutas/**"), http()).before(uri(uri))
                .route(path("/api/v1/minutas"), http()).before(uri(uri))
                .build();
    }
}
