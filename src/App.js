import React from "react";
import Routers from "./routes";
import "./assets/css/style.css";
import { SnackbarProvider } from "notistack";
import { Button, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContentSettingState } from "./Hooks/ContentSetting";

function App() {
  const notistackRef = React.createRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <div className="App">
      <SnackbarProvider
        ref={notistackRef}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
        action={(key) => (
          <Button className="snackbar-cross-icon" onClick={onClickDismiss(key)}>
            <CloseIcon />
          </Button>
        )}
      >
        <ContentSettingState>
          <Routers />
        </ContentSettingState>
      </SnackbarProvider>
    </div>
  );
}

export default App;
