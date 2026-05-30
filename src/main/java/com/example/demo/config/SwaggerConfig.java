package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Server server = new Server();
        server.setUrl("/"); // Relative path to handle both http and https automatically
        
        return new OpenAPI()
                .servers(List.of(server))
                .info(new Info()
                        .title("Excuse API Specification")
                        .description("API documentation for the Excuse and Comment service")
                        .version("v0.0.1"));
    }
}
