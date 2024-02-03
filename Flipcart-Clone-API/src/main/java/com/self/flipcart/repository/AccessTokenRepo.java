package com.self.flipcart.repository;

import com.self.flipcart.model.AccessToken;
import com.self.flipcart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccessTokenRepo extends JpaRepository<AccessToken, String> {
    Optional<AccessToken> findByToken(String accessToken);

    Optional<AccessToken> findByUser(User user);
}
