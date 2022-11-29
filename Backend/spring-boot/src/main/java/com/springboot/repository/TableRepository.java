package com.springboot.repository;

//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.model.Mesa;

public interface TableRepository extends JpaRepository<Mesa, Long> {
    // List<Mesa> findMesaByCategoryName(String name_category);
}