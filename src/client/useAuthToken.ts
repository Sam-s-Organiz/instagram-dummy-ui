import { useState, useEffect } from "react";

export const useAuthToken = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    setJwtToken(storedToken);
  }, []);

  return jwtToken;
};
