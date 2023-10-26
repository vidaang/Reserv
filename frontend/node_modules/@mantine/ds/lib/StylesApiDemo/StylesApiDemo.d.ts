import React from 'react';
import { DemoAreaProps } from '../DemoArea';
export interface StylesApiDemoProps extends DemoAreaProps {
    data: {
        selectors: Record<string, string>;
    };
    code: string;
}
export declare function StylesApiDemo({ data, code, withPadding, maxWidth, centered, children, dimmed, striped, }: StylesApiDemoProps): React.JSX.Element;
