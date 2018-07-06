# DCK React Components

## ModalDialog
Info about using async functions:
1. If async function passed to ModalDialog handled correctly, the dialog must close automatically. You need to pass two properties - **isAsyncOperationSuccess** and **isAsyncOperationFailed** for check async operation state.
Also, you can pass function using **onAsyncOperationSuccess** property, which will be launched after async operation success.
2. If async function failed then ModalDialog prevent closing and show warning message that specified in **asyncOperationFailedMessage** property.
3. To handle closing event, you can pass function using **onClose** property. This function will be executed when ModalDialog is closed.

## CSS dependencies
For correct display please also add next imports to your project:
+ import react-select/dist/react-select.css
+ import react-datetime/css/react-datetime.css