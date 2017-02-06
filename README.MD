# Simple stylesheet
## Requirements
- Webpack + es6 + react presets

## Setup with React-Router
React router is recommended, but not necessary.

To start, we need to tell the styleguide which components to load, it expects a `component.info.js` file to be present for every component in your styleguide, so we use WebPack's requireContext to load them dynamically. You might want to do this in the file where you declare your routes.

```js
// Assuming you have a /components folder,
const styleguideContext = require.context('./components/', true, /.info.js$/)
```

Then require the RouterLayout, and add a route for the styleguide:

```js
import { RouterLayout as StyleGuide } from 'simple-styleguide';
import { PropTypes } from 'react';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      …
    </Route>

    <Route
      path="/styleguide(/:component(/:variation))"
      component={StyleGuide(styleguideContext, React.PropTypes)}
    />
  </Router>
);
```
The second argument to the `StyleGuide`/`RouterLayout` method is optional, but allows for the (limited) detection of PropTypes for your components.

If you start your app now, and go to `/styleguide`, you should be able to see the styleguide running.

```js
// The component you want to add
import Button from './Button';
import { register } from 'simple-styleguide';

// Register takes 4 parameters:
register(
  // 1. The component
  Button,
  // 2. A component description (supports Markdown)
  ` How do you like this description? `,
  // 3. A list of different variations for each component,
  // optionally with description
  [
    {
      name: 'Basic',
      description: 'How do you like _this_ description?',
      props: {
        label: "Hello!"
      }
    },
  ],
  // 4. Optionally; a list of default props that will be applied to all variations
  {
    someProp: 'Hello'
  }
)
```

### Action helper
You can also use the `action` helper function to easily log things that happen, for example in onClick Handlers:

```js
import { register, action } from 'simple-styleguide';
…
{
  name: 'Basic',
  description: 'How do you like _this_ description?',
  props: {
    label: "Hello!",
    onClick: action('Basic button happenings!')
  }
},
```
