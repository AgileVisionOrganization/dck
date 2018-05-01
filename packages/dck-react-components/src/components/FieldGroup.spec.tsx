import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
import { mount} from 'enzyme';
import { FieldGroup, InputTypes, FieldInputType } from "./FieldGroup";
import * as ReactDatetime from "react-datetime"

Enzyme.configure({ adapter: new Adapter() });

describe("FieldGroup tests", () => {
  it("Test mount", () => {
    const component = TestRenderer.create(<FieldGroup />);
    expect(component).toBeTruthy();
  });
  it("Default type", () => {
    const component = TestRenderer.create(<FieldGroup />).getInstance();
    expect(component.props.type).toEqual(InputTypes.text);
  });
  it("DateTimePicker type", () => {
    const component = mount(<FieldGroup type={InputTypes.datetimepicker as FieldInputType}/>);
    expect(component.first().props().type).toEqual(InputTypes.datetimepicker);
  });
  it("TimePicker type", () => {
    const component = mount(<FieldGroup type={InputTypes.timepicker as FieldInputType} />);
    expect(component.first().props().type).toEqual(InputTypes.timepicker);
  });
  it("DatePicker type", () => {
    const component = mount(<FieldGroup type={InputTypes.datepicker as FieldInputType} />);
    expect(component.first().props().type).toEqual(InputTypes.datepicker);
  });
});