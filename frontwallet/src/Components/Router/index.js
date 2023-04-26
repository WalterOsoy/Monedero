import { Route, Routes } from "react-router-dom";
import Login from "../SignIn";
import Accounts from "../Accounts";
import SignUpPage from "../Signup";

function RouterMain() {
    const value = sessionStorage.getItem('token');
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/SignUp" element={<SignUpPage />} />

            {value ? (
                <Route exact path="/Accounts" element={<Accounts />} />
            ) : (
                <Route path="*" element={<Login />} />
            )}

            <Route path="*" element={<Login />} />
        </Routes>
    )
}
export default RouterMain;