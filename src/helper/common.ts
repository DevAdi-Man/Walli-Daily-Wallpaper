import {Dimensions} from 'react-native';
// import {PermissionsAndroid} from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

interface PercentageFunction {
  (percentage: number): number;
}

export const wp: PercentageFunction = percentage => {
  const wight = deviceWidth;
  return (percentage * wight) / 100;
};
export const hp: PercentageFunction = percentage => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    //desktop
    return 4;
  } else if (deviceWidth >= 768) {
    //tablets
    return 3;
  } else {
    //phone
    return 2;
  }
};
export const getImageSize = (height:number ,width:number) => {
  if (width > height) {
    //landscape
    return 250;
  } else if (width < height) {
    //portrait
    return 300;
  } else {
    //square
    return 200;
  }
};



export const captalize = (str: any) => {
  return str.replace(/\b\w/g, (l:any) => l.toUpperCase());
};
