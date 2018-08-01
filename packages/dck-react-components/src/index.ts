/**
 * @module dck-react-components
 */

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

export * from "./components/SidebarItem";
export * from "./components/Sidebar";
export * from "./components/SearchField";
export * from "./components/ProgressOverlay";
export * from "./components/InternalPage";
export * from "./components/ExternalPage";
export { IFieldGroupInputProps, FieldGroup, FieldInputType} from "./components/FieldGroup";
export { IModalDialog, ModalDialog } from "./components/ModalDialog";
export * from "./utils";
