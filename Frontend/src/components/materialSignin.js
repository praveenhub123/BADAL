import Head from 'next/head';
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery, gql } from "@apollo/client";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { UserContext } from '../App';



export function handleLogout(){
    sessionStorage.clear();   
}

const Login = () => {

    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("LoginStatus"));
    let navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            // email: Yup
            //     .string()
            //     .email(
            //         'Must be a valid email')
            //     .max(255)
            //     .required(
            //         'Email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: () => {
            router.push('/');
        }
    });

    const handleSignIn = (state={},action) => {
        let requestBody = {
            query: `
              query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  userId, token, tokenExpiration, teamId, userRole
                }
              }
            `,
            variables: {
                email: formik.values.email,
                password: formik.values.password
            }
        };
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                // console.log(res);
                else{

                }
                return res.json();
            })
            .then(resData => {
                if (Object.keys(resData)[0] === "errors") {
                    setErrors(resData.errors[0].message);
                }
                else {
                    // dispatch({sessionStorage.setItem("LoginStatus", true)});
                    // setLoggedIn(true);});
                    sessionStorage.setItem("LoginStatus", true);
                    setLoggedIn(true);
                    sessionStorage.setItem("token", resData.data.login.token);
                    sessionStorage.setItem("teamId", resData.data.login.teamId);
                    sessionStorage.setItem("userRole", resData.data.login.userRole);
                    navigate("/ngo");
                    setErrors("");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
      

    return (
        <>
            <Head>
                <title>Login | Material Kit</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container
                    maxWidth="sm"
                    style={{
                        marginTop: "10%",
                    }}
                >
                    
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}
                        centered
                        justifyContent="center">
                            <Typography
                                color="textPrimary"
                                variant="h4">
                                Sign in
                            </Typography>   
                        </Box>
                       
                        <Box
                            sx={{
                                pb: 1,
                                pt: 0
                            }}
                        >
                        
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        {/* TODO : create alert for wrong credentials} */}

                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                onClick={handleSignIn}
                            >
                                Sign In Now
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Don&apos;t have an account?
                            {' '}
                            <Link
                                href="/signup"
                                variant="subtitle2"
                                underline="hover"
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login ; 