import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer.jsx";
import FormInput from "../components/FormInput.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getClient, login } from "./service.js";
import { setAuthorizationHeader } from "../api/config/client.js";
import "./Login.css";
import { recovePass } from "./service.js";
import ErrorComponent from "../components/ErrorComponent.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error, message]);

  const resetError = () => {
    setError(null);
  };

  const resetMessage = () => {
    setMessage(null);
  };

  const handleOnClick = async () => {
    try {
      const token = await login({ email, password });
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      await setAuthorizationHeader(token);
      // Get client data
      const clientData = await getClient();
      // Store client data in redux
      dispatch(setClientLogged(clientData.results[0]));
      // Change the origin to reload the client navBar
      dispatch(setOrigin("client"));
      navigate("/myClubsList");
    } catch (error) {
      let errorToShow = "";
      if (error.message === "Unauthorized") {
        errorToShow = "Credenciales no válidas";
      }
      setError(errorToShow);
    }
  };

  const recovePassword = async () => {
    try {
      if (email !== "") {
        const link = "http://localhost:5173/resetPassword";
        const result = await recovePass(email, link);
        if (result === "Email enviado") {
          setMessage(
            `Se ha enviado un correo electrónico a la dirección ${email} con las instrucciones necesarias para resetear su contraseña.`
          );
        } else {
          setMessage(
            `Este email no está registrado en nuestro sistema. Puedes seleccionar la opción "Regístrate"`
          );
        }
      } else {
        setMessage(`Introduzca una dirección de email válida`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>Soy un bar</h2>
        <FormInput
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          name="email"
        />
        <FormInput
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Contraseña"
          name="password"
        />
        <div className="login-reset">
          <Button className="login-link-button" onClick={recovePassword}>
            Olvidé mi contraseña
          </Button>
        </div>
        <div className="login-access">
          <Button variant="primary-cta" onClick={handleOnClick}>
            Acceso
          </Button>
        </div>
        <p className="login-register">
          ¿Aún no perteneces a nuestra red de bares?
          <a className="login-register-a" href="/register">
            Regístrate
          </a>
        </p>

        {error && (
          <div>
            <div className="login-page-error" onClick={resetError}>
              <div className="login-error">{error}</div>
            </div>
          </div>
        )}
        {message && (
          <div>
            <div className="login-page-message" onClick={resetMessage}>
              <div className="login-message">{message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
