package io.github.cruet.swagger_explorer.config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket docket() {
		Docket docket = new Docket(DocumentationType.SWAGGER_2);
		docket.select().apis(RequestHandlerSelectors.withClassAnnotation(RestController.class)).build();
		docket.useDefaultResponseMessages(false);
		docket.apiInfo(getApiInfo());
		return docket;
	}

	private ApiInfo getApiInfo() {
		Contact contact = new Contact("Test", "http://test.hip", "test@emaail.com");
		return new ApiInfo("Api Documentation", "Api Documentation", "1.0", "urn:tos", contact, "", "",
				new ArrayList<>());
	}
}
