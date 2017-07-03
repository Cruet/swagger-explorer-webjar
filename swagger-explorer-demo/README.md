## This is a demo for the [swagger-explorer-webjar](../swagger-explorer-webjar)

Consider that you have a spring-projects/spring-boot project, and at least you configure swagger api documentation with springfox/springfox as follows (this will create '/v2/api-docs' endpoint)

```java
...
	@Bean
	public Docket docket() {
		Docket docket = new Docket(DocumentationType.SWAGGER_2);
		docket.select().apis(RequestHandlerSelectors.withClassAnnotation(RestController.class)).build();
		docket.useDefaultResponseMessages(false);
		docket.apiInfo(getApiInfo());
		return docket;
	}
```


To enable Swagger Explorer Ui just add [swagger-explorer-webjar](../swagger-explorer-webjar) as a dependency!

```java
...
		<dependency>
			<groupId>io.github.cruet</groupId>
			<artifactId>swagger-explorer-webjar</artifactId>
			<version>${swagger-explorer-webjar.version}</version>
		</dependency>
```

Execute:
```bash
mvn spring-boot:run
```

To access ui, navigate to your root url:

```bash
open http://localhost:8080/swagger-explorer-demo
```
