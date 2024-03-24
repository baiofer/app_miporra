import Button from "../../components/Button";
import FormInput from "../../components/FormInput";

const PorrasPage = () => {
  return (
    <div>
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
        label="nombre de usario"
        defaultValue="Introduce tu nombre"
        name="username"
      />
      <FormInput
        type="password"
        label="password"
        defaultValue=""
        name="password"
      />
    </div>
  );
};

export default PorrasPage;

// esta página es la landing? de momento es la de pruebas para los inputs y los bototnes
