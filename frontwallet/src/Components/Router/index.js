import { Route, Routes } from "react-router-dom";
import Login from "../SignIn";
import Accounts from "../Accounts";

function RouterMain() {


    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Accounts" element={<Accounts />} />

            <Route path="*" element={<Login />} />
        </Routes>
    )
}
export default RouterMain;