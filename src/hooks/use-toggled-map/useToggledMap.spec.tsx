import { fireEvent, render } from "@testing-library/react";
import { useToggledMap } from "./useToggledMap";

const RandomComponent = () => {
  const { get, set } = useToggledMap();
  return (
    <div>
      <li data-testid="row-1">
        <input
          data-testid="row-1-ch"
          type="checkbox"
          checked={get(1)}
          onChange={() => set(1)}
        />
      </li>
      <li data-testid="row-2">
        <input
          data-testid="row-2-ch"
          type="checkbox"
          checked={get(2)}
          onChange={() => set(2)}
        />
      </li>
    </div>
  );
};

describe("useToggledMap", () => {
  it("should render component with all checkboxes not checked", () => {
    const { getByTestId } = render(<RandomComponent />);
    const firstCheckbox = getByTestId("row-1").querySelector("input");
    expect(firstCheckbox?.checked).toBeFalsy();

    const secondCheckbox = getByTestId("row-2").querySelector("input");
    expect(secondCheckbox?.checked).toBeFalsy();
  });

  it("should allow to change the state of checkbox", () => {
    const { getByTestId } = render(<RandomComponent />);
    fireEvent.click(getByTestId("row-1-ch"), {});

    const firstCheckbox = getByTestId("row-1").querySelector("input");
    expect(firstCheckbox?.checked).toBeTruthy();

    const secondCheckbox = getByTestId("row-2").querySelector("input");
    expect(secondCheckbox?.checked).toBeFalsy();
  });
});
