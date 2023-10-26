import React from 'react';
import { LogoProps } from './use-mantine-logo-colors';
export interface MantineLogoProps extends LogoProps {
    type?: 'mark' | 'full';
}
export declare function MantineLogo({ type, ...others }: MantineLogoProps): React.JSX.Element;
