# Simple stylesheet
## Requirements
- Webpack + es6 + react presets

## Setup
1. In the place where you want to list your components, paste the following code:
```js
import * as styleGuide from 'simple-styleguide';

// Assuming you have a /components folder, change the path if you need to
const req = require.context('./components/', true, /.info.js$/)
styleGuide.init(req);
```

2. For all components you want to have in your styleguide, create a `component.info.js` file like this:
```js
import Button from './Button';
import { register } from 'simple-styleguide';

// Register takes 3 parameters:
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
  ]
])
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
