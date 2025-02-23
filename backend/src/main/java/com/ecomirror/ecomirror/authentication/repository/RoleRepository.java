package com.ecomirror.ecomirror.authentication.repository;

import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findByName(RoleEnum name);
}
