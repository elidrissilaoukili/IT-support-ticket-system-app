package com.ecomirror.ecomirror.authentication.config;

import com.ecomirror.ecomirror.authentication.entity.Permission;
import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import com.ecomirror.ecomirror.authentication.repository.PermissionRepository;
import com.ecomirror.ecomirror.authentication.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner initRolesAndPermissions(RoleRepository roleRepository,
                                                     PermissionRepository permissionRepository) {
        return args -> {
            if (roleRepository.count() == 0 && permissionRepository.count() == 0) {
                // Creating permissions
                Permission createTicket = new Permission(PermissionEnum.CREATE_TICKET);
                Permission viewTicket = new Permission(PermissionEnum.VIEW_TICKET);

                Permission viewAllTickets = new Permission(PermissionEnum.VIEW_ALL_TICKETS);
                Permission changeTicketStatus = new Permission(PermissionEnum.CHANGE_TICKET_STATUS);
                Permission addTicketComment = new Permission(PermissionEnum.ADD_TICKET_COMMENT);
                Permission createEmployee = new Permission(PermissionEnum.CREATE_EMPLOYEE);

                permissionRepository.saveAll(Set.of(createTicket, viewTicket, viewAllTickets, changeTicketStatus, addTicketComment, createEmployee));

                // Creating roles
                Role itsupportRole = new Role(RoleEnum.ITSUPPORT);
                Role employeeRole = new Role(RoleEnum.EMPLOYEE);

                // Assign permissions to roles
                itsupportRole.setPermissions(Set.of(createTicket, viewTicket, viewAllTickets, changeTicketStatus, addTicketComment, createEmployee));
                employeeRole.setPermissions(Set.of(createTicket, viewTicket));

                roleRepository.saveAll(Set.of(itsupportRole, employeeRole));
            }
        };
    }
}


//package com.ecomirror.ecomirror.authentication.config;
//
//import com.ecomirror.ecomirror.authentication.entity.Permission;
//import com.ecomirror.ecomirror.authentication.entity.Role;
//import com.ecomirror.ecomirror.authentication.enums.PermissionEnum;
//import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
//import com.ecomirror.ecomirror.authentication.repository.PermissionRepository;
//import com.ecomirror.ecomirror.authentication.repository.RoleRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DatabaseSeeder {
//
//    @Bean
//    public CommandLineRunner initRoles(RoleRepository roleRepository) {
//        return args -> {
//            if (roleRepository.count() == 0) { // Only insert if table is empty
//                Role itsupportRole = new Role(RoleEnum.ITSUPPORT);
//                Role employeeRole = new Role(RoleEnum.EMPLOYEE);
//
//                roleRepository.save(itsupportRole);
//                roleRepository.save(employeeRole);
//            }
//        };
//    }
//
//    @Bean
//    public CommandLineRunner initPermissions(PermissionRepository permissionRepository) {
//        return args -> {
//            if (permissionRepository.count() == 0) {
//
//                // IT-Support permissions
//                Permission createTicket = new Permission(PermissionEnum.CREATE_TICKET);
//                Permission viewTicket = new Permission(PermissionEnum.VIEW_TICKET);
//                permissionRepository.save(createTicket);
//                permissionRepository.save(viewTicket);
//
//                // employee permissions
//                Permission viewAllTicket = new Permission(PermissionEnum.VIEW_ALL_TICKETS);
//                Permission changeTicketStatus = new Permission(PermissionEnum.CHANGE_TICKET_STATUS);
//                Permission addTicketComment = new Permission(PermissionEnum.ADD_TICKET_COMMENT);
//                permissionRepository.save(viewAllTicket);
//                permissionRepository.save(changeTicketStatus);
//                permissionRepository.save(addTicketComment);
//            }
//        };
//    }
//
//}
