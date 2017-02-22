// The component you want to add
import Table from './index';
import { register } from 'react-easy-styleguide';

// Register takes 5 parameters:
register(
  // 1. The component, or an object containing Component, propTypesComponent:
  Table,
  // 2. A component description (supports Markdown)
  ` How do you like this description? `,
  // 3. A list of different variations for each component,
  // optionally with description
  [
    {
      name: 'Default',
      props: {
      }
    },
    {
      name: 'With headers',
      props: {
        thead: ['Name', 'Job']
      }
    },
    {
      name: 'Striped',
      props: {
        striped: true
      }
    },
    {
      name: 'With caption',
      props: {
        caption: 'Hello, I\'m a caption'
      }
    },
  ],
  {
    data: [
      ['Marco', 'Programmer'],
      ['Dirk', 'Detective'],
      ['Batman', 'Detective'],
      ['Luke', 'Jedi']
    ]
  }
)
