import * as Yup from 'yup'



export const signupSchema = Yup.object({
    name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First Name Required'),
    email: Yup.string()
        .email('invalid email address')
        .required('Email is required'),
    mobile: Yup.string()
        .max(12, 'Mobile number not valid')
        .min(10, 'Mobile number not valid')
        .required("Mobile is required"),
    address: Yup.string()
        .required("Address is required"),
    password: Yup.string()
        .min(6, 'password must be at least 6 charecters')
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is Required')
})





export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .trim()
        .min(8, 'password must be at least 8 charecters')
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
        ),
});