import { useState } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import "./Login.css";
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../api/config/client";
import { jwtDecode } from "jwt-decode";
import { resetPassword } from "./service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleOnClick = async () => {
    if (password !== repeatPassword) {
      setMessage("Las contraseñas no coinciden");
    } else {
      try {
        setMessage("Las contraseñas coinciden");
        await setAuthorizationHeader(token);

        const decodedToken = jwtDecode(token);
        const clientId = decodedToken.id;
        const data = {
          clientId: clientId,
          password: password,
        };
        const resetedPassword = await resetPassword(data);
        console.log("Reset: ", resetedPassword);
        dispatch(setOrigin("user"));
        dispatch(setClientLogged({}));
        navigate("/login");
        removeAuthorizationHeader();
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  const resetMessage = () => {
    setMessage(null);
  };

  return (
    <div>
      <h2>Nueva contraseña</h2>
      <FormInput
        className="loginInput"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Contraseña"
        name="password"
      />
      <FormInput
        type="password"
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        label="Repita contraseña"
        name="repeatPassword"
      />
      <div style={{ marginBottom: "10px" }}>
        <Button variant="primary-cta" onClick={handleOnClick}>
          Cambia tu contraseña
        </Button>
      </div>
      {message && (
        <div>
          <div className="loginPage-message" onClick={resetMessage}>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
