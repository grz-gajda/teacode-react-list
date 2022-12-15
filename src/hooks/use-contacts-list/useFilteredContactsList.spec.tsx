import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Context, getContactsFixtures } from "../../contexts/http-endpoints";
import { useFilteredContactsList } from "./useFilteredContactsList";

const RenderAnyComponent = () => {
  const { contactsList, isLoading, error, setFilterPhrase } =
    useFilteredContactsList();
  if (isLoading) return <div data-testid="is-loading">Trwa ładowanie</div>;
  if (error) return <div data-testid="error">{error.message}</div>;

  return (
    <ul data-testid="contacts-list">
      <li>
        <input
          type="text"
          data-testid="search-input"
          onChange={(e) => setFilterPhrase(e.target.value)}
        />
      </li>
      {contactsList.map((contact) => (
        <li key={contact.id}>
          {contact.first_name} {contact.last_name}
        </li>
      ))}
    </ul>
  );
};

describe("useFilteredContactsList", () => {
  it("should render any component", async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <Context.Provider
          value={{ getContactsList: () => Promise.resolve([]) }}
        >
          <RenderAnyComponent />
        </Context.Provider>
      );
    });

    expect(() => getByTestId("is-loading")).toThrow();
    expect(() => getByTestId("error")).toThrow();
    expect(() => getByTestId("contacts-list")).not.toThrow();
  });

  it("should filter rendered results", async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <Context.Provider
          value={{
            getContactsList: () => Promise.resolve(getContactsFixtures),
          }}
        >
          <RenderAnyComponent />
        </Context.Provider>
      );
    });

    expect(getByTestId("contacts-list").querySelectorAll("li")).toHaveLength(
      getContactsFixtures.length + 1
    );
    fireEvent.change(getByTestId("search-input"), { target: { value: "kyd" } });
    expect(getByTestId("contacts-list").querySelectorAll("li")).toHaveLength(2);
  });
});
