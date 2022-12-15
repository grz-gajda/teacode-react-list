import { useEffect, useState } from "react";
import { RawContact } from "../../contexts/http-endpoints";
import { useContactsList } from "./useContactsList";

export function useFilteredContactsList() {
  const { contactsList, isLoading, error } = useContactsList();
  const [filterPhrase, setFilterPhrase] = useState("");
  const [filteredContactsList, setFilteredContactsList] = useState<
    RawContact[]
  >([]);

  useEffect(() => {
    setFilteredContactsList(
      contactsList.filter((contact) =>
        `${contact.first_name} ${contact.last_name}`
          .toLowerCase()
          .includes(filterPhrase)
      )
    );
  }, [contactsList, filterPhrase]);

  return {
    contactsList: filteredContactsList,
    isLoading,
    error,
    setFilterPhrase,
  };
}
