package com.springboot.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.model.Mesa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TableRepository extends JpaRepository<Mesa, Long> {
    // List<Mesa> findMesaByCategoryName(String name_category);

    // Find by capacity
    @Query(value = "SELECT * FROM tables t WHERE t.capacity = :capacity AND t.table_name LIKE :table_name AND t.available IS TRUE LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Mesa> find_capacity(@Param("capacity") Number capacity, @Param("table_name") String table_name, @Param("limit") Integer limit, @Param("offset") Integer offset);

    // Only active
    @Query(value = "SELECT * FROM tables t WHERE t.table_name LIKE :table_name AND t.available IS TRUE LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Mesa> find_available(@Param("table_name") String table_name, @Param("limit") Integer limit, @Param("offset") Integer offset);

    // Find by categories
    // @Query(value = "SELECT * FROM tables t WHERE t.available IS TRUE AND t.id IN (SELECT a.id_table FROM (SELECT ct.id_table, COUNT(ct.id_category) AS count_cat_id FROM categories_tables ct LEFT JOIN categories c ON ct.id_category = c.id WHERE c.category_name IN :categories GROUP BY ct.id_table) AS a WHERE a.count_cat_id >= ALL (SELECT b.count_cat FROM (SELECT COUNT(*) AS count_cat FROM categories cc WHERE cc.category_name IN :categories ) b )) AND t.table_name LIKE :table_name GROUP BY t.id LIMIT :limit OFFSET :offset", nativeQuery = true)
    // List<Mesa> find_categories(@Param("categories") String[] categories, @Param("table_name") String table_name, @Param("limit") Integer limit, @Param("offset") Integer offset);

    // Find by categories
    @Query(value = "SELECT * FROM tables t WHERE t.available IS TRUE AND t.id IN (SELECT a.id_table FROM (SELECT ct.id_table, COUNT(ct.id_category) AS count_cat_id FROM categories_tables ct LEFT JOIN categories c ON ct.id_category = c.id WHERE c.category_name IN :categories GROUP BY ct.id_table) AS a WHERE a.count_cat_id >= ALL (SELECT b.count_cat FROM (SELECT COUNT(*) AS count_cat FROM categories cc WHERE cc.category_name IN :categories ) b )) AND t.table_name LIKE :table_name GROUP BY t.id LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Mesa> find_categories(@Param("categories") String[] categories, @Param("table_name") String table_name, @Param("limit") Integer limit, @Param("offset") Integer offset);

    // Find by categories and capacity
    @Query(value = "SELECT * FROM tables t WHERE t.available IS TRUE AND t.id IN (SELECT a.id_table FROM (SELECT ct.id_table, COUNT(ct.id_category) AS count_cat_id FROM categories_tables ct LEFT JOIN categories c ON ct.id_category = c.id WHERE c.category_name IN :categories GROUP BY ct.id_table) AS a WHERE a.count_cat_id >= ALL (SELECT b.count_cat FROM (SELECT COUNT(*) AS count_cat FROM categories cc WHERE cc.category_name IN :categories ) b )) AND t.table_name LIKE :table_name AND t.capacity = :capacity GROUP BY t.id LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Mesa> find_categories_capacity(@Param("categories") String[] categories, @Param("table_name") String table_name, @Param("capacity") Number capacity, @Param("limit") Integer limit, @Param("offset") Integer offset);

    //Total tables
    // Find by capacity
    @Query(value = "SELECT COUNT(*) FROM tables t WHERE t.capacity = :capacity AND t.table_name LIKE :table_name AND t.available IS TRUE", nativeQuery = true)
    Integer find_capacity_tables(@Param("capacity") Number capacity, @Param("table_name") String table_name);

    // Only active
    @Query(value = "SELECT COUNT(*) FROM tables t WHERE t.table_name LIKE :table_name AND t.available IS TRUE", nativeQuery = true)
    Integer find_available_tables(@Param("table_name") String table_name);

    // Find by categories
    @Query(value = "SELECT COUNT(*) FROM tables t WHERE t.available IS TRUE AND t.id IN (SELECT a.id_table FROM (SELECT ct.id_table, COUNT(ct.id_category) AS count_cat_id FROM categories_tables ct LEFT JOIN categories c ON ct.id_category = c.id WHERE c.category_name IN :categories GROUP BY ct.id_table) AS a WHERE a.count_cat_id >= ALL (SELECT b.count_cat FROM (SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.category_name IN :categories ) b ) ) AND t.table_name LIKE :table_name", nativeQuery = true)
    Integer find_categories_tables(@Param("categories") String[] categories, @Param("table_name") String table_name);

    // Find by categories and capacity
    @Query(value = "SELECT COUNT(*) FROM tables t WHERE t.available IS TRUE AND t.id IN (SELECT a.id_table FROM (SELECT ct.id_table, COUNT(ct.id_category) AS count_cat_id FROM categories_tables ct LEFT JOIN categories c ON ct.id_category = c.id WHERE c.category_name IN :categories GROUP BY ct.id_table) AS a WHERE a.count_cat_id >= ALL (SELECT b.count_cat FROM (SELECT COUNT(*) as count_cat FROM categories cc WHERE cc.category_name IN :categories ) b ) ) AND t.table_name LIKE :table_name AND t.capacity = :capacity", nativeQuery = true)
    Integer find_categories_capacity_tables(@Param("categories") String[] categories, @Param("table_name") String table_name, @Param("capacity") Number capacity);
}