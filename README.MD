# Simple styleGuide
This is a tool to easily get a styleguide integrated into your project. It works great with `create-react-app`.

_**note**: In the screenshots I used Bootstrap styles as a way of showing some basic components and styles, but of course you can use it with your own styles and components_.

![](https://cloud.githubusercontent.com/assets/577144/23210205/722b28e6-f8f4-11e6-8366-c262775c98cb.png)

Although there are some really neat styleguide tools for React, they don't really work when you are not using CSS modules. If you rely on global css (for example because your components use styles from Bootstrap, or other CSS frameworks), it seems impossible to use those styles properly without styles conflicting.

_Although I'm currently using this in one of my projects, It's not extensively tested, which is why it's not on NPM as of yet. You should be able to install it anyway by doing `npm install marcohamersma/react-easy-styleguide --save`_

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
import { RouterLayout as StyleGuide } from 'react-easy-styleguide';
import { PropTypes } from 'react';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      …
    </Route>

    <Route
      path="/styleguide(/:component(/:variation))"
      component={StyleGuide(styleguideContext, {
        name: 'My StyleGuide',
        propTypes: React.PropTypes
      })}
    />
  </Router>
);
```
The second argument to the `StyleGuide`/`RouterLayout` method is optional, but allows for passing a `name` (title) and a `propTypes` property. Passing along a PropTypes property will allow the (limited) detection of PropTypes for your components.

If you start your app now, and go to `/styleguide`, you should be able to see the styleguide running.

## Adding components to your styleguide

```js
// The component you want to add
import Button from './Button';
import { register } from 'react-easy-styleguide';

// Register takes 5 parameters:
register(
  // 1. The component, or an object containing Component, propTypesComponent:
  Button,
  // 2. A component description (supports Markdown)
  ` How do you like this description? `,
  // 3. A list of different variations for each component,
  // optionally with description
  [
    {
      name: 'Default',
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
  // 5. Optionally, a Higher Order or wrapping component, in case you need to pass some extra props to it, like a Redux connected component.
  reduxWrapper
)
```

### Action helper
You can also use the `action` helper function to easily log things that happen, for example in onClick Handlers:

```js
import { register, action } from 'react-easy-styleguide';
…
{
  name: 'Default',
  description: 'How do you like _this_ description?',
  props: {
    label: "Hello!",
    onClick: action('Basic button happenings!')
  }
},
```

When the function is executed, it will print out a console message with the text you provided and the arguments passed, something similar to this:
`[ACTION] Basic button happenings! ▶︎ [Proxy, Event]`

### Colors and Typography
Styleguides often have a list of colors and Typographic styles, react-easy-styleguide comes with ways of easily registering these for use in the styleguide: `ColorList` and `TypeList`, respectively.

![Typography](https://cloud.githubusercontent.com/assets/577144/23210204/72097e08-f8f4-11e6-867b-18ba8ff5569b.png)

![Colors](https://cloud.githubusercontent.com/assets/577144/23210206/7238ad90-f8f4-11e6-9ff7-f993f8a7ef19.png)

Like with components, you can create a `design.info.js` file and call the `register()` from it. Instead of passing a Component class, use the `ColorList` or `TypeList` components, they each receive an object, the keys being the display name, and the value the CSS class that should be applied to the element to see the style.

```js
import { register, ColorList, TypeList } from 'react-easy-styleguide';

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

#### A note on component order
Although `*.info` files in the component folder should be picked up automatically, the order in which this happens can be arbitrary. Since you might want to have the colors and typography at the top of the component list, you might want to explicitly import/require this file before you create the styleguideContext:

```js
require('./design.info.js');
const styleguideContext = require.context('./components/', true, /.info.js$/)
```

### Registering higher order components
If the component you passed to [`register`](#adding-components-to-your-styleguide)'s first parameter is contained inside another one, simple-stype-guide will not be able to accurately detect the name and proptypes of the component, you can pass these manually by passing an Object instead:

```js
register(
  {
    Component: ComponentToBeRendered,
    propTypesComponent: ComponentToGetPropTypesFrom,
    name: 'Input' // Optional, defaults to propTypesComponent's displayName or name.
  },
  …
)
```

### Higher Order Components / Redux
Sometimes you might want to wrap a styleguide component in another component to make sure the dataflow is correct. The fifth parameter in the [`register`](#adding-components-to-your-styleguide) function takes a wrapping component class, which will be passed a `Component` and `componentProps` prop. Here's an example component you might pass:

```js
import { connect } from 'react-redux';
import React from 'react';

function StyleGuideWrapper(props) {
  const {Component, componentProps, storeData, ...rest} = props;

  return (
    <Component {...componentProps} storeData={storeData} {...rest} />
  );
);

export default connect(
  storeData => ({ storeData: storeData.styleGuide }),
  dispatch => ({
    …
  })
)(StyleGuideWrapper)

```

## Setup without React-Router
After initializing a require context, call `StyleGuide.init()`:

```js
import { init, list, Viewer } from 'react-easy-styleguide';
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
