import { styled, darken } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const CustomButton = styled(Button)`
  background-color: #592720;
  border-radius: 1rem;
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
      color: white;
    }

    & .MuiInput-underline:before,
    & .MuiInput-underline:hover:before,
    & .MuiInput-underline::after {
      border-bottom-color: white;
    }

    & label.Mui-focused {
      color: white;
    }

    & .MuiInputBase-input {
      color: white;
      padding-top: 8px;
      padding-left: 4px;
    }

    & .MuiInputBase-input::placeholder {
      color: white;
    }

    border-radius: 2rem;
  }
`;
