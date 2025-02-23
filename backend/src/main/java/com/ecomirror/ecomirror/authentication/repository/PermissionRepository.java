package com.ecomirror.ecomirror.authentication.repository;

import com.ecomirror.ecomirror.authentication.entity.Permission;
import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    public Permission findByName(PermissionEnum name);

    List<Permission> findByNameIn(List<PermissionEnum> names);
}