/// <reference types="react" />
import { MantineColor } from '@mantine/core';
export type MantineLogoVariant = 'mantine.dev' | 'ui.mantine.dev';
export interface LogoProps extends React.ComponentPropsWithoutRef<'svg'> {
    color?: MantineColor;
    variant?: MantineLogoVariant;
    size?: number | string;
    inverted?: boolean;
}
export declare function useMantineLogoColors({ color, inverted }: LogoProps): {
    background: string | undefined;
    color: string | undefined;
};
