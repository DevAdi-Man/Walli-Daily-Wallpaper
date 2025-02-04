import {Dimensions} from 'react-native';

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
