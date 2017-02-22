// The component you want to add
import Button from './index';
import { register, action } from 'react-easy-styleguide';

// Register takes 5 parameters:
register(
  // 1. The component, or an object containing Component, propTypesComponent:
  Button,
  // 2. A component description (supports Markdown)
  'Your typical `buttons`, in different shapes, sizes, and colors!',
  // 3. A list of different variations for each component,
  // optionally with description
  [
    {
      name: 'Default',
      props: {
        label: 'I am a button'
      }
    },
    {
      name: 'Success Button',
      props: {
        type: 'success',
        label: 'Great success'
      }
    },
    {
      name: 'Primary Button',
      props: {
        type: 'primary',
        label: 'I am important'
      }
    },
    {
      name: 'Large Primary Button',
      props: {
        type: 'primary',
        size: 'lg',
        label: 'I am importanter'
      }
    },
    {
      name: 'Warning',
      props: {
        type: 'Warning',
        label: 'What does this button do?'
      }
    }
  ],
  {
    onClick: action('You clicked a button!')
  }
)
