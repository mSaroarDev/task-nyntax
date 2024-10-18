import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
            <RegisterForm />

            <Link to="/" className="mt-5">Already have an account? Login Here</Link>
        </div>
    );
};

export default Register;