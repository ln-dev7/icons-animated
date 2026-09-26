import { PhosphorAirplaneIcon } from './airplane';
import { PhosphorAirplayIcon } from './airplay';
import { PhosphorAlarmIcon } from './alarm';
import { PhosphorAlignCenterHorizontalIcon } from './align-center-horizontal';
import { PhosphorAlignCenterVerticalIcon } from './align-center-vertical';
import { PhosphorAmbulanceIcon } from './ambulance';
import { PhosphorArchiveIcon } from './archive';
import { PhosphorArrowDownIcon } from './arrow-down';
import { PhosphorArrowFatDownIcon } from './arrow-fat-down';
import { PhosphorArrowFatLeftIcon } from './arrow-fat-left';
import { PhosphorArrowFatLineDownIcon } from './arrow-fat-line-down';
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
import { PhosphorPersonArmsSpreadIcon } from './person-arms-spread';
import { PhosphorPlusIcon } from './plus';
import { PhosphorPulseIcon } from './pulse';
import { PhosphorRefreshIcon } from './refresh';
import { PhosphorSaveIcon } from './save';
import { PhosphorSearchIcon } from './search';
import { PhosphorShareIcon } from './share';
import { PhosphorSmileyAngryIcon } from './smiley-angry';
import { PhosphorSmileyMehIcon } from './smiley-meh';
import { PhosphorStarIcon } from './star';
import { PhosphorTextAlignCenterIcon } from './text-align-center';
import { PhosphorTextAlignLeftIcon } from './text-align-left';
import { PhosphorTextAlignRightIcon } from './text-align-right';
import { PhosphorTrashIcon } from './trash';
import { PhosphorUploadIcon } from './upload';
import { PhosphorUserIcon } from './user';
import { PhosphorXIcon } from './x';

const PHOSPHOR_ICON_LIST = [
  { name: 'airplane', icon: PhosphorAirplaneIcon, keywords: ['airplane'] },
  { name: 'airplay', icon: PhosphorAirplayIcon, keywords: ['airplay'] },
  {
    name: 'alarm',
    icon: PhosphorAlarmIcon,
    keywords: ['alarm', 'alarm-clock', 'clock'],
  },
  {
    name: 'align-center-horizontal',
    icon: PhosphorAlignCenterHorizontalIcon,
    keywords: ['align', 'center', 'horizontal', 'align-horizontal'],
  },
  {
    name: 'align-center-vertical',
    icon: PhosphorAlignCenterVerticalIcon,
    keywords: ['align', 'center', 'vertical', 'align-vertical'],
  },
  { name: 'ambulance', icon: PhosphorAmbulanceIcon, keywords: ['ambulance'] },
  { name: 'archive', icon: PhosphorArchiveIcon, keywords: ['archive'] },
  {
    name: 'arrow-down',
    icon: PhosphorArrowDownIcon,
    keywords: ['arrow', 'down', 'direction', 'south', 'bottom', 'arrow-down'],
  },
  {
    name: 'arrow-fat-down',
    icon: PhosphorArrowFatDownIcon,
    keywords: ['arrow', 'fat', 'down', 'arrow-big-down', 'big'],
  },
  {
    name: 'arrow-fat-left',
    icon: PhosphorArrowFatLeftIcon,
    keywords: ['arrow', 'fat', 'left', 'arrow-big-left', 'big'],
  },
  {
    name: 'arrow-fat-line-down',
    icon: PhosphorArrowFatLineDownIcon,
    keywords: [
      'arrow',
      'fat',
      'line',
      'down',
      'arrow-big-down-dash',
      'big',
      'dash',
    ],
  },
  {
    name: 'arrow-left',
    icon: PhosphorArrowLeftIcon,
    keywords: ['arrow', 'left', 'direction', 'west', 'back', 'arrow-left'],
  },
  {
    name: 'arrow-right',
    icon: PhosphorArrowRightIcon,
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
    icon: PhosphorArrowUpIcon,
    keywords: ['arrow', 'up', 'direction', 'north', 'top', 'arrow-up'],
  },
  {
    name: 'bell',
    icon: PhosphorBellIcon,
    keywords: ['bell', 'notification', 'alert', 'ring', 'alarm'],
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
    name: 'chevron-down',
    icon: PhosphorChevronDownIcon,
    keywords: [
      'chevron',
      'down',
      'direction',
      'south',
      'bottom',
      'collapse',
      'caret-down',
      'chevron-down',
    ],
  },
  {
    name: 'chevron-left',
    icon: PhosphorChevronLeftIcon,
    keywords: [
      'chevron',
      'left',
      'direction',
      'west',
      'back',
      'previous',
      'caret-left',
      'chevron-left',
    ],
  },
  {
    name: 'chevron-right',
    icon: PhosphorChevronRightIcon,
    keywords: [
      'chevron',
      'right',
      'direction',
      'east',
      'forward',
      'next',
      'caret-right',
      'chevron-right',
    ],
  },
  {
    name: 'chevron-up',
    icon: PhosphorChevronUpIcon,
    keywords: [
      'chevron',
      'up',
      'direction',
      'north',
      'top',
      'expand',
      'caret-up',
      'chevron-up',
    ],
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
    name: 'eye',
    icon: PhosphorEyeIcon,
    keywords: ['eye', 'view', 'see', 'visible', 'show', 'watch'],
  },
  {
    name: 'filter',
    icon: PhosphorFilterIcon,
    keywords: ['filter', 'sort', 'funnel', 'refine', 'search'],
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
    name: 'person-arms-spread',
    icon: PhosphorPersonArmsSpreadIcon,
    keywords: ['person', 'arms', 'spread', 'accessibility'],
  },
  {
    name: 'plus',
    icon: PhosphorPlusIcon,
    keywords: ['plus', 'add', 'new', 'create', 'increase'],
  },
  { name: 'pulse', icon: PhosphorPulseIcon, keywords: ['pulse', 'activity'] },
  {
    name: 'refresh',
    icon: PhosphorRefreshIcon,
    keywords: [
      'refresh',
      'reload',
      'update',
      'sync',
      'rotate',
      'arrow-clockwise',
      'rotate-cw',
      'cw',
    ],
  },
  {
    name: 'save',
    icon: PhosphorSaveIcon,
    keywords: ['save', 'store', 'disk', 'floppy', 'preserve'],
  },
  {
    name: 'search',
    icon: PhosphorSearchIcon,
    keywords: [
      'search',
      'find',
      'magnifying glass',
      'lookup',
      'query',
      'magnifying-glass',
    ],
  },
  {
    name: 'share',
    icon: PhosphorShareIcon,
    keywords: ['share', 'send', 'social', 'network', 'distribute'],
  },
  {
    name: 'smiley-angry',
    icon: PhosphorSmileyAngryIcon,
    keywords: ['smiley', 'angry'],
  },
  {
    name: 'smiley-meh',
    icon: PhosphorSmileyMehIcon,
    keywords: ['smiley', 'meh', 'annoyed'],
  },
  {
    name: 'star',
    icon: PhosphorStarIcon,
    keywords: ['star', 'favorite', 'bookmark', 'rate', 'rating'],
  },
  {
    name: 'text-align-center',
    icon: PhosphorTextAlignCenterIcon,
    keywords: ['text', 'align', 'center', 'align-center'],
  },
  {
    name: 'text-align-left',
    icon: PhosphorTextAlignLeftIcon,
    keywords: ['text', 'align', 'left', 'align-left'],
  },
  {
    name: 'text-align-right',
    icon: PhosphorTextAlignRightIcon,
    keywords: ['text', 'align', 'right', 'align-right'],
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
  PhosphorAirplaneIcon,
  PhosphorAirplayIcon,
  PhosphorAlarmIcon,
  PhosphorAlignCenterHorizontalIcon,
  PhosphorAlignCenterVerticalIcon,
  PhosphorAmbulanceIcon,
  PhosphorArchiveIcon,
  PhosphorArrowDownIcon,
  PhosphorArrowFatDownIcon,
  PhosphorArrowFatLeftIcon,
  PhosphorArrowFatLineDownIcon,
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
  PhosphorPersonArmsSpreadIcon,
  PhosphorPlusIcon,
  PhosphorPulseIcon,
  PhosphorRefreshIcon,
  PhosphorSaveIcon,
  PhosphorSearchIcon,
  PhosphorShareIcon,
  PhosphorSmileyAngryIcon,
  PhosphorSmileyMehIcon,
  PhosphorStarIcon,
  PhosphorTextAlignCenterIcon,
  PhosphorTextAlignLeftIcon,
  PhosphorTextAlignRightIcon,
  PhosphorTrashIcon,
  PhosphorUploadIcon,
  PhosphorUserIcon,
  PhosphorXIcon,
};
