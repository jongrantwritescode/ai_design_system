import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.light,
  panelPosition: 'bottom',
  selectedPanel: 'controls',
  initialActive: 'sidebar',
  showNav: true,
  showPanel: true,
  showToolbar: true,
  enableShortcuts: true,
  showSearchBox: true,
  showAddonPanel: true,
  addonPanelInRight: false,
  sortStoriesByKind: false,
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
}); 