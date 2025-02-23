import React, { useState, useEffect } from 'react';
import useAuth from "@/authentication/hooks/useAuth";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import PrimaryButton from '@/components/buttons/PrimaryButton';
import DangerButton from '@/components/buttons/DangerButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateEmail, updateProfile, updatePassword, deleteUser } from '@/services/profileService';

const Profile = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [profileData, setProfileData] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, [user]);

  const formatLabel = (str) =>
    str.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(profileData);
      toast.success("Updated!");
      localStorage.removeItem("token");
      navigate("/");
      setErrors({});
    } catch (error) {
      setErrors(error.response?.data || { general: "An error occurred while updating the email." });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      toast.success("Updated!");
      setErrors({});
    } catch (error) {
      setErrors(error.response?.data || { general: "An error occurred while updating the profile." });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePassword(profileData);
      if (response === "Old password is incorrect or passwords do not match") {
        setPasswordErrors({ general: response });
        setPasswordSuccess("");
      } else {
        setPasswordErrors({});
        setPasswordSuccess("Password updated successfully!");
      }
    } catch (error) {
      setPasswordErrors(error.response?.data || { general: "An error occurred while updating the password." });
      setPasswordSuccess("");
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await deleteUser();
      toast.success("Your account was deleted permanently!");
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthenticatedLayout>
      <h1 className='text-3xl text-center p-4 font-semibold'>Profile</h1>

      {/* Profile Update Form */}
      <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg" onSubmit={handleUpdateProfile}>
        {["phone", "firstName", "lastName"].map((value) => (
          <div key={value} className="mb-5">
            <label htmlFor={value} className="block mb-2 text-sm font-medium text-gray-900">
              {formatLabel(value)}
            </label>
            <input
              type="text"
              id={value}
              name={value}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={`Enter your ${formatLabel(value).toLowerCase()}`}
              value={profileData[value] || ""}
              onChange={handleInputChange}
            />
            {errors[value] && <p className="text-red-600 text-sm mt-1">{errors[value]}</p>}
          </div>
        ))}
        {errors.general && <p className="text-red-600 text-sm mt-1">{errors.general}</p>}
        <PrimaryButton type="submit">Update Profile</PrimaryButton>
      </form>

      {/* Email Change Form */}
      <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg" onSubmit={handleUpdateEmail}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <p className='text-amber-600 pb-2'>
            After updating your email you will be <b>signed out</b> and redirected to the login page. Ensure your new email is working!
          </p>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your email"
            value={profileData.email || ""}
            onChange={handleInputChange}
          />
          {passwordErrors.email && <p className="text-red-600 text-sm mt-1">{passwordErrors.email}</p>}
        </div>
        {passwordErrors.general && <p className="text-red-600 text-sm mt-1">{passwordErrors.general}</p>}
        <PrimaryButton type="submit">Change Email</PrimaryButton>
      </form>

      {/* Password Change Form */}
      <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg" onSubmit={handleUpdatePassword}>
        {["oldPassword", "newPassword", "confirmNewPassword"].map((value) => (
          <div key={value} className="mb-5">
            <label htmlFor={value} className="block mb-2 text-sm font-medium text-gray-900">
              {formatLabel(value)}
            </label>
            <input
              type="password"
              id={value}
              name={value}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={`Enter your ${formatLabel(value).toLowerCase()}`}
              value={profileData[value] || ""}
              onChange={handleInputChange}
            />
            {passwordErrors[value] && <p className="text-red-600 text-sm mt-1">{passwordErrors[value]}</p>}
          </div>
        ))}
        {passwordSuccess && <p className="text-green-600 text-sm mt-1 pb-5">{passwordSuccess}</p>}
        <PrimaryButton type="submit">Change Password</PrimaryButton>
      </form>

      {/* Delete Profile Form */}
      <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg mb-12" onSubmit={handleDeleteUser}>
        <p className="text-lg font-semibold py-1">Delete your profile</p>
        <DangerButton type="submit">Delete Profile</DangerButton>
      </form>
    </AuthenticatedLayout>
  );
};

export default Profile;
