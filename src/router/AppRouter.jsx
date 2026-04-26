import AppShellPage from "../pages/AppShellPage";
import { useBrowserRouter } from "../hooks/useBrowserRouter";

export default function AppRouter() {
  const { route, navigate } = useBrowserRouter();

  return <AppShellPage route={route} navigate={navigate} />;
}
