import { HugeiconsArrowDownIcon } from './arrow-down';
import { HugeiconsArrowLeftIcon } from './arrow-left';
import { HugeiconsArrowRightIcon } from './arrow-right';
import { HugeiconsArrowUpIcon } from './arrow-up';
import { HugeiconsBellIcon } from './bell';
import { HugeiconsCalendarIcon } from './calendar';
import { HugeiconsCheckIcon } from './check';
import { HugeiconsChevronDownIcon } from './chevron-down';
import { HugeiconsChevronLeftIcon } from './chevron-left';
import { HugeiconsChevronRightIcon } from './chevron-right';
import { HugeiconsChevronUpIcon } from './chevron-up';
import { HugeiconsDownloadIcon } from './download';
import { HugeiconsEyeIcon } from './eye';
import { HugeiconsFilterIcon } from './filter';
import { HugeiconsHeartIcon } from './heart';
import { HugeiconsHomeIcon } from './home';
import { HugeiconsLockIcon } from './lock';
import { HugeiconsMailIcon } from './mail';
import { HugeiconsMenuIcon } from './menu';
import { HugeiconsPencilIcon } from './pencil';
import { HugeiconsPlusIcon } from './plus';
import { HugeiconsRefreshIcon } from './refresh';
import { HugeiconsSaveIcon } from './save';
import { HugeiconsSearchIcon } from './search';
import { HugeiconsSettingsIcon } from './settings';
import { HugeiconsShareIcon } from './share';
import { HugeiconsStarIcon } from './star';
import { HugeiconsTrashIcon } from './trash';
import { HugeiconsUploadIcon } from './upload';
import { HugeiconsUserIcon } from './user';
import { HugeiconsXIcon } from './x';

const HUGEICONS_ICON_LIST = [
  {
    name: 'arrow-down',
    icon: HugeiconsArrowDownIcon,
    keywords: ['arrow', 'down', 'direction', 'south', 'bottom'],
  },
  {
    name: 'arrow-left',
    icon: HugeiconsArrowLeftIcon,
    keywords: ['arrow', 'left', 'direction', 'west', 'back'],
  },
  {
    name: 'arrow-right',
    icon: HugeiconsArrowRightIcon,
    keywords: ['arrow', 'right', 'direction', 'east', 'forward', 'next'],
  },
  {
    name: 'arrow-up',
    icon: HugeiconsArrowUpIcon,
    keywords: ['arrow', 'up', 'direction', 'north', 'top'],
  },
  {
    name: 'bell',
    icon: HugeiconsBellIcon,
    keywords: ['bell', 'notification', 'alert', 'ring', 'alarm'],
  },
  {
    name: 'chevron-down',
    icon: HugeiconsChevronDownIcon,
    keywords: ['chevron', 'down', 'direction', 'south', 'bottom', 'collapse'],
  },
  {
    name: 'chevron-left',
    icon: HugeiconsChevronLeftIcon,
    keywords: ['chevron', 'left', 'direction', 'west', 'back', 'previous'],
  },
  {
    name: 'chevron-right',
    icon: HugeiconsChevronRightIcon,
    keywords: ['chevron', 'right', 'direction', 'east', 'forward', 'next'],
  },
  {
    name: 'chevron-up',
    icon: HugeiconsChevronUpIcon,
    keywords: ['chevron', 'up', 'direction', 'north', 'top', 'expand'],
  },
  {
    name: 'calendar',
    icon: HugeiconsCalendarIcon,
    keywords: ['calendar', 'date', 'schedule', 'event', 'day'],
  },
  {
    name: 'check',
    icon: HugeiconsCheckIcon,
    keywords: ['check', 'done', 'success', 'complete', 'validate', 'tick'],
  },
  {
    name: 'download',
    icon: HugeiconsDownloadIcon,
    keywords: ['download', 'save', 'arrow', 'get', 'export'],
  },
  {
    name: 'eye',
    icon: HugeiconsEyeIcon,
    keywords: ['eye', 'view', 'see', 'visible', 'show', 'watch'],
  },
  {
    name: 'filter',
    icon: HugeiconsFilterIcon,
    keywords: ['filter', 'sort', 'funnel', 'refine', 'search'],
  },
  {
    name: 'heart',
    icon: HugeiconsHeartIcon,
    keywords: ['heart', 'love', 'like', 'favorite', 'health'],
  },
  {
    name: 'home',
    icon: HugeiconsHomeIcon,
    keywords: ['home', 'house', 'building', 'main', 'dashboard'],
  },
  {
    name: 'lock',
    icon: HugeiconsLockIcon,
    keywords: ['lock', 'security', 'password', 'secure', 'private'],
  },
  {
    name: 'mail',
    icon: HugeiconsMailIcon,
    keywords: ['mail', 'email', 'envelope', 'message', 'letter'],
  },
  {
    name: 'menu',
    icon: HugeiconsMenuIcon,
    keywords: ['menu', 'hamburger', 'list', 'navigation', 'lines'],
  },
  {
    name: 'pencil',
    icon: HugeiconsPencilIcon,
    keywords: ['pencil', 'edit', 'write', 'pen', 'modify'],
  },
  {
    name: 'plus',
    icon: HugeiconsPlusIcon,
    keywords: ['plus', 'add', 'new', 'create', 'increase'],
  },
  {
    name: 'refresh',
    icon: HugeiconsRefreshIcon,
    keywords: ['refresh', 'reload', 'reload', 'update', 'sync', 'rotate'],
  },
  {
    name: 'save',
    icon: HugeiconsSaveIcon,
    keywords: ['save', 'store', 'disk', 'floppy', 'preserve'],
  },
  {
    name: 'search',
    icon: HugeiconsSearchIcon,
    keywords: ['search', 'find', 'magnifying glass', 'lookup', 'query'],
  },
  {
    name: 'settings',
    icon: HugeiconsSettingsIcon,
    keywords: ['settings', 'gear', 'cog', 'preferences', 'config'],
  },
  {
    name: 'share',
    icon: HugeiconsShareIcon,
    keywords: ['share', 'send', 'social', 'network', 'distribute'],
  },
  {
    name: 'star',
    icon: HugeiconsStarIcon,
    keywords: ['star', 'favorite', 'bookmark', 'rate', 'rating'],
  },
  {
    name: 'trash',
    icon: HugeiconsTrashIcon,
    keywords: ['trash', 'delete', 'remove', 'bin', 'garbage'],
  },
  {
    name: 'upload',
    icon: HugeiconsUploadIcon,
    keywords: ['upload', 'send', 'arrow', 'put', 'import'],
  },
  {
    name: 'user',
    icon: HugeiconsUserIcon,
    keywords: ['user', 'person', 'profile', 'account', 'avatar'],
  },
  {
    name: 'x',
    icon: HugeiconsXIcon,
    keywords: ['close', 'x', 'cancel', 'dismiss', 'remove', 'delete'],
  },
];

export {
  HUGEICONS_ICON_LIST,
  HugeiconsArrowDownIcon,
  HugeiconsArrowLeftIcon,
  HugeiconsArrowRightIcon,
  HugeiconsArrowUpIcon,
  HugeiconsBellIcon,
  HugeiconsCalendarIcon,
  HugeiconsCheckIcon,
  HugeiconsChevronDownIcon,
  HugeiconsChevronLeftIcon,
  HugeiconsChevronRightIcon,
  HugeiconsChevronUpIcon,
  HugeiconsDownloadIcon,
  HugeiconsEyeIcon,
  HugeiconsFilterIcon,
  HugeiconsHeartIcon,
  HugeiconsHomeIcon,
  HugeiconsLockIcon,
  HugeiconsMailIcon,
  HugeiconsMenuIcon,
  HugeiconsPencilIcon,
  HugeiconsPlusIcon,
  HugeiconsRefreshIcon,
  HugeiconsSaveIcon,
  HugeiconsSearchIcon,
  HugeiconsSettingsIcon,
  HugeiconsShareIcon,
  HugeiconsStarIcon,
  HugeiconsTrashIcon,
  HugeiconsUploadIcon,
  HugeiconsUserIcon,
  HugeiconsXIcon,
};
