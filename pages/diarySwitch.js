import { useState } from "react";
import Switch from "@mui/material/Switch";

const DiarySwitch = ({ id, done, handleSwitch }) => {
  const [checked, setChecked] = useState(done);

  const handleDiary = async (event) => {
    setChecked(event.target.checked);
    handleSwitch(id, event.target.checked);
  };

  return (
    <>
      <Switch
        checked={checked}
        onChange={handleDiary}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default DiarySwitch;
