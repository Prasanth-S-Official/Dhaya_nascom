package com.examly;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.File;

import org.junit.jupiter.api.Test;

public class AppTest {

    @Test
	public void testEntityFolder() {
		String directoryPath = "src/main/java/com/examly/entity";
		File directory = new File(directoryPath);
		assertTrue(directory.exists() && directory.isDirectory());
	}

    @Test
	public void testServiceFolder() {
		String directoryPath = "src/main/java/com/examly/service";
		File directory = new File(directoryPath);
		assertTrue(directory.exists() && directory.isDirectory());
	}


    


}
