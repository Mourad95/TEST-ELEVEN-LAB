// React
import { MouseEventHandler, FormEvent, useState } from "react";

// Libs
import classnames from "classnames";

// Components
import { HUDWindow } from "../../../components/HUDWindow";
import { Form } from "../../../components/Form";
import { HUDInput } from "../../../components/HUDInput";
import { HUDButton } from "../../../components/HUDButton";
import { Flexbox } from "../../../components/Flexbox";
import { HUDAutoComplete } from "../../../components/HUDAutoComplete";

// Context
import { useCurrentPlanet } from "../../../contexts/SpaceTravelContext";

// API
import {
  CreateUpdateAstronautRequestBody,
  Astronaut,
} from "../../../api/astronaut.api";
import { getPlanetListByNameAPICall } from "../../../api/planet.api";

// Styles
import styles from "./AstronautForm.module.css";

type AstronautFormProps = {
  astronautForUpdate?: Astronaut | null;
  className?: string;
  mode?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: (astronaut: CreateUpdateAstronautRequestBody) => void;
};

type FormStateType = {
  firstname?: string;
  lastname?: string;
  planet?: string;
};

export function AstronautForm({
  astronautForUpdate,
  className,
  mode = "create",
  onCancel,
  onSubmit,
}: AstronautFormProps) {
  debugger;
  const componentClassNames = classnames(styles.astronautform, className);
  const { currentPlanet } = useCurrentPlanet();
  const canCreate =
    mode === "create" &&
    currentPlanet !== "NO_WHERE" &&
    currentPlanet?.isHabitable;

  const [formState, setFormState] = useState<FormStateType>({});
  const [astronautFirstname, setAstronautFirstname] = useState("");
  const [astronautLastname, setAstronautLastname] = useState("");
  const [astronautOriginPlanet, setAstronautOriginPlanet] = useState("");

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormStateType = {};
    if (
      typeof astronautFirstname !== "string" ||
      astronautFirstname === ""
    ) {
      validationErrors.firstname = "firstname is required";
    }
    if (
      typeof astronautLastname !== "string" ||
      astronautLastname === ""
    ) {
      validationErrors.lastname = "lastname is require";
    }
    if (
      typeof astronautOriginPlanet !== "string" ||
      astronautOriginPlanet === ""
    ) {
      validationErrors.planet = "planet of origin is required";
    }

    // submit the form if there is no validation error
    if (
      !Object.keys(validationErrors).length &&
      astronautFirstname &&
      astronautLastname &&
      astronautOriginPlanet
    ) {
      onSubmit({
        firstname: astronautFirstname,
        lastname: astronautLastname,
        originPlanetId: parseInt(astronautOriginPlanet),
      });
    } else {
      setFormState(validationErrors);
    }
  };

  const defaultSelectedPlanet = {
    value: astronautForUpdate?.originPlanet.id?.toString() || "",
    label: astronautForUpdate?.originPlanet.name || "",
  };

  return (
    <Flexbox className={componentClassNames} flexDirection="column">
      <HUDWindow>
        {mode === "create" ? (
          <h2>Create an Astronaut</h2>
        ) : (
          <h2>Edit an Astronaut</h2>
        )}
        <Form
          onSubmit={validateAndSubmit}
          className={styles.astronautformForm}
          noValidate
        >
          <HUDInput
            name="firstname"
            label="firstname"
            placeholder="John"
            required
            defaultValue={astronautForUpdate?.firstname || ""}
            error={formState.firstname}
            onChange={(e) => setAstronautFirstname(e.target.value)}
          />
          <HUDInput
            name="lastname"
            label="lastname"
            placeholder="Doe"
            required
            defaultValue={astronautForUpdate?.lastname || ""}
            error={formState.lastname}
            onChange={(e) => setAstronautLastname(e.target.value)}
          />
          <Flexbox
            className={styles.astronautformButtons}
            alignItems="center"
            justifyContent="center"
          >
            <HUDButton onClick={onCancel}>CANCEL</HUDButton>
            {mode === "create" ? (
              <HUDButton disabled={!canCreate}>CREATE</HUDButton>
            ) : (
              <HUDButton>EDIT</HUDButton>
            )}
          </Flexbox>
        </Form>
      </HUDWindow>
      {mode !== "edit" && !canCreate && (
        <HUDWindow className={styles.astronautformCannotCreate}>
          <h2>Warning !</h2>
          <p>
            Cannot create an astronaut because the current planet don \'t
            shelters life.
          </p>
          <p>Travel to an another planet to add an astronaut.</p>
        </HUDWindow>
      )}
    </Flexbox>
  );
}
