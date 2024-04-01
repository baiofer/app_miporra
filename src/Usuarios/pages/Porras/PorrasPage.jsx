//import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
//import FormInput from "../../../components/FormInput";
//import useHistory from "react-router-dom";

const PorrasPage = () => {
  //const [Usuario, setUsuario] = useState("");
  //const [TextoLibre, setTextoLibre] = useState("");
  //const [Selector, setSelector] = useState("Apuestas");
  //const [isPending, setIsPending] = useState(false);
  //const history = useHistory();

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    const apuesta = { Usuario, TextoLibre, Selector };
    console.log(apuesta);
    setIsPending(true);

    // TODO: hacer el POST bien!

    fetch("https://api.miporra.es/v1.0/newclubBet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apuesta),
    }).then(() => {
      console.log("Nueva apuesta añadida con éxito");
      setIsPending(false);
    });
  };
  */

  return (
    <div>
      <div style={{ display: 'block' }}>
        <div style={{ marginTop: '10px '}}>
            <Link to="/lottery-bets">
              <Button type="primary-cta">Participa en una rifa (QR)</Button>
            </Link>
          </div>
          <div style={{ marginTop: '10px '}}>
            <Link to="/clubs">
              <Button type="primary-cta">Apuesta ahora en tu bar (QR)</Button>
            </Link>
          </div>
          <div style={{ marginTop: '10px '}}>
            <Link to="/homepage">
              <Button type="primary-cta">¿Que es miporra?</Button>
            </Link>
          </div>
          <div style={{ marginTop: '10px '}}>
            <Link to="/clients">
              <Button type="primary-cta">Encuentra tu bar</Button>
            </Link>
          <div style={{ marginTop: '10px '}}></div>
        </div>
      </div>
      {/*
      <h1>Ver porras</h1>
      <div>
        <Button type="primary-cta">Primary CTA activo</Button>
        <div></div>
        <Button type="secondary-cta">Secondary CTA activo</Button>
      </div>
      <div>
        <Button type="tertiary-cta">Tertiary Button</Button>
      </div>

      <h1>Registro</h1>
      <FormInput
        type="text"
        required
        label="Nombre de usuario"
        // Value={title}
        // onChange={(e) => setTitle(e.target.value)}
        name="username"
        isDisabled={true}
      />
      <FormInput
        type="password"
        label="Password"
        defaultValue=""
        name="password"
        isDisabled={false}
      />

      <div className="input-field">
        <h2>PRUEBAS</h2>
        <form className="input" onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input
            type="text"
            required
            value={Usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label>Texto libre</label>
          <textarea
            required
            value={TextoLibre}
            onChange={(e) => setTextoLibre(e.target.value)}
          ></textarea>
          <label>Selector</label>
          <select
            value={Selector}
            onChange={(e) => setSelector(e.target.value)}
          >
            <option value="Apuestas">Apuestas</option>
            <option value="Rifas">Rifas</option>
          </select>
          {!isPending && <button>Ver</button>}
          {isPending && <button disabled>Generando apuesta...</button>}
          <p>{Usuario}</p>
          <p>{TextoLibre}</p>
          <p>{Selector}</p>
        </form>
      </div>
    */}
    </div>
  );
};

export default PorrasPage;

// esta página es la landing? de momento es la de pruebas para los inputs y los bototnes
