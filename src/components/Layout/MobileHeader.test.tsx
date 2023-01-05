import { render, screen } from "@testing-library/react";
import { MobileHeader } from "./MobileHeader";

describe("SideNav", () => {
  beforeEach(() => {
    render(<MobileHeader />);
  });
  test.todo("Mobile header should not be visible on larger displays");
});
