import React from 'react';
interface CopyIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    copied: boolean;
}
export declare function CopyIcon({ copied, style, ...others }: CopyIconProps): React.JSX.Element;
export declare namespace CopyIcon {
    var displayName: string;
}
export {};
