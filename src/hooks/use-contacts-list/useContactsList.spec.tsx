import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Context, getContactsFixtures } from "../../contexts/http-endpoints";
import { useContactsList } from "./useContactsList";

const RenderAnyComponent = () => {
  const { contactsList, isLoading, error } = useContactsList();
  if (isLoading) return <div data-testid="is-loading">Trwa ładowanie</div>;
  if (error) return <div data-testid="error">{error.message}</div>;

  return (
    <ul data-testid="contacts-list">
      {contactsList.map((contact) => (
        <li key={contact.id}>
          {contact.first_name} {contact.last_name}
        </li>
      ))}
    </ul>
  );
};

describe("useContactsList", () => {
  it("render any component", async () => {
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

  it("should render contacts fetched from `Context.Provider`", async () => {
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

    const contactsList = getByTestId("contacts-list");
    expect(contactsList.querySelectorAll("li")).toHaveLength(
      getContactsFixtures.length
    );
  });

  it("should render loading status when promise is not resolved", async () => {
    const neverEndingPromise = new Promise(() => {});
    const { getByTestId } = render(
      <Context.Provider
        value={{ getContactsList: () => neverEndingPromise as any }}
      >
        <RenderAnyComponent />
      </Context.Provider>
    );

    expect(() => getByTestId("is-loading")).not.toThrow();
    expect(() => getByTestId("contacts-list")).toThrow();
  });

  it("should render error message when promise has been rejected", async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <Context.Provider
          value={{
            getContactsList: () =>
              Promise.reject(new Error("Something happened")),
          }}
        >
          <RenderAnyComponent />
        </Context.Provider>
      );
    });

    const errorMessage = getByTestId("error");
    expect(errorMessage).toHaveTextContent("Something happened");
  });
});
