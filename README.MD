# Simple styleGuide
This is a tool to easily get a styleguide integrated into your project. It works great with `create-react-app`.

Although there are some really neat styleguide tools for React, they don't really work when you are not using CSS modules. If you rely on global css (for example because your components use styles from Bootstrap, or other CSS frameworks), it seems impossible to use those styles properly without styles conflicting.

_Although I'm currently using this in one of my projects, It's not extensively tested, which is why it's not on NPM as of yet. You should be able to install it anyway by doing `npm install marcohamersma/simple-styleguide`_

## Requirements
The module relies on Webpack's `require.context`, and therefore it needs webpack. I think that should be the only required thing, but let me know in the Issues if there's a problem.

## Setup with React-Router
React router is recommended, but [not necessary](#setup-without-react-router).

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

## Adding components to your styleguide

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

### Colors and Typography
Styleguides often have a list of colors and Typographic styles, simple-styleguide comes with ways of easily registering these for use in the styleguide: `ColorList` and `TypeList`, respectively.

```js
import { register, ColorList } from 'simple-styleguide';

register(
  ColorList({
    'Brand Red':  'color-brand',
    'Brand Blue': 'color-blue',
    'dark':       'color-dark',
    'dark-mid':   'color-dark',
    'light':      'color-light'
  }),
  `The colors of this app are very important!`,
)

register(
  TypeList({
    'Main heading':    'type-h1',
    'Smaller Heading': 'type-h2',
    'Body text':       'type-body',
    'Smaller':         'type-smaller',
  }),
  `The typography of this app is very important!`,
)
```

## Setup without React-Router
After initializing a require context, call `StyleGuide.init()`:

```js
import { init, list, Viewer } from 'simple-styleguide';
import { PropTypes, Component } from 'react';

// Assuming you have a /components folder,
const styleguideContext = require.context('./components/', true, /.info.js$/)

init(styleguideContext);

// Example component
class StyleGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'Button',
      variation: null
    }
  }

  render() {
    return (
      <Viewer
        component={this.state.component}
        variation={this.state.variation}
      />
    )
  }
}
```

By manipulating the state or otherwise changing the props passed to `Viewer`, you can show what component will be rendered out. If `variation` is blank, it will show all variations.

For a list of all components, you can call `simplestyleGuide.list()`. You can then make navigation of some sorts that will manipulate the state for a component like the one above.
