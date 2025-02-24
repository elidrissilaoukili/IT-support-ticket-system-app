package com.ecomirror.ecomirror.authentication.repository;

import com.ecomirror.ecomirror.authentication.entity.Permission;
import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    public Permission findByName(PermissionEnum name);

    List<Permission> findByNameIn(List<PermissionEnum> names);
}