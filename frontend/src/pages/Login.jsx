import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <LoginForm />
        <Link to="/register" className="mt-5">
          Dont have an account? Register
        </Link>
      </div>
    </>
  );
};

export default Login;
