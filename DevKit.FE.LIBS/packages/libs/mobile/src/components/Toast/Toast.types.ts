import { type ToastOptions as Options } from 'react-native-toast-message';

export type ToastOptions = Omit<Options, 'text1Style' | 'text2Style' | 'type' | 'keyboardOffset'>;
