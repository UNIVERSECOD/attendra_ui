import { useCallback, useEffect, useState } from "react";
import { parseRoute } from "../constants/routes";

export function useBrowserRouter() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((nextPath) => {
    if (window.location.pathname === nextPath) {
      setRoute(parseRoute(nextPath));
      return;
    }

    window.history.pushState({}, "", nextPath);
    setRoute(parseRoute(nextPath));
  }, []);

  return {
    route,
    navigate,
  };
}
