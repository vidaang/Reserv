import React from 'react';
import { DemoAreaProps } from '../DemoArea';
import { DemoCodeProps } from '../DemoCode';
export interface CodeDemoProps extends DemoCodeProps, DemoAreaProps {
}
export declare function CodeDemo({ code, children, withPadding, centered, defaultExpanded, maxWidth, minHeight, dimmed, striped, }: CodeDemoProps): React.JSX.Element;
