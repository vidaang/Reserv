import React from 'react';
interface ExpandIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    expanded: boolean;
}
export declare function ExpandIcon({ expanded, style, ...others }: ExpandIconProps): React.JSX.Element;
export {};
