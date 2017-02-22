import { register, ColorList, TypeList } from 'react-easy-styleguide';

register(
  ColorList({
    'primary': 'bg-primary',
    'success': 'bg-success',
    'info':    'bg-info',
    'warning': 'bg-warning',
    'danger':  'bg-danger'
  }),
  `Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes.`,
)

register(
  TypeList({
    'Bootstrap h1': 'h1',
    'Bootstrap h2': 'h2',
    'Bootstrap h3': 'h3',
    'Bootstrap h4': 'h4',
    'Bootstrap h5': 'h5',
    'Bootstrap h6': 'h6',
    'Lead body copy': 'lead',
    'Small text': 'small'
  }),
  'All HTML headings, `<h1>` through `<h6>`, are available. `.h1` through `.h6` classes are also available, for when you want to match the font styling of a heading but still want your text to be displayed inline.',
)
