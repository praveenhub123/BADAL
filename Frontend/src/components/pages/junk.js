let requestBody = {
    query: `
      query {
        GetCompany { 
          _id
          name
          email
          size
          address
          phoneNumber
          urlWebsite
          created_at
          updated_at
          deleted_at

        }
      }
    `,
  };
  const token = sessionStorage.getItem("token")
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      // console.log(res);
      return res.json();
    })
    .then(resData => {
      console.log(resData.data);
      //setAllCompanies(resData.data);
      // console.log(Object.keys(resData)[0], Object.keys(resData)[1]);
      if (Object.keys(resData)[0] === "errors") {
        // setErrors(resData.errors[0].message);
      }
      else {
        // navigate("/dashboard");
        // setErrors("");
      }
    })
    .catch(err => {
      console.log(err);
    });