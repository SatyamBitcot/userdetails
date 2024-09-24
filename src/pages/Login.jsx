import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userThunks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2"; 

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is  required*")
    .email("Invalid email format!!!"),
  password: Yup.string()
    .required("Password is required*")
    .min(8, "Password must be at least 8 characters!!!"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    console.log("Login values:", values);
    setLoading(true);
    try {
      const resultAction = await dispatch(loginUser(values));
      console.log("API Response:", resultAction);
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else if (loginUser.rejected.match(resultAction)) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: resultAction.payload?.message || "Unable to login.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>

                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
