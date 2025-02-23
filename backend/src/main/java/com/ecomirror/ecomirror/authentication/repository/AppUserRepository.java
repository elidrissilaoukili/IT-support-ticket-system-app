package com.ecomirror.ecomirror.authentication.repository;

import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    // Update EntityGraph to match new structure
    @EntityGraph(attributePaths = {"role"})
    public AppUser findByEmail(String email);

    Optional<AppUser> findByPhone(String phone);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    // Fix query by replacing userRoles with role
    @Query("SELECT u FROM AppUser u WHERE u.role.name = :role")
    List<AppUser> findByRole(@Param("role") RoleEnum role);
}
