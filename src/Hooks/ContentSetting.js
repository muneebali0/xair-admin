import React, { useContext, useState } from "react";
import { _get_user_from_localStorage } from "../localStorage/localStorage";

const CreateContentSetting = React.createContext();
const _get_user_info = _get_user_from_localStorage();

//----------------------
export const useContentSetting = () => useContext(CreateContentSetting);
export function ContentSettingState({ children }) {
  const [userInfo, setUserInfo] = useState(_get_user_info);

  const collection = {
    userInfo,
    setUserInfo,
  };

  return (
    <CreateContentSetting.Provider value={collection}>
      {children}
    </CreateContentSetting.Provider>
  );
}
