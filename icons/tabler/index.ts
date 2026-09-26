import { TablerAccessibleIcon } from './accessible';
import { TablerActivityIcon } from './activity';
import { TablerAirConditioningIcon } from './air-conditioning';
import { TablerAlarmIcon } from './alarm';
import { TablerArrowDownIcon } from './arrow-down';
import { TablerArrowLeftIcon } from './arrow-left';
import { TablerArrowRightIcon } from './arrow-right';
import { TablerArrowUpIcon } from './arrow-up';
import { TablerBellIcon } from './bell';
import { TablerCalendarIcon } from './calendar';
import { TablerCheckIcon } from './check';
import { TablerChevronDownIcon } from './chevron-down';
import { TablerChevronLeftIcon } from './chevron-left';
import { TablerChevronRightIcon } from './chevron-right';
import { TablerChevronUpIcon } from './chevron-up';
import { TablerDownloadIcon } from './download';
import { TablerEyeIcon } from './eye';
import { TablerFilterIcon } from './filter';
import { TablerHeartIcon } from './heart';
import { TablerHomeIcon } from './home';
import { TablerLockIcon } from './lock';
import { TablerMailIcon } from './mail';
import { TablerMenuIcon } from './menu';
import { TablerPencilIcon } from './pencil';
import { TablerPlaneIcon } from './plane';
import { TablerPlusIcon } from './plus';
import { TablerRefreshIcon } from './refresh';
import { TablerSaveIcon } from './save';
import { TablerSearchIcon } from './search';
import { TablerSettingsIcon } from './settings';
import { TablerShareIcon } from './share';
import { TablerStarIcon } from './star';
import { TablerTrashIcon } from './trash';
import { TablerUploadIcon } from './upload';
import { TablerUserIcon } from './user';
import { TablerXIcon } from './x';

const TABLER_ICON_LIST = [
  {
    name: 'accessible',
    icon: TablerAccessibleIcon,
    keywords: ['accessible', 'accessibility'],
  },
  { name: 'activity', icon: TablerActivityIcon, keywords: ['activity'] },
  {
    name: 'air-conditioning',
    icon: TablerAirConditioningIcon,
    keywords: ['air', 'conditioning', 'air-vent', 'vent'],
  },
  {
    name: 'alarm',
    icon: TablerAlarmIcon,
    keywords: ['alarm', 'alarm-clock', 'clock'],
  },
  {
    name: 'arrow-down',
    icon: TablerArrowDownIcon,
    keywords: ['arrow', 'down', 'direction', 'south', 'bottom', 'arrow-down'],
  },
  {
    name: 'arrow-left',
    icon: TablerArrowLeftIcon,
    keywords: ['arrow', 'left', 'direction', 'west', 'back', 'arrow-left'],
  },
  {
    name: 'arrow-right',
    icon: TablerArrowRightIcon,
    keywords: [
      'arrow',
      'right',
      'direction',
      'east',
      'forward',
      'next',
      'arrow-right',
    ],
  },
  {
    name: 'arrow-up',
    icon: TablerArrowUpIcon,
    keywords: ['arrow', 'up', 'direction', 'north', 'top', 'arrow-up'],
  },
  {
    name: 'bell',
    icon: TablerBellIcon,
    keywords: ['bell', 'notification', 'alert', 'ring', 'alarm'],
  },
  {
    name: 'calendar',
    icon: TablerCalendarIcon,
    keywords: ['calendar', 'date', 'schedule', 'event', 'day'],
  },
  {
    name: 'check',
    icon: TablerCheckIcon,
    keywords: ['check', 'done', 'success', 'complete', 'validate', 'tick'],
  },
  {
    name: 'chevron-down',
    icon: TablerChevronDownIcon,
    keywords: [
      'chevron',
      'down',
      'direction',
      'south',
      'bottom',
      'collapse',
      'chevron-down',
    ],
  },
  {
    name: 'chevron-left',
    icon: TablerChevronLeftIcon,
    keywords: [
      'chevron',
      'left',
      'direction',
      'west',
      'back',
      'previous',
      'chevron-left',
    ],
  },
  {
    name: 'chevron-right',
    icon: TablerChevronRightIcon,
    keywords: [
      'chevron',
      'right',
      'direction',
      'east',
      'forward',
      'next',
      'chevron-right',
    ],
  },
  {
    name: 'chevron-up',
    icon: TablerChevronUpIcon,
    keywords: [
      'chevron',
      'up',
      'direction',
      'north',
      'top',
      'expand',
      'chevron-up',
    ],
  },
  {
    name: 'download',
    icon: TablerDownloadIcon,
    keywords: ['download', 'save', 'arrow', 'get', 'export'],
  },
  {
    name: 'eye',
    icon: TablerEyeIcon,
    keywords: ['eye', 'view', 'see', 'visible', 'show', 'watch'],
  },
  {
    name: 'filter',
    icon: TablerFilterIcon,
    keywords: ['filter', 'sort', 'funnel', 'refine', 'search'],
  },
  {
    name: 'heart',
    icon: TablerHeartIcon,
    keywords: ['heart', 'love', 'like', 'favorite', 'health'],
  },
  {
    name: 'home',
    icon: TablerHomeIcon,
    keywords: ['home', 'house', 'building', 'main', 'dashboard'],
  },
  {
    name: 'lock',
    icon: TablerLockIcon,
    keywords: [
      'lock',
      'security',
      'password',
      'secure',
      'private',
      'lock-keyhole',
      'keyhole',
    ],
  },
  {
    name: 'mail',
    icon: TablerMailIcon,
    keywords: ['mail', 'email', 'envelope', 'message', 'letter'],
  },
  {
    name: 'menu',
    icon: TablerMenuIcon,
    keywords: ['menu', 'hamburger', 'list', 'navigation', 'lines'],
  },
  {
    name: 'pencil',
    icon: TablerPencilIcon,
    keywords: ['pencil', 'edit', 'write', 'pen', 'modify'],
  },
  { name: 'plane', icon: TablerPlaneIcon, keywords: ['plane', 'airplane'] },
  {
    name: 'plus',
    icon: TablerPlusIcon,
    keywords: ['plus', 'add', 'new', 'create', 'increase'],
  },
  {
    name: 'refresh',
    icon: TablerRefreshIcon,
    keywords: [
      'refresh',
      'reload',
      'update',
      'sync',
      'rotate',
      'refresh-ccw',
      'ccw',
    ],
  },
  {
    name: 'save',
    icon: TablerSaveIcon,
    keywords: ['save', 'store', 'disk', 'floppy', 'preserve'],
  },
  {
    name: 'search',
    icon: TablerSearchIcon,
    keywords: ['search', 'find', 'magnifying glass', 'lookup', 'query'],
  },
  {
    name: 'settings',
    icon: TablerSettingsIcon,
    keywords: ['settings', 'gear', 'cog', 'preferences', 'config'],
  },
  {
    name: 'share',
    icon: TablerShareIcon,
    keywords: ['share', 'send', 'social', 'network', 'distribute'],
  },
  {
    name: 'star',
    icon: TablerStarIcon,
    keywords: ['star', 'favorite', 'bookmark', 'rate', 'rating'],
  },
  {
    name: 'trash',
    icon: TablerTrashIcon,
    keywords: ['trash', 'delete', 'remove', 'bin', 'garbage'],
  },
  {
    name: 'upload',
    icon: TablerUploadIcon,
    keywords: ['upload', 'send', 'arrow', 'put', 'import'],
  },
  {
    name: 'user',
    icon: TablerUserIcon,
    keywords: ['user', 'person', 'profile', 'account', 'avatar'],
  },
  {
    name: 'x',
    icon: TablerXIcon,
    keywords: ['close', 'x', 'cancel', 'dismiss', 'remove', 'delete'],
  },
];

export {
  TABLER_ICON_LIST,
  TablerAccessibleIcon,
  TablerActivityIcon,
  TablerAirConditioningIcon,
  TablerAlarmIcon,
  TablerArrowDownIcon,
  TablerArrowLeftIcon,
  TablerArrowRightIcon,
  TablerArrowUpIcon,
  TablerBellIcon,
  TablerCalendarIcon,
  TablerCheckIcon,
  TablerChevronDownIcon,
  TablerChevronLeftIcon,
  TablerChevronRightIcon,
  TablerChevronUpIcon,
  TablerDownloadIcon,
  TablerEyeIcon,
  TablerFilterIcon,
  TablerHeartIcon,
  TablerHomeIcon,
  TablerLockIcon,
  TablerMailIcon,
  TablerMenuIcon,
  TablerPencilIcon,
  TablerPlaneIcon,
  TablerPlusIcon,
  TablerRefreshIcon,
  TablerSaveIcon,
  TablerSearchIcon,
  TablerSettingsIcon,
  TablerShareIcon,
  TablerStarIcon,
  TablerTrashIcon,
  TablerUploadIcon,
  TablerUserIcon,
  TablerXIcon,
};
