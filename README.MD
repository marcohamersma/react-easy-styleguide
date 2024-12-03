# react-easy-styleguide

**This tool is basically unmaintained, and is only updated sporadically for compatibility reasons. Please use alternatives such as Storybook**

----

This is a tool to easily get a styleguide integrated into your project. It works great with `create-react-app`.

_**note**: In the screenshots I used Bootstrap styles as a way of showing some basic components and styles, but of course you can use it with your own styles and components_.

![](https://cloud.githubusercontent.com/assets/577144/23210205/722b28e6-f8f4-11e6-8366-c262775c98cb.png)

Although there are some really neat styleguide tools for React, they don't really work when you are not using CSS modules. If you rely on global css (for example because your components use styles from Bootstrap, or other CSS frameworks), it seems impossible to use those styles properly without styles conflicting.

## Screencast
I've recorded a screencast showing how to integrate the tool into your project. [View the screencast](https://www.youtube.com/watch?v=MYsTMgN3jNQ).

## Installation
run `npm install react-easy-styleguide`

## Requirements
The module relies on Webpack's `require.context`, and therefore it needs webpack. I think that should be the only required thing, but let me know in the Issues if there's a problem.

## Setup
To start, we need to tell the styleguide which components to load, it expects a `component.info.js` file to be present for every component in your styleguide, so we use WebPack's requireContext to load them dynamically.

```js
// Assuming you have a /components folder,
const styleguideContext = require.context('./components/', true, /.info.js$/)
```

Then require the create function from `react-easy-styleguide`. This function takes a couple of setup parameters and will return a React component:

```js
import { create as createStyleGuide } from 'react-easy-styleguide';
import PropTypes from 'prop-types';

const Styleguide = createStyleGuide(styleguideContext, {
  name: 'My StyleGuide',
  propTypes: PropTypes
  path: '/styleguide' // this is the default
})
```

The second argument to styleguide's `create` function is optional, but allows for passing a `name` (title) and a `propTypes` and `path` property. Passing along a PropTypes property will allow the (limited) detection of PropTypes for your components.

The component returned by the `create` function can receive two props: `component` and `variation`. This will tell the styleguide which component to load, and which variation of this component to highlight.

If you are using react-router, you can mount this component like this:

```jsx
const Styleguide = createStyleGuide(styleguideContext, {
  // pass `Link` or NavLink` to the styleguide to use react-router
  // for navigating.
  routerLink: require('react-router-dom').NavLink,
  …
})

<Route
  path="/styleguide/:component?/:variation?"
  component={Styleguide}
/>

```

By default, `react-easy-styleguide` expects to be mounted at `/styleguide`, but by passing `path` you can change this to anything else, for example when your entire app is mounted in a subfolder.

If you start your app now, and go to `/styleguide`, you should be able to see the styleguide running.

## Adding components to your styleguide
For each component you want to show in your styleguide, you need to call `react-easy-styleguide`'s `register` function as shown below. I recommend you create a `.info.js` file for each component. For example, if you have a file called Button.js, you can create a `buttons.info.js` file:

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

If you intend to use `react-easy-stylesheet` in a minified bundle on a server, your component names might get mangled and show up as one-letter items in the navigation. You can add a `displayName` property to the component, or manually register the name:

### Manual registration
In some cases, you might want to manually pass the name and proptypes to the `register` function, for example the name or proptypes cannot be obtained from the component passed. This might happen when you've wrapped your components in another component.


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
  `The colors of this app are very important!`
)

register(
  TypeList({
    'Main heading':    'type-h1',
    'Smaller Heading': 'type-h2',
    'Body text':       'type-body',
    'Smaller':         'type-smaller',
  }),
  `The typography of this app is very important!`
)
```

#### A note on component order
Although `*.info` files in the component folder should be picked up automatically, the order in which this happens can be arbitrary. Since you might want to have the colors and typography at the top of the component list, you might want to explicitly import/require this file before you create the styleguideContext:

```js
require('./design.info.js');
const styleguideContext = require.context('./components/', true, /.info.js$/)
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
