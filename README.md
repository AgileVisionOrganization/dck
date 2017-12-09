# DCK
DCK (**D**ashboard **C**onstruction **K**it) is a opinionated  way to build React-based applications.

It's being created with several key principles in mind to simplify lives of React developers. Here are it's main principles:

1. Boilerplate is boring. Everyone hates to write the same code again and again. We've got you covered. No more same-looking reducers and copy-pasting of action creators.

2. Typescript is awesome. TypeScript helps to catch a lot of stupid errors that usually are difficult to spot in ES5/ES6

3. Not a silver bullet. This is just another addon on a top of great tools which helps us to solve frequent problems. It's not designed to be 100% applicable for everyone, nor we are not claiming this particular framework is the best. It **works for us**.


## Project Structure
The project is a  monorepo managed by the Lerna tool, that contains four subprojects:

* dck-redux &mdash; Redux-based framework to get rid of CRUD-related boilerplate. Helps you to think about your domain and not about boring stuff.

* dck-lambda-utils &mdash; a set of useful helpers to easily create NodeJS AWS Lambda functions.

* dck-validators &mdash; useful validators for your applications.

* dck-react-components &mdash; some components you might find usefull while developing dashboards and other data-driver applications.