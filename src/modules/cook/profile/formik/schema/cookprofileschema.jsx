import * as Yup from 'yup';


// Profile Schema
export const profileSchema = Yup.object().shape({
  // Personal Information
  fullName: Yup.string().required('Full name is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
  profileImage: Yup.mixed(),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  
  // Cuisine Specialties
  cuisineSpecialties: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one cuisine specialty'),
  
  // Experience
  yearsOfExperience: Yup.number()
    .positive('Years must be positive')
    .required('Years of experience is required'),
  
  // Skills
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'Add at least one skill'),
  
  // Qualifications
  qualifications: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Qualification title is required'),
      institution: Yup.string().required('Institution is required'),
      year: Yup.number().required('Year is required')
    })
  ),
  
  // Account Settings
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  currentPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});
