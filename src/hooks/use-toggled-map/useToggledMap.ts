import { useCallback, useState } from "react";

const applyConsoleLogForSelectedIDs = (
  records: Record<number, boolean>
): void => {
  const ids = Object.keys(records).filter((id) => {
    return records[parseInt(id, 10)] === true;
  });
  console.log("you should console.log IDs of all selected contacts:", ids);
};

export function useToggledMap() {
  const [toggledMap, setToggledMap] = useState<Record<number, boolean>>({});
  const getFn = (id: number): boolean => {
    return typeof toggledMap[id] === "boolean" ? toggledMap[id] : false;
  };

  const setFn = useCallback((id: number) => {
    setToggledMap((prev) => {
      const newState = { ...prev, [id]: prev[id] ? false : true };
      applyConsoleLogForSelectedIDs(newState);

      return newState;
    });
  }, []);

  return {
    get: getFn,
    set: setFn,
  };
}
