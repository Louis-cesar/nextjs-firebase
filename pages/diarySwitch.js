import { useState } from "react";
import Switch from "@mui/material/Switch";

const DiarySwitch = ({ userId, isDone, handleSwitch }) => {
  const [done, setDone] = useState(isDone);

  const handleDiary = async (event) => {
    setDone(event.target.done);
    handleSwitch(userId, event.target.done);
  };

  return (
    <>
      <Switch
        checked={done}
        onChange={handleDiary}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default DiarySwitch;
