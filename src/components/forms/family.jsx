import React from 'react'
import { useFormik } from 'formik'
const Family = () => {
    const formik = useFormik({
        initialValues: {
            EmployeeId:"",
            PersonName:"",
            Relation:"",
            Education:"",
            Occupation:"",
            Address:"",
            CellNo:"",
            EmailId:"",
            Nomminee:"",

        },
        onSubmit: (values, { resetForm }) => {
          console.log(values);
          resetForm();
        },
      });

  return (
    <form onSubmit={formik.handleSubmit}>
    <div>

    </div>
    </form>
  )
}

export default Family