package com.ecomirror.ecomirror.authentication.service;

import com.ecomirror.ecomirror.authentication.dto.PasswordChangeRequest;
import com.ecomirror.ecomirror.authentication.dto.UserUpdateRequest;
import com.ecomirror.ecomirror.authentication.dto.UserResponseDTO;
import com.ecomirror.ecomirror.authentication.entity.AppUser;
import com.ecomirror.ecomirror.authentication.entity.Role;
import com.ecomirror.ecomirror.authentication.enums.RoleEnum;
import com.ecomirror.ecomirror.authentication.repository.AppUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppUserService implements UserDetailsService {

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email);

        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Get the role name (assuming the user now only has one role)
        String roleName = appUser.getRole() != null ? appUser.getRole().getName().name() : null;

        // Build the UserDetails object
        return User.withUsername(appUser.getEmail())
                .password(appUser.getPassword())
                .roles(roleName != null ? roleName : "USER")  // Default to "USER" if no role is found
                .build();
    }

    public UserResponseDTO getAuthenticatedUser(String email) {
        AppUser user = appUserRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new UserResponseDTO(user);
    }

    public UserResponseDTO updateUserProfile(String email, UserUpdateRequest updatedUser) {
        AppUser user = appUserRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (updatedUser.getFirstName() != null) {
            user.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            user.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getPhone() != null) {
            user.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }

        appUserRepository.save(user);

        return new UserResponseDTO(user);
    }


    public boolean updateUserPassword(String email, PasswordChangeRequest updatedPassword) {
        AppUser user = appUserRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (!passwordEncoder.matches(updatedPassword.getOldPassword(), user.getPassword())) {
            return false;
        }

        if (!updatedPassword.getNewPassword().equals(updatedPassword.getConfirmNewPassword())) {
            return false;
        }

        String hashedNewPassword = passwordEncoder.encode(updatedPassword.getNewPassword());

        user.setPassword(hashedNewPassword);
        appUserRepository.save(user);

        return true;
    }


    public boolean destroyAuthenticatedUser(String email) {
        AppUser user = appUserRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        appUserRepository.delete(user);

        return true;
    }
}
