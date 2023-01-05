import { render, screen } from "@testing-library/react";
import { Card } from ".";

describe("Card", () => {
  test("Should render aobut page", () => {
    render(<Card title="Test title" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });
  test("Should render title and icon", () => {
    render(<Card title="Test title" Icon={<div>Icon</div>} />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });
  test("Should render children", () => {
    render(<Card title="Test title" Icon={<div>Icon</div>} ><p>Children</p></Card>);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
