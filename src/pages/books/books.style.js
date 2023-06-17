import { styled, darken } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const CustomButton = styled(Button)`
  background-color: #592720;
  border-radius: 1rem;
  :hover {
    background-color: ${darken("#592720", 0.1)};
  }
`;
