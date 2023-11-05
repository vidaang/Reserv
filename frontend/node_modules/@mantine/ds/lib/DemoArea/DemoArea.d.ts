import React from 'react';
export interface DemoAreaProps {
    children?: React.ReactNode;
    withPadding?: boolean;
    centered?: boolean;
    maxWidth?: number | string;
    minHeight?: number | string;
    dimmed?: boolean;
    striped?: boolean;
}
export declare function DemoArea({ withPadding, centered, maxWidth, minHeight, children, dimmed, striped, }: DemoAreaProps): React.JSX.Element;
