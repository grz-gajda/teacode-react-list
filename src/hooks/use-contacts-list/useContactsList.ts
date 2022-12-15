import { useContext, useEffect, useState } from "react";
import { Context, RawContact } from "../../contexts/http-endpoints";

const sortByLastName = (a: RawContact, b: RawContact): number => {
  return a.last_name < b.last_name ? -1 : a.last_name > b.last_name ? 1 : 0;
};

export function useContactsList() {
  const httpEndpoints = useContext(Context);
  const [contactsList, setContactsList] = useState<RawContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    httpEndpoints
      .getContactsList()
      .then((contacts: RawContact[]) =>
        setContactsList(contacts.sort(sortByLastName))
      )
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [httpEndpoints]);

  return {
    contactsList,
    isLoading,
    error,
  };
}
