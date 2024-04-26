import dayjs from 'dayjs';

// Names of the week
export const dayNamesShort = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
export const dayNames = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];
export const monthNames = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];
export const calendarLocale = {
  monthNames,
  dayNames,
  dayNamesShort,
  today: 'Bugün',
};

// Vibration settings
export const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

// Date
export const today = dayjs().format('YYYY-MM-DD');

// Numbers
export const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  twentyOne: 21,
  twentyTwo: 22,
  twentyThree: 23,
  twentyFour: 24,
  twentyFive: 25,
  twentySix: 26,
  twentySeven: 27,
  twentyEight: 28,
};

// Font Family
export const fontFamily = {
  raleway: {
    medium: 'Raleway-Medium',
    regular: 'Raleway-Regular',
    semiBold: 'Raleway-SemiBold',
  },
};

// Rules
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,9})+$/;
export const phoneNumberMask = [
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const transparent = 'transparent';
