import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { FieldGroup, InputTypes } from "./FieldGroup";

describe("FieldGroup tests", () => {
  it("Test mount", () => {
    const component = TestRenderer.create(<FieldGroup />);
    expect(component).toBeTruthy();
  });
  it("Default type", () => {
    const component = TestRenderer.create(<FieldGroup />).getInstance();
    expect(component.props.type).toEqual(InputTypes.text);
  });
  it("Select type", () => {
    const component = TestRenderer.create(
      <FieldGroup type="select" selectValues={[]} />,
    ).getInstance();
    expect(component.props.type).toEqual(InputTypes.select);
  });
});
