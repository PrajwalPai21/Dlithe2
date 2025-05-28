// communicates with DB
package com.pai_music.pai_music.repository;

import com.pai_music.pai_music.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (used during playlist creation)
    Optional<User> findByEmail(String email);

    // Find user by email and password (used during login)
    Optional<User> findByEmailAndPassword(String email, String password);

}
