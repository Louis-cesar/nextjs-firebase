import { useState } from "react";
import Switch from "@mui/material/Switch";

const AdminSwitch = ({ userId, isAdmin, handleSwitch }) => {
  const [checked, setChecked] = useState(isAdmin);

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    handleSwitch(userId, event.target.checked);
  };

  return (
    <>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default AdminSwitch;
