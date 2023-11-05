import React from 'react';
import { BoxProps, ElementProps } from '@mantine/core';
export interface SocialButtonProps extends BoxProps, ElementProps<'a', 'type'> {
    icon?: React.ReactNode;
}
export declare function SocialButton({ icon, ...others }: SocialButtonProps): React.JSX.Element;
export declare function DiscordButton({ className, ...others }: SocialButtonProps): React.JSX.Element;
export declare function TwitterButton({ className, ...others }: SocialButtonProps): React.JSX.Element;
