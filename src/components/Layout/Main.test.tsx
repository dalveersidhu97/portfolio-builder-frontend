import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./Main";

test("Should render children", () => {
	const TextElement = () => <p>Test Element</p>
	render(
    <BrowserRouter>
      <Main><TextElement></TextElement></Main>
    </BrowserRouter>
  );
  const testElement = screen.getByText('Test Element');
  expect(testElement).toBeInTheDocument();
});
