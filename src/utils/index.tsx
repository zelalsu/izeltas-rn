import {
  PixelRatio,
  Platform,
  NativeModules,
  PermissionsAndroid,
  Alert,
  Permission,
} from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import RNShare from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

// Constant

// Type
import {
  GetDateParams,
  HapticFeedbackParams,
  AlertParams,
  FileShareParams,
} from './types';
import {options} from '@src/constants';
import {window} from '@src/constants/dimensions';

// Vibration
export const hapticFeedback = ({ios, android}: HapticFeedbackParams): void => {
  return Platform.OS === 'android'
    ? ReactNativeHapticFeedback.trigger(
        android ? android : 'effectClick',
        options,
      )
    : ReactNativeHapticFeedback.trigger(ios ? ios : 'impactHeavy', options);
};

// Date is returned according to the variable you entered.
export const getDate = ({
  year,
  month,
  day,
  hours,
  minutes,
  seconds,
  ms,
}: GetDateParams): Date => {
  return new Date(
    Date.UTC(
      year,
      month - 1,
      day ? day : 1,
      hours ? hours : 0,
      minutes ? minutes : 0,
      seconds ? seconds : 0,
      ms ? ms : 0,
    ),
  );
};

const pixelDensity: number = PixelRatio.get();

// Recalculates the entered number according to the screen Inches
export const toScale = (number: number): number => {
  const ratio = (metricsNumber() + pixelDensity) / 10;
  const value = number * Number(ratio.toFixed(1));
  return Number(value.toFixed(1));
};
const metricsNumber = (): number => {
  const density = pixelDensity * 160;
  const x = Math.pow((window.width * pixelDensity) / density, 2);
  const y = Math.pow((window.height * pixelDensity) / density, 2);
  const screenInches = Math.sqrt(x + y) + 1.6;
  return screenInches;
};

// It helps to find the native language of the phone..
export function getSystemLocale(): string {
  let locale: string = '';
  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    return 'tr-TR';
  }

  return locale;
}

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(() => resolve({}), timeout));
};

// Removes spaces in string
export const stringSpaceRemove = (value: string) => {
  let v = value;
  return v.replace(/\s/g, '');
};

export const capitalizeFirstLetter = (word: string) => {
  const [firstLetter, ...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

// ANDROID PERMISSION
export const requestAndroidPermission = async (
  permission: Permission,
): Promise<boolean | undefined> => {
  try {
    const granted = await PermissionsAndroid.request(permission);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error('something went wrong');
  }
};

// SLUGIFY
export const slugify = (text: string) => {
  let trMap: {[key: string]: string} = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  };

  for (let key in trMap) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
  }
  return text
    .trim()
    .replace(/[^-a-zA-Z0-9\s]+/gi, '')
    .replace(/\s/gi, '-')
    .replace(/[-]+/gi, '-')
    .toLowerCase();
};

// ALERT
export const alert = ({
  title,
  desc,
  okText,
  cancelText,
  okPress,
  cancelPress,
  cancelButton,
}: AlertParams) => {
  hapticFeedback({
    ios: HapticFeedbackTypes.soft,
    android: HapticFeedbackTypes.soft,
  });
  Alert.alert(
    title ? title : '',
    desc ? desc : '',
    cancelButton
      ? [
          {
            text: cancelText ? cancelText : 'Cancel',
            onPress: cancelPress,
            style: 'cancel',
          },
          {
            text: okText ? okText : 'OK',
            onPress: okPress,
          },
        ]
      : [
          {
            text: okText ? okText : 'OK',
            onPress: okPress,
          },
        ],
  );
};

export const fileShare = async ({
  url,
  name,
  mime,
  type,
}: FileShareParams): Promise<{error: boolean}> => {
  const contentExtension: string | undefined = mime.split('/')[1];
  let fileName = `${name ?? new Date().getTime()}.${contentExtension}`;
  let destinationPath = `${
    Platform.OS === 'android'
      ? RNFetchBlob.fs.dirs.DownloadDir
      : RNFetchBlob.fs.dirs.DocumentDir
  }/${fileName}`;

  if (!contentExtension) {
    return {error: true};
  }

  const configOptionsDownloadAndroid = {
    overwrite: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: destinationPath,
      mime,
      description: 'File downloaded by download manager.',
    },
  };

  const configOptionsShareAndroid = {
    overwrite: true,
    fileCache: true,
  };

  const configOptionsIOS = {
    overwrite: true,
    fileCache: true,
    appendExt: contentExtension,
    path: destinationPath,
  };

  await RNFetchBlob.config(
    Platform.OS === 'android'
      ? type === 'download'
        ? configOptionsDownloadAndroid
        : type === 'both'
        ? configOptionsDownloadAndroid
        : configOptionsShareAndroid
      : configOptionsIOS,
  )
    .fetch('GET', url)
    .then(async resp => {
      const base64Data = await resp.readFile('base64')?.catch(() => {
        throw new Error('base64 is corrupt');
      });
      type === 'share' && resp.flush();

      Platform.OS === 'ios' &&
        (await RNFetchBlob.fs.writeFile(destinationPath, base64Data, 'base64'));

      Platform.OS === 'ios' &&
        type === 'download' &&
        RNFetchBlob.ios.openDocument(destinationPath);

      const base64 = `data:${mime};base64,` + base64Data;
      (type === 'both' || type === 'share') &&
        (await RNShare.open(
          Platform.OS === 'android'
            ? {
                url: base64,
                filename: `${name ?? new Date().getDate()}`,
                failOnCancel: false,
              }
            : {
                type: mime,
                url: destinationPath,
                failOnCancel: false,
              },
        ));

      type === 'share' &&
        Platform.OS === 'ios' &&
        (await RNFetchBlob.fs.unlink(destinationPath));
    });
  return {error: false};
};

export const saveFilesPermissions = async () => {
  const WRITE_EXTERNAL_STORAGE =
    Platform.OS === 'android'
      ? await requestAndroidPermission(
          'android.permission.WRITE_EXTERNAL_STORAGE',
        )
      : true;

  const READ_EXTERNAL_STORAGE =
    Platform.OS === 'android'
      ? await requestAndroidPermission(
          'android.permission.READ_EXTERNAL_STORAGE',
        )
      : true;

  return {WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE};
};

// SAVE PHOTO
export const savePhoto = async ({path}: {path?: string}) => {
  const fileName = new Date().getTime().toString();
  let destinationPath = `${
    Platform.OS === 'android'
      ? RNFetchBlob.fs.dirs.DownloadDir
      : RNFetchBlob.fs.dirs.DocumentDir
  }/${fileName}.jpg`;

  const {WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE} =
    await saveFilesPermissions();

  if (WRITE_EXTERNAL_STORAGE && READ_EXTERNAL_STORAGE) {
    await RNFetchBlob.fs.cp(path?.split('file://')[1] ?? '', destinationPath);
    return destinationPath;
  }
  return '';
};
