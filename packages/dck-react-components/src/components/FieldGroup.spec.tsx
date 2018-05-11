import * as React from "react";
import * as Adapter from "enzyme-adapter-react-15";
import { mount, configure } from "enzyme";
import { FieldGroup, InputTypes, FieldInputType } from "./FieldGroup";
import * as ReactDatetime from "react-datetime";

configure({ adapter: new Adapter() });
describe("FieldGroup tests", () => {
  it("Test mount", () => {
    const component = mount(<FieldGroup />);
    expect(component).toBeTruthy();
  });
  it("Default type", () => {
    const component = mount(<FieldGroup />);
    expect(component.first().props().type).toEqual(InputTypes.text);
  });
  it("Select type", () => {
    const component = mount(<FieldGroup type="select" selectValues={[]} />);
    expect(component.first().props().type).toEqual(InputTypes.select);
  });

  it("DateTimePicker type", () => {
    const component = mount(
      <FieldGroup type={InputTypes.datetimepicker as FieldInputType} />,
    );
    expect(component.first().props().type).toEqual(InputTypes.datetimepicker);
  });
  it("TimePicker type", () => {
    const component = mount(
      <FieldGroup type={InputTypes.timepicker as FieldInputType} />,
    );
    expect(component.first().props().type).toEqual(InputTypes.timepicker);
  });
  it("DatePicker type", () => {
    const component = mount(
      <FieldGroup type={InputTypes.datepicker as FieldInputType} />,
    );
    expect(component.first().props().type).toEqual(InputTypes.datepicker);
  });
});
