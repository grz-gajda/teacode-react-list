import { createContext, ReactNode, useCallback } from "react";
import { getContacts, RawContact } from "./get-contacts";

export const Context = createContext({
  getContactsList: () => Promise.resolve<RawContact[]>([]),
});

type EndpointsContextProps = {
  children: ReactNode;
};

export function EndpointsProvider({ children }: EndpointsContextProps) {
  const getContactCallback = useCallback(getContacts, []);

  return (
    <Context.Provider value={{ getContactsList: getContactCallback }}>
      {children}
    </Context.Provider>
  );
}
