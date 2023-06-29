import { styled, darken } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const CustomButton = styled(Button)`
  background-color: #592720;
  border-radius: 1rem;
  height: 3.5rem;
  :hover {
    background-color: ${darken("#592720", 0.1)};
  }
`;

export const CustomTextField = styled(TextField)`
  && {
    & input,
    & .MuiInputLabel-root,
    & .MuiInput-underline:before,
    & .MuiInput-underline:hover:before,
    & .MuiInput-underline::after {
      background-color: white;
    }

    & .MuiInputBase-input::placeholder {
      color: gray;
    }
  }
`;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#B2A496",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
