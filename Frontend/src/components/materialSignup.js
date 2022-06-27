import * as React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery, useMutation } from "@apollo/client";
import { GET_SKILLS } from "../graphQL/query"
import { GET_ALL_COMPANIES } from '../graphQL/query';
import FormGroup from '@mui/material/FormGroup';
import { Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    const [Skills, setSkills] = React.useState('');
    const { data } = useQuery(GET_SKILLS)
    const { data: Companydata } = useQuery(GET_ALL_COMPANIES);

    var [tagOptions, setTagOptions] = React.useState([])
    var [tagCompanies, setTagCompanies] = React.useState([])
   

    var [Tags, setTags] = React.useState([])
   
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            address: "some address",
            pincode: "some pincode",
            isAdmin: "NO",
            company:'',
            skills:'',
            experience:'',
            available:''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            firstName: Yup
                .string()
                .max(255)
                .required(
                    'First name is required'),
            lastName: Yup
                .string()
                .max(255)
                .required(
                    'Last name is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required'),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'This field must be checked'
                ),
                company: Yup
                .string()
                .max(255)
                .required(
                    'Company is required'),
                skills: Yup
                .string()
                .max(255)
                .required(
                    'Select atleast one'),
                experience: Yup
                .number()
                .max(255)
                .required(
                    'Year is required'),
        }),
        onSubmit: () => {
            router.push('/');
        }
    });


    React.useEffect(() => {
        if (data) {
            console.log(GET_SKILLS)
          var names = []
          data.GetSkills.forEach((x) => {
            names.push({
              name: x.skill,
              id: x._id
            })
          })
          setTagOptions(names)
        }
      }, [data])


      React.useEffect(() => {
        if (Companydata) {
            console.log(GET_ALL_COMPANIES)
          var companies = []
          Companydata.GetCompany.forEach((x) => {
            companies.push({
              label: x.name,
              value: x._id
            })
          })
          setTagCompanies(companies)
        }
      }, [Companydata])



      const handleTags = (v) => {
        var s = []
        v.forEach((x) => {
          s.push(x.id)
        })
        setTags(s);
      }

    const handleSignIn = () => {
        // console.log(formik.values.email, formik.values.password);
        const data = {
            email: formik.values.email,
            password: formik.values.password,
            name: formik.values.firstName + " " + formik.values.lastName,
            address: formik.values.address,
            pincode: formik.values.pincode,
            isAdmin: formik.values.isAdmin
        }
        console.log(data);
    }

    return (
        <>
            <Head>
                <title>
                    Badal
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    scrollBehavior:'auto',
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    // margin:7,
                }}
            >
                <Container maxWidth="sm" style={{ marginTop: "2%" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box >
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Create a new account
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use your email to create a new account
                            </Typography>
                        </Box>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={6}>
                                <TextField
                                    error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                    fullWidth
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    label="First Name"
                                    margin="normal"
                                    name="firstName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                    fullWidth
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    label="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

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
                            variant="outlined"/>

                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                                                <Grid item xs={6}>
                                                     <FormControl fullWidth required>
                                                        <Autocomplete
                                                            disablePortal
                                                            error={Boolean(formik.touched.company && formik.errors.company)}
                                                            id="tags-standard"
                                                            helperText={formik.touched.company && formik.errors.company}
                                                            options={tagCompanies}
                                                            getOptionLabel={(option) => option.label}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                label="Select Company"
                                                                />
                                                            )}  />
                                                        </FormControl>           
                                                    
                                                </Grid>
                                               
                                                <Grid item xs={6}>
                                                     <TextField
                                                    error={Boolean(formik.touched.experience && formik.errors.experience)}
                                                    fullWidth
                                                    helperText={formik.touched.experience && formik.errors.experience}
                                                    label="Years of Experience"
                                                    name="experience"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    type="experience"
                                                    value={formik.values.experience}
                                                    variant="outlined"
                                                             />
                                                  </Grid>  
                                                  </Grid>

                                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:2}}>
                                                <Grid item xs={12}>
                                                  <Autocomplete
                                                            multiple
                                                            error={Boolean(formik.touched.skills && formik.errors.skills)}
                                                            id="tags-standard"
                                                            helperText={formik.touched.skills && formik.errors.skills}
                                                            options={tagOptions}
                                                            margin="normal"
                                                            onChange={(_, v) => handleTags(v)}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                label="Select Skills"
                                                                />
                                                            )}  />
                                           </Grid>
                                           </Grid>

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <Checkbox
                                checked={formik.values.policy}
                                name="policy"
                                onChange={formik.handleChange}
                            />
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                I have read the
                                {' '}
                                <NextLink
                                    href="#"
                                    passHref
                                >
                                    <Link
                                        color="primary"
                                        underline="always"
                                        variant="subtitle2"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </NextLink>
                            </Typography>
                        </Box>
                        {Boolean(formik.touched.policy && formik.errors.policy) && (
                            <FormHelperText error>
                                {formik.errors.policy}
                            </FormHelperText>
                        )}
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
                                Sign Up Now
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Have an account?
                            {' '}
                            <Link
                                href="/"
                                variant="subtitle2"
                                underline="hover"
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
