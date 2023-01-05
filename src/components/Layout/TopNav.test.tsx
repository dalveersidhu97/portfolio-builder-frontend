import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { TopNav } from "./TopNav";

describe("Topnav display", () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<TopNav />
			</BrowserRouter>
		);
	});
  test("Should render About link", () => {
    const about = screen.getByText(/about/i, { selector: "a" });
    expect(about).toBeInTheDocument();
  });
  test("Should render Skills link", () => {
    const link = screen.getByText(/skills/i, { selector: "a" });
    expect(link).toBeInTheDocument();
  });

  test("Should render Experience link", () => {
    const link = screen.getByText(/experience/i, { selector: "a" });
    expect(link).toBeInTheDocument();
  });
  test("Should render Resume link", () => {
    const link = screen.getByText(/resume/i, { selector: "a" });
    expect(link).toBeInTheDocument();
  });
});

describe('Topnav on click', () => {
	test("Should redirect to appropriate path upon clicking nav link", () => {
		const history = createMemoryHistory();
		render(
			<Router location={'/'} navigator={history}>
				<TopNav />
			</Router>
		);
		userEvent.click(screen.getByText(/skills/i));
		expect(history.location.pathname).toBe('/skills');
		userEvent.click(screen.getByText(/resume/i));
		expect(history.location.pathname).toBe('/resume');
		userEvent.click(screen.getByText(/about/i));
		expect(history.location.pathname).toBe('/');
	});	
});

