package com.devops.employeebackend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI employeeAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Employee Management API")

                        .version("1.0")

                        .description("Spring Boot CRUD Application")

                        .contact(new Contact()

                                .name("Your Name")

                                .email("your@email.com")

                        ));

    }

}