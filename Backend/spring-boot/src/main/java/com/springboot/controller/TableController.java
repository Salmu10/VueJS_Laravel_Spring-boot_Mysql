package com.springboot.controller;

import java.util.ArrayList;
// import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.Mesa;
import com.springboot.model.TableParams;
import com.springboot.repository.TableRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")

public class TableController {

	@Autowired
	TableRepository tableRepository;

	@GetMapping("/tables")
	public ResponseEntity<List<Mesa>> getAllTables(@ModelAttribute TableParams TableParams) {
		try {
			TableParams.setTable_name(TableParams.getTable_name() + '%');
			Integer offset = (TableParams.getPage() - 1) * TableParams.getLimit();
			List<Mesa> tables = new ArrayList<Mesa>();
			
			// Find by only capacity
			if (TableParams.getCapacity() > 0 && TableParams.getCategories().length == 0) {
				tableRepository.find_capacity(TableParams.getCapacity(), TableParams.getTable_name(), TableParams.getLimit(), offset).forEach(tables::add);
			}
			// Find by only categories
			else if (TableParams.getCategories().length > 0 && TableParams.getCapacity() == 0) {
				tableRepository.find_categories(TableParams.getCategories(), TableParams.getTable_name(), TableParams.getLimit(), offset).forEach(tables::add);
			}
			// Find by categories and capacity
			else if (TableParams.getCategories().length > 0 && TableParams.getCapacity() > 0) {
				tableRepository.find_categories_capacity(TableParams.getCategories(), TableParams.getTable_name(), TableParams.getCapacity(), TableParams.getLimit(), offset).forEach(tables::add);
			}
			// Find available tables
			else {
				tableRepository.find_available(TableParams.getTable_name(), TableParams.getLimit(), offset).forEach(tables::add);
			}

			return new ResponseEntity<>(tables, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/tables_count")
	public ResponseEntity<Integer> getTablesCount(@ModelAttribute TableParams TableParams) {
		try {
			TableParams.setTable_name(TableParams.getTable_name() + '%');
			Integer total_tables = 0;

			// Find by only capacity
			if (TableParams.getCategories().length == 0 && TableParams.getCapacity() > 0) {
				total_tables = tableRepository.find_capacity_tables(TableParams.getCapacity(), TableParams.getTable_name());
			}
			// Find by only categories
			else if (TableParams.getCategories().length > 0 && TableParams.getCapacity() == 0) {
				total_tables = tableRepository.find_categories_tables(TableParams.getCategories(), TableParams.getTable_name());
			}
			// Find by categories and capacity
			else if (TableParams.getCategories().length > 0 && TableParams.getCapacity() > 0) {
				total_tables = tableRepository.find_categories_capacity_tables(TableParams.getCategories(), TableParams.getTable_name(), TableParams.getCapacity());
			}
			// Find available tables
			else {
				total_tables = tableRepository.find_available_tables(TableParams.getTable_name());
			}

			return new ResponseEntity<>(total_tables, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
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