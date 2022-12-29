package com.springboot.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE username = :username OR email = :username", nativeQuery = true)
    Optional<User> userTaken(@Param("username") String username);
    
    @Query(value = "SELECT COUNT(*) FROM users WHERE username = :username", nativeQuery = true)
    Integer usenameTaken(@Param("username") String username);

    @Query(value = "SELECT COUNT(*) FROM users WHERE email = :email", nativeQuery = true)
    Integer emailTaken(@Param("email") String email);
}