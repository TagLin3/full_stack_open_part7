import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel, children } = props;
  const [visibility, setVisibility] = useState();

  const showWhenHidden = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={showWhenHidden}>
        <Button variant="outlined" type="button" onClick={toggleVisibility} id={props.buttonId}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          sx={{
            margin: "5px",
          }}
          color="error"
          variant="outlined"
          type="button"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Toggleable;
