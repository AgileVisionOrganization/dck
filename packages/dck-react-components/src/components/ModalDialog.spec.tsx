import * as React from "react";
import * as Adapter from "enzyme-adapter-react-15";
import { mount, configure } from "enzyme";
import { ModalDialog } from "./ModalDialog";
import * as ReactDatetime from "react-datetime";

configure({ adapter: new Adapter() });
describe("ModalDialog tests", () => {
  it("Test mount", () => {
    const component = mount(<ModalDialog title="Sample title" show={true}>Children</ModalDialog>);
    expect(component).toBeTruthy();
  });
  it("Children check", () => {
    const component = mount(<ModalDialog title="Sample title" show={false}>Children</ModalDialog>);
    expect(component.first().props().children).toEqual("Children");
  });
});
