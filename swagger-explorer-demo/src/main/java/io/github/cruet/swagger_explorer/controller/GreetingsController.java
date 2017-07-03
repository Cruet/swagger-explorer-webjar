package io.github.cruet.swagger_explorer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingsController {
	@GetMapping("/greetings")
	public String sayHi() {
		return "Hi!";
	}
}
