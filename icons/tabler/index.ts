import { TablerAccessibleIcon } from './accessible';
import { TablerActivityIcon } from './activity';
import { TablerAirConditioningIcon } from './air-conditioning';
import { TablerAlarmIcon } from './alarm';
import { TablerAlarmMinusIcon } from './alarm-minus';
import { TablerAlarmPlusIcon } from './alarm-plus';
import { TablerAlarmSmokeIcon } from './alarm-smoke';
import { TablerAlignCenterIcon } from './align-center';
import { TablerAlignLeftIcon } from './align-left';
import { TablerAlignRightIcon } from './align-right';
import { TablerAmbulanceIcon } from './ambulance';
import { TablerArchiveIcon } from './archive';
import { TablerArrowBigDownIcon } from './arrow-big-down';
import { TablerArrowBigDownLineIcon } from './arrow-big-down-line';
import { TablerArrowBigLeftIcon } from './arrow-big-left';
import { TablerArrowBigLeftLineIcon } from './arrow-big-left-line';
import { TablerArrowBigRightIcon } from './arrow-big-right';
import { TablerArrowBigRightLineIcon } from './arrow-big-right-line';
import { TablerArrowBigUpIcon } from './arrow-big-up';
import { TablerArrowBigUpLineIcon } from './arrow-big-up-line';
import { TablerArrowDownIcon } from './arrow-down';
import { TablerArrowDownLeftIcon } from './arrow-down-left';
import { TablerArrowDownRightIcon } from './arrow-down-right';
import { TablerArrowLeftIcon } from './arrow-left';
import { TablerArrowRightIcon } from './arrow-right';
import { TablerArrowUpIcon } from './arrow-up';
import { TablerArrowUpLeftIcon } from './arrow-up-left';
import { TablerArrowUpRightIcon } from './arrow-up-right';
import { TablerAtIcon } from './at';
import { TablerAtomIcon } from './atom';
import { TablerAxeIcon } from './axe';
import { TablerBanIcon } from './ban';
import { TablerBananaIcon } from './banana';
import { TablerBatteryIcon } from './battery';
import { TablerBatteryChargingIcon } from './battery-charging';
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
import { TablerLayoutAlignCenterIcon } from './layout-align-center';
import { TablerLayoutAlignMiddleIcon } from './layout-align-middle';
import { TablerLockIcon } from './lock';
import { TablerMailIcon } from './mail';
import { TablerMenuIcon } from './menu';
import { TablerMoodAngryIcon } from './mood-angry';
import { TablerMoodAnnoyedIcon } from './mood-annoyed';
import { TablerPaperclipIcon } from './paperclip';
import { TablerPencilIcon } from './pencil';
import { TablerPlaneIcon } from './plane';
import { TablerPlusIcon } from './plus';
import { TablerRefreshIcon } from './refresh';
import { TablerRosetteDiscountIcon } from './rosette-discount';
import { TablerSaveIcon } from './save';
import { TablerSearchIcon } from './search';
import { TablerSettingsIcon } from './settings';
import { TablerShareIcon } from './share';
import { TablerSortAscendingLettersIcon } from './sort-ascending-letters';
import { TablerSortAscendingNumbersIcon } from './sort-ascending-numbers';
import { TablerSortDescendingLettersIcon } from './sort-descending-letters';
import { TablerSortDescendingNumbersIcon } from './sort-descending-numbers';
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
    name: 'alarm-minus',
    icon: TablerAlarmMinusIcon,
    keywords: ['alarm', 'minus', 'alarm-clock-minus', 'clock'],
  },
  {
    name: 'alarm-plus',
    icon: TablerAlarmPlusIcon,
    keywords: ['alarm', 'plus', 'alarm-clock-plus', 'clock'],
  },
  {
    name: 'alarm-smoke',
    icon: TablerAlarmSmokeIcon,
    keywords: ['alarm', 'smoke', 'alarm-smoke'],
  },
  {
    name: 'align-center',
    icon: TablerAlignCenterIcon,
    keywords: ['align', 'center', 'align-center'],
  },
  {
    name: 'align-left',
    icon: TablerAlignLeftIcon,
    keywords: ['align', 'left', 'align-left'],
  },
  {
    name: 'align-right',
    icon: TablerAlignRightIcon,
    keywords: ['align', 'right', 'align-right'],
  },
  { name: 'ambulance', icon: TablerAmbulanceIcon, keywords: ['ambulance'] },
  { name: 'archive', icon: TablerArchiveIcon, keywords: ['archive'] },
  {
    name: 'arrow-big-down',
    icon: TablerArrowBigDownIcon,
    keywords: ['arrow', 'big', 'down', 'arrow-big-down'],
  },
  {
    name: 'arrow-big-down-line',
    icon: TablerArrowBigDownLineIcon,
    keywords: ['arrow', 'big', 'down', 'line', 'arrow-big-down-dash', 'dash'],
  },
  {
    name: 'arrow-big-left',
    icon: TablerArrowBigLeftIcon,
    keywords: ['arrow', 'big', 'left', 'arrow-big-left'],
  },
  {
    name: 'arrow-big-left-line',
    icon: TablerArrowBigLeftLineIcon,
    keywords: ['arrow', 'big', 'left', 'line', 'arrow-big-left-dash', 'dash'],
  },
  {
    name: 'arrow-big-right',
    icon: TablerArrowBigRightIcon,
    keywords: ['arrow', 'big', 'right', 'arrow-big-right'],
  },
  {
    name: 'arrow-big-right-line',
    icon: TablerArrowBigRightLineIcon,
    keywords: ['arrow', 'big', 'right', 'line', 'arrow-big-right-dash', 'dash'],
  },
  {
    name: 'arrow-big-up',
    icon: TablerArrowBigUpIcon,
    keywords: ['arrow', 'big', 'up', 'arrow-big-up'],
  },
  {
    name: 'arrow-big-up-line',
    icon: TablerArrowBigUpLineIcon,
    keywords: ['arrow', 'big', 'up', 'line', 'arrow-big-up-dash', 'dash'],
  },
  {
    name: 'arrow-down',
    icon: TablerArrowDownIcon,
    keywords: ['arrow', 'down', 'direction', 'south', 'bottom', 'arrow-down'],
  },
  {
    name: 'arrow-down-left',
    icon: TablerArrowDownLeftIcon,
    keywords: ['arrow', 'down', 'left', 'arrow-down-left'],
  },
  {
    name: 'arrow-down-right',
    icon: TablerArrowDownRightIcon,
    keywords: ['arrow', 'down', 'right', 'arrow-down-right'],
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
    name: 'arrow-up-left',
    icon: TablerArrowUpLeftIcon,
    keywords: ['arrow', 'up', 'left', 'arrow-up-left'],
  },
  {
    name: 'arrow-up-right',
    icon: TablerArrowUpRightIcon,
    keywords: ['arrow', 'up', 'right', 'arrow-up-right'],
  },
  { name: 'at', icon: TablerAtIcon, keywords: ['at', 'at-sign', 'sign'] },
  { name: 'atom', icon: TablerAtomIcon, keywords: ['atom'] },
  { name: 'axe', icon: TablerAxeIcon, keywords: ['axe'] },
  { name: 'ban', icon: TablerBanIcon, keywords: ['ban'] },
  { name: 'banana', icon: TablerBananaIcon, keywords: ['banana'] },
  { name: 'battery', icon: TablerBatteryIcon, keywords: ['battery'] },
  {
    name: 'battery-charging',
    icon: TablerBatteryChargingIcon,
    keywords: ['battery', 'charging', 'battery-charging'],
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
    name: 'layout-align-center',
    icon: TablerLayoutAlignCenterIcon,
    keywords: ['layout', 'align', 'center', 'align-horizontal', 'horizontal'],
  },
  {
    name: 'layout-align-middle',
    icon: TablerLayoutAlignMiddleIcon,
    keywords: ['layout', 'align', 'middle', 'align-vertical', 'vertical'],
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
    name: 'mood-angry',
    icon: TablerMoodAngryIcon,
    keywords: ['mood', 'angry'],
  },
  {
    name: 'mood-annoyed',
    icon: TablerMoodAnnoyedIcon,
    keywords: ['mood', 'annoyed'],
  },
  {
    name: 'paperclip',
    icon: TablerPaperclipIcon,
    keywords: ['paperclip', 'attach-file', 'attach', 'file'],
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
    name: 'rosette-discount',
    icon: TablerRosetteDiscountIcon,
    keywords: ['rosette', 'discount', 'badge-percent', 'badge', 'percent'],
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
    name: 'sort-ascending-letters',
    icon: TablerSortAscendingLettersIcon,
    keywords: [
      'sort',
      'ascending',
      'letters',
      'arrow-down-a-z',
      'arrow',
      'down',
      'a',
      'z',
    ],
  },
  {
    name: 'sort-ascending-numbers',
    icon: TablerSortAscendingNumbersIcon,
    keywords: [
      'sort',
      'ascending',
      'numbers',
      'arrow-down-0-1',
      'arrow',
      'down',
      '0',
      '1',
    ],
  },
  {
    name: 'sort-descending-letters',
    icon: TablerSortDescendingLettersIcon,
    keywords: [
      'sort',
      'descending',
      'letters',
      'arrow-down-z-a',
      'arrow',
      'down',
      'z',
      'a',
    ],
  },
  {
    name: 'sort-descending-numbers',
    icon: TablerSortDescendingNumbersIcon,
    keywords: [
      'sort',
      'descending',
      'numbers',
      'arrow-down-1-0',
      'arrow',
      'down',
      '1',
      '0',
    ],
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
  TablerAlarmMinusIcon,
  TablerAlarmPlusIcon,
  TablerAlarmSmokeIcon,
  TablerAlignCenterIcon,
  TablerAlignLeftIcon,
  TablerAlignRightIcon,
  TablerAmbulanceIcon,
  TablerArchiveIcon,
  TablerArrowBigDownIcon,
  TablerArrowBigDownLineIcon,
  TablerArrowBigLeftIcon,
  TablerArrowBigLeftLineIcon,
  TablerArrowBigRightIcon,
  TablerArrowBigRightLineIcon,
  TablerArrowBigUpIcon,
  TablerArrowBigUpLineIcon,
  TablerArrowDownIcon,
  TablerArrowDownLeftIcon,
  TablerArrowDownRightIcon,
  TablerArrowLeftIcon,
  TablerArrowRightIcon,
  TablerArrowUpIcon,
  TablerArrowUpLeftIcon,
  TablerArrowUpRightIcon,
  TablerAtIcon,
  TablerAtomIcon,
  TablerAxeIcon,
  TablerBanIcon,
  TablerBananaIcon,
  TablerBatteryIcon,
  TablerBatteryChargingIcon,
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
  TablerLayoutAlignCenterIcon,
  TablerLayoutAlignMiddleIcon,
  TablerLockIcon,
  TablerMailIcon,
  TablerMenuIcon,
  TablerMoodAngryIcon,
  TablerMoodAnnoyedIcon,
  TablerPaperclipIcon,
  TablerPencilIcon,
  TablerPlaneIcon,
  TablerPlusIcon,
  TablerRefreshIcon,
  TablerRosetteDiscountIcon,
  TablerSaveIcon,
  TablerSearchIcon,
  TablerSettingsIcon,
  TablerShareIcon,
  TablerSortAscendingLettersIcon,
  TablerSortAscendingNumbersIcon,
  TablerSortDescendingLettersIcon,
  TablerSortDescendingNumbersIcon,
  TablerStarIcon,
  TablerTrashIcon,
  TablerUploadIcon,
  TablerUserIcon,
  TablerXIcon,
};
