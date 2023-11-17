package br.com.spring.banco.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//indica que a classe é usada para configurar o aplicativo Spring
@Configuration

// é usada para habilitar a configuração padrão do Spring MVC.
// desabilita a configuração padrão do Spring e nos permite 
// fornecer nossa própria configuração personalizada, 
// como a configuração CORS neste caso.
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer{
	public void addCorsMappings(CorsRegistry registry) {
		// addCorsMappings é usado para configurar 
		//a política de CORS para o aplicativo
		registry.addMapping("/**")
			.allowedOrigins("*") // Permitir todos os origins
	        		.allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
	        		.allowedHeaders("*"); // Todos os cabeçalhos permitidos
	}
}

