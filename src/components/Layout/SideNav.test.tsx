import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SideNav } from "./SideNav";

describe("SideNav", () => {
  beforeEach(() => {
		render(<BrowserRouter><SideNav/></BrowserRouter>);
	});
  test("Should render name inside h2", () => {
    const name = screen.getByTitle(/name/i);
    expect(name).toBeInTheDocument();
  });
	test("Should render role", () => {
    const role = screen.getByTitle(/role/i);
    expect(role).toBeInTheDocument();
  });
  test("Should render download resume button", () => {
    const downloadButton = screen.getByRole('button', { name: /download resume/i });
    expect(downloadButton).toBeInTheDocument();
  });
	test("Should render person image", () => {
    const image = screen.getByRole('img', { name: /profile image/i });
    expect(image).toBeInTheDocument();
  });
	test("Should render email link", () => {
    const email = screen.getByRole('link', { name: /email/i });
    expect(email).toBeInTheDocument();
  });
	test("Should render phone link", () => {
    const phone = screen.getByRole('link', { name: /phone number/i });
    expect(phone).toBeInTheDocument();
  });
	test("Should render person address", () => {
    const address = screen.getByTitle(/^address/i);
    expect(address).toBeInTheDocument();
  });
	test("Should render social links", () => {
    const linkedin = screen.getByText(/^linkedin/i);
		const github = screen.getByText(/^github/i);
		const facebook = screen.getByText(/^facebook/i);
    expect(linkedin).toBeInTheDocument();
    expect(github).toBeInTheDocument();
    expect(facebook).toBeInTheDocument();
  });
});
