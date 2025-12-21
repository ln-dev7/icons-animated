import { PhosphorArrowDownIcon } from './arrow-down';
import { PhosphorArrowLeftIcon } from './arrow-left';
import { PhosphorArrowRightIcon } from './arrow-right';
import { PhosphorArrowUpIcon } from './arrow-up';
import { PhosphorBellIcon } from './bell';
import { PhosphorCalendarIcon } from './calendar';
import { PhosphorCheckIcon } from './check';
import { PhosphorChevronDownIcon } from './chevron-down';
import { PhosphorChevronLeftIcon } from './chevron-left';
import { PhosphorChevronRightIcon } from './chevron-right';
import { PhosphorChevronUpIcon } from './chevron-up';
import { PhosphorDownloadIcon } from './download';
import { PhosphorEnvelopeIcon } from './envelope';
import { PhosphorEyeIcon } from './eye';
import { PhosphorFilterIcon } from './filter';
import { PhosphorGearIcon } from './gear';
import { PhosphorHeartIcon } from './heart';
import { PhosphorHouseIcon } from './house';
import { PhosphorListIcon } from './list';
import { PhosphorLockIcon } from './lock';
import { PhosphorPencilIcon } from './pencil';
import { PhosphorPlusIcon } from './plus';
import { PhosphorRefreshIcon } from './refresh';
import { PhosphorSaveIcon } from './save';
import { PhosphorSearchIcon } from './search';
import { PhosphorShareIcon } from './share';
import { PhosphorStarIcon } from './star';
import { PhosphorTrashIcon } from './trash';
import { PhosphorUploadIcon } from './upload';
import { PhosphorUserIcon } from './user';
import { PhosphorXIcon } from './x';

const PHOSPHOR_ICON_LIST = [
  {
    name: 'arrow-down',
    icon: PhosphorArrowDownIcon,
    keywords: ['arrow', 'down', 'direction', 'south', 'bottom'],
  },
  {
    name: 'arrow-left',
    icon: PhosphorArrowLeftIcon,
    keywords: ['arrow', 'left', 'direction', 'west', 'back'],
  },
  {
    name: 'arrow-right',
    icon: PhosphorArrowRightIcon,
    keywords: ['arrow', 'right', 'direction', 'east', 'forward', 'next'],
  },
  {
    name: 'arrow-up',
    icon: PhosphorArrowUpIcon,
    keywords: ['arrow', 'up', 'direction', 'north', 'top'],
  },
  {
    name: 'bell',
    icon: PhosphorBellIcon,
    keywords: ['bell', 'notification', 'alert', 'ring', 'alarm'],
  },
  {
    name: 'chevron-down',
    icon: PhosphorChevronDownIcon,
    keywords: ['chevron', 'down', 'direction', 'south', 'bottom', 'collapse'],
  },
  {
    name: 'chevron-left',
    icon: PhosphorChevronLeftIcon,
    keywords: ['chevron', 'left', 'direction', 'west', 'back', 'previous'],
  },
  {
    name: 'chevron-right',
    icon: PhosphorChevronRightIcon,
    keywords: ['chevron', 'right', 'direction', 'east', 'forward', 'next'],
  },
  {
    name: 'chevron-up',
    icon: PhosphorChevronUpIcon,
    keywords: ['chevron', 'up', 'direction', 'north', 'top', 'expand'],
  },
  {
    name: 'calendar',
    icon: PhosphorCalendarIcon,
    keywords: ['calendar', 'date', 'schedule', 'event', 'day'],
  },
  {
    name: 'check',
    icon: PhosphorCheckIcon,
    keywords: ['check', 'done', 'success', 'complete', 'validate', 'tick'],
  },
  {
    name: 'download',
    icon: PhosphorDownloadIcon,
    keywords: ['download', 'save', 'arrow', 'get', 'export'],
  },
  {
    name: 'envelope',
    icon: PhosphorEnvelopeIcon,
    keywords: ['envelope', 'mail', 'email', 'message', 'letter'],
  },
  {
    name: 'filter',
    icon: PhosphorFilterIcon,
    keywords: ['filter', 'sort', 'funnel', 'refine', 'search'],
  },
  {
    name: 'eye',
    icon: PhosphorEyeIcon,
    keywords: ['eye', 'view', 'see', 'visible', 'show', 'watch'],
  },
  {
    name: 'gear',
    icon: PhosphorGearIcon,
    keywords: ['settings', 'gear', 'cog', 'preferences', 'config'],
  },
  {
    name: 'heart',
    icon: PhosphorHeartIcon,
    keywords: ['heart', 'love', 'like', 'favorite', 'health'],
  },
  {
    name: 'house',
    icon: PhosphorHouseIcon,
    keywords: ['home', 'house', 'building', 'main', 'dashboard'],
  },
  {
    name: 'list',
    icon: PhosphorListIcon,
    keywords: ['menu', 'hamburger', 'list', 'navigation', 'lines'],
  },
  {
    name: 'lock',
    icon: PhosphorLockIcon,
    keywords: ['lock', 'security', 'password', 'secure', 'private'],
  },
  {
    name: 'pencil',
    icon: PhosphorPencilIcon,
    keywords: ['pencil', 'edit', 'write', 'pen', 'modify'],
  },
  {
    name: 'plus',
    icon: PhosphorPlusIcon,
    keywords: ['plus', 'add', 'new', 'create', 'increase'],
  },
  {
    name: 'refresh',
    icon: PhosphorRefreshIcon,
    keywords: ['refresh', 'reload', 'reload', 'update', 'sync', 'rotate'],
  },
  {
    name: 'save',
    icon: PhosphorSaveIcon,
    keywords: ['save', 'store', 'disk', 'floppy', 'preserve'],
  },
  {
    name: 'search',
    icon: PhosphorSearchIcon,
    keywords: ['search', 'find', 'magnifying glass', 'lookup', 'query'],
  },
  {
    name: 'share',
    icon: PhosphorShareIcon,
    keywords: ['share', 'send', 'social', 'network', 'distribute'],
  },
  {
    name: 'star',
    icon: PhosphorStarIcon,
    keywords: ['star', 'favorite', 'bookmark', 'rate', 'rating'],
  },
  {
    name: 'trash',
    icon: PhosphorTrashIcon,
    keywords: ['trash', 'delete', 'remove', 'bin', 'garbage'],
  },
  {
    name: 'upload',
    icon: PhosphorUploadIcon,
    keywords: ['upload', 'send', 'arrow', 'put', 'import'],
  },
  {
    name: 'user',
    icon: PhosphorUserIcon,
    keywords: ['user', 'person', 'profile', 'account', 'avatar'],
  },
  {
    name: 'x',
    icon: PhosphorXIcon,
    keywords: ['close', 'x', 'cancel', 'dismiss', 'remove', 'delete'],
  },
];

export {
  PHOSPHOR_ICON_LIST,
  PhosphorArrowDownIcon,
  PhosphorArrowLeftIcon,
  PhosphorArrowRightIcon,
  PhosphorArrowUpIcon,
  PhosphorBellIcon,
  PhosphorCalendarIcon,
  PhosphorCheckIcon,
  PhosphorChevronDownIcon,
  PhosphorChevronLeftIcon,
  PhosphorChevronRightIcon,
  PhosphorChevronUpIcon,
  PhosphorDownloadIcon,
  PhosphorEnvelopeIcon,
  PhosphorEyeIcon,
  PhosphorFilterIcon,
  PhosphorGearIcon,
  PhosphorHeartIcon,
  PhosphorHouseIcon,
  PhosphorListIcon,
  PhosphorLockIcon,
  PhosphorPencilIcon,
  PhosphorPlusIcon,
  PhosphorRefreshIcon,
  PhosphorSaveIcon,
  PhosphorSearchIcon,
  PhosphorShareIcon,
  PhosphorStarIcon,
  PhosphorTrashIcon,
  PhosphorUploadIcon,
  PhosphorUserIcon,
  PhosphorXIcon,
};
