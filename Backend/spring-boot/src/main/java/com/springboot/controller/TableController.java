package com.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.Mesa;
import com.springboot.repository.TableRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")

public class TableController {

	@Autowired
	TableRepository tableRepository;

	@GetMapping("/tables")
	public ResponseEntity<List<Mesa>> getAllTables() {
		try {
			List<Mesa> tables = new ArrayList<Mesa>();
			tableRepository.findAll().forEach(tables::add);
			return new ResponseEntity<>(tables, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/table/{id}")
	public ResponseEntity<Mesa> getOneLinkTable(@PathVariable(required = true) Long id) {
		try {
			Optional<Mesa> table = tableRepository.findById(id);
			if (table.isPresent()) {
				return new ResponseEntity<>(table.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}