import { useState } from "react";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const AdminSwitch = ({ userId, isAdmin, handleSwitch }) => {
  const [checked, setChecked] = useState(isAdmin);

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    handleSwitch(userId, event.target.checked);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF9900",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Switch
        color="primary"
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </ThemeProvider>
  );
};

export default AdminSwitch;
