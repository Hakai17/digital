import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "dayjs/locale/pt-br";
import { SnackbarProvider } from "notistack";
import { GlobalStyle } from "./configs/ThemeConfig";

import TimerContextProvider from "../src/contexts/TimerContext";
import { Backdrop } from "./components";
import { queryClient } from "./configs/ReactQueryConfig";
import { theme } from "./configs/ThemeConfig";
import AttendanceContextProvider from "./contexts/AttendanceContext";
import AuthContextProvider from "./contexts/AuthContext";
import BackdropContextProvider from "./contexts/BackdropContext";
import WhatsAppContextProvider from "./contexts/WhatsAppContext";
import { Routes } from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BackdropContextProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <CssBaseline />
          <GlobalStyle />
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <WhatsAppContextProvider>
                <TimerContextProvider>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"pt-br"}
                  >
                    <AttendanceContextProvider>
                      <Routes />
                      <Backdrop />
                    </AttendanceContextProvider>
                  </LocalizationProvider>

                  <ReactQueryDevtools />
                </TimerContextProvider>
              </WhatsAppContextProvider>
            </AuthContextProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </BackdropContextProvider>
    </ThemeProvider>
  );
}

export default App;
