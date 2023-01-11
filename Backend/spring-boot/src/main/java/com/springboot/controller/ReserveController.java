package com.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.springboot.model.User;
import com.springboot.model.Mesa;
import com.springboot.model.Reserve;
import com.springboot.model.ReserveParams;
import com.springboot.repository.UserRepository;
import com.springboot.repository.TableRepository;
import com.springboot.repository.ReserveRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
// import com.springboot.payload.MessageResponse;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class ReserveController {

    @Autowired
    private ReserveRepository ReserveRepository;

    @Autowired
    private TableRepository TableRepository;

    @Autowired
    private UserRepository UserRepository;

    @PostMapping("/reserve/{id_table}")
    public ResponseEntity<?> CreateReserve(@RequestBody Reserve reserve, @PathVariable(required = true) Long id_table) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Mesa table = TableRepository.findById(id_table).get();

            if (table == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Integer table_available = ReserveRepository.available_table(id_table, reserve.getReserve_date(), reserve.getReserve_type());

            if (table_available > 0) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

            reserve.setConfirmed(false);
            reserve.setTable(table);
            reserve.setUser(user);
            ReserveRepository.save(reserve);
            return new ResponseEntity<>(reserve, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@GetMapping("/reserve/disabled_date/{id_table}")
	public ResponseEntity<List<Reserve>> getDisabledDays(@PathVariable(required = true) Long id_table) {
		try {
            List<Reserve> days = new ArrayList<Reserve>();

			ReserveRepository.disabled_date(id_table).forEach(days::add);

			return new ResponseEntity<>(days, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    @GetMapping("/reserve/available_type")
	public ResponseEntity<String> getAvailableType(@ModelAttribute ReserveParams ReserveParams) {
		try {
            String reserve_type = "";

			reserve_type = ReserveRepository.available_type(ReserveParams.getId_table(), ReserveParams.getReserve_date());

			return new ResponseEntity<>(reserve_type, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}