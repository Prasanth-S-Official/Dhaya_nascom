package com.examly.springapp;

import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.test.web.servlet.MvcResult;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private WiFiSchemeRepo wifiSchemeRepository;

    @Autowired
    private WiFiSchemeRequestRepo wifiSchemeRequestRepository;

    private String userToken;
    private String adminToken;

    @BeforeAll
    public static void cleanupDatabase(@Autowired UserRepo userRepository,
                                       @Autowired WiFiSchemeRepo wifiSchemeRepository,
                                       @Autowired WiFiSchemeRequestRepo wifiSchemeRequestRepository) {
        System.out.println("Cleaning up the database before tests...");
        wifiSchemeRequestRepository.deleteAll();
        wifiSchemeRepository.deleteAll();
        userRepository.deleteAll();
        System.out.println("Database cleanup completed.");
    }

    private HttpHeaders createHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (token != null && !token.isEmpty()) {
            headers.set("Authorization", "Bearer " + token);
        }
        return headers;
    }
	
    @Test
    @Order(1)
    public void backend_testRegisterUserAndGenerateJwtToken() throws Exception {
        // Define the request body for user registration
        String requestBody = "{" +
                "\"email\": \"user@gmail.com\"," +
                "\"password\": \"user@1234\"," +
                "\"username\": \"TestUser\"," +
                "\"userRole\": \"User\"," +
                "\"mobileNumber\": \"9876543210\"" +
                "}";

        // Perform POST request to /api/register
        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isCreated()) // Assert HTTP 201 Created
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print());

        // Define the request body for user login
        String loginRequestBody = "{" +
                "\"email\": \"user@gmail.com\"," +
                "\"password\": \"user@1234\"" +
                "}";

        // Perform POST request to /api/login
        MvcResult loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Assert HTTP 200 OK
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andReturn();

        // Parse the login response to get the token
        String responseBody = loginResult.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        userToken = jsonNode.get("token").asText();

        // Assert that the token is not null
        assertTrue(userToken != null && !userToken.isEmpty(), "JWT token should not be null or empty");

        System.out.println("Generated JWT Token for User: " + userToken);
    }

	@Test
	@Order(2)
	public void backend_testRegisterAdminAndGenerateJwtToken() throws Exception {
		// Define the request body for admin registration
		String requestBody = "{" +
				"\"email\": \"admin@gmail.com\"," +
				"\"password\": \"admin@1234\"," +
				"\"username\": \"AdminUser\"," +
				"\"userRole\": \"Admin\"," +
				"\"mobileNumber\": \"9876543211\"" +
				"}";

		// Perform POST request to /api/register
		mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody))
				.andExpect(MockMvcResultMatchers.status().isCreated()) // Assert HTTP 201 Created
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
				.andDo(print());

		// Define the request body for admin login
		String loginRequestBody = "{" +
				"\"email\": \"admin@gmail.com\"," +
				"\"password\": \"admin@1234\"" +
				"}";

		// Perform POST request to /api/login
		MvcResult loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(loginRequestBody))
				.andExpect(MockMvcResultMatchers.status().isOk()) // Assert HTTP 200 OK
				.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andReturn();

		// Parse the login response to get the token
		String responseBody = loginResult.getResponse().getContentAsString();
		JsonNode jsonNode = objectMapper.readTree(responseBody);
		String adminToken = jsonNode.get("token").asText();

		// Assert that the token is not null
		assertTrue(adminToken != null && !adminToken.isEmpty(), "JWT token for Admin should not be null or empty");

		System.out.println("Generated JWT Token for Admin: " + adminToken);
	}

	@Test
	@Order(3)
	void backend_testLoginAsAdmin() throws Exception {
		String requestBody = "{\"email\": \"admin@gmail.com\", \"password\": \"admin@1234\"}";

		ResponseEntity<String> response = restTemplate.postForEntity("/api/users/login",
				new HttpEntity<>(requestBody, createHeaders()), String.class);

		JsonNode responseBody = objectMapper.readTree(response.getBody());
		String token = responseBody.get("token").asText();
		adminToken = token;

		// Assert status is OK
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
		Assertions.assertNotNull(token, "Admin token should not be null");

		// Log the token
		System.out.println("Admin Token: " + adminToken);
	}


    @Test
    @Order(4)
    public void backend_testGetAllwifiScheme() throws Exception {
        mockMvc.perform(get("/api/wifiScheme")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    @Test
    public void backend_testWiFiSchemeInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.WiFiSchemeService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.WiFiSchemeServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    @Test
    public void backend_testWiFiSchemeRequestInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.WiFiSchemeRequestService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.WiFiSchemeRequestServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    @Test
    public void backend_testWiFiSchemeControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.WiFiSchemeController");
    }

    @Test
    public void backend_testWiFiSchemeRequestControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.WiFiSchemeRequestController");
    }

    @Test
    public void backend_testAuthControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.AuthController");
    }

    @Test
    public void backend_testWiFiSchemeModelClassExists() {
        checkClassExists("com.examly.springapp.model.WiFiScheme");
    }

    @Test
    public void backend_testUserModelClassExists() {
        checkClassExists("com.examly.springapp.model.User");
    }

    @Test
    public void backend_testWiFiSchemeRequestModelClassExists() {
        checkClassExists("com.examly.springapp.model.WiFiSchemeRequest");
    }
}
