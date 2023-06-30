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
      background-color: transparent;
    }

    & .MuiInputBase-input::placeholder {
      color: gray;
    }
  }
`;
