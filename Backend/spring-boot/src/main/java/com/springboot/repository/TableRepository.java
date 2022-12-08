package com.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.model.Mesa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TableRepository extends JpaRepository<Mesa, Long> {
    // List<Mesa> findMesaByCategoryName(String name_category);

    // Find by capacity
    @Query(value = "SELECT * FROM tables t WHERE t.capacity = :capacity AND t.table_name LIKE :table_name AND t.available IS TRUE", nativeQuery = true)
    List<Mesa> find_capacity(@Param("capacity") Number capacity, @Param("table_name") String table_name);

    // Only active
    @Query(value = "SELECT * FROM tables t WHERE t.table_name LIKE :table_name AND t.available IS TRUE", nativeQuery = true)
    List<Mesa> find_available(@Param("table_name") String table_name);
}