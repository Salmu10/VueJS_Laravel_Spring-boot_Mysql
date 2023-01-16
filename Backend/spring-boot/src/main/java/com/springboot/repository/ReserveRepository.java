package com.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.model.Reserve;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {
    @Query(value = "SELECT COUNT(*) FROM reserves WHERE id_table = :id_table AND reserve_date = :reserve_date AND reserve_type = :reserve_type", nativeQuery = true)
    Integer available_table(@Param("id_table") Long id_table, @Param("reserve_date") String reserve_date, @Param("reserve_type") String reserve_type);

    @Query(value = "SELECT * FROM reserves WHERE id_table = :id_table AND user_id = :user_id", nativeQuery = true)
    List<Reserve> showReservesOfTable(@Param("user_id") Long user_id, @Param("id_table") Long id_table);

    @Query(value = "SELECT * FROM reserves r WHERE id_table = :id_table GROUP BY r.reserve_date HAVING COUNT(*) > 1", nativeQuery = true)
    List<Reserve> disabled_date(@Param("id_table") Long id_table);

    @Query(value = "SELECT r.reserve_type FROM reserves r WHERE id_table = :id_table AND r.reserve_date = :reserve_date GROUP BY r.reserve_date HAVING COUNT(*) = 1", nativeQuery = true)
    String available_type(@Param("id_table") Integer id_table, @Param("reserve_date") String reserve_date);

    @Query(value = "SELECT r.* FROM reserves r WHERE r.id_user = :id_user AND r.confirmed = true", nativeQuery = true)
    List<Reserve> getReserveListUser(@Param("id_user") Long id_user);

    @Query(value = "SELECT r.* FROM reserves r WHERE r.id_user = :id_user AND r.confirmed = false", nativeQuery = true)
    List<Reserve> getPendingUserReserves(@Param("id_user") Long id_user);

    @Query(value = "DELETE r.* FROM reserves r WHERE r.id_user = :id_user AND r.id = :id_reserve", nativeQuery = true)
    Void deleteReserve(@Param("id_user") Long id_user, @Param("id_reserve") Long id_reserve);
}