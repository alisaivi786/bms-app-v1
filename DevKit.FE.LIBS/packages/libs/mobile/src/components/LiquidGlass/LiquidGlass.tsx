import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useMobileUIConfigOptions } from '../../layouts';

export interface LiquidGlassProps {
	bgColor?: string;
}

export const LiquidGlass = ({
  bgColor,
  children,
}: PropsWithChildren<LiquidGlassProps>) => {
  const {tw} = useMobileUIConfigOptions();

  return (
    <View style={tw`rounded-full overflow-hidden`}>
      <BlurView
        blurAmount={2}
        blurType="light"
        style={tw`absolute inset-0`}
        reducedTransparencyFallbackColor="white"
      />
      <View
        style={tw.style('absolute inset-0 rounded-full', {
          backgroundColor: bgColor,
          transform: [{rotate: '-0.5deg'}, {scaleX: 0.99}],
        })}
      />
      {children}
    </View>
  );
};