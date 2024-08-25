import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { AuthProvider } from "./Pages/Auth/Auth";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
