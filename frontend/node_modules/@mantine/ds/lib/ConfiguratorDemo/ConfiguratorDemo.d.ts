import React from 'react';
import { DemoAreaProps } from '../DemoArea';
import { ConfiguratorBooleanControlOptions, ConfiguratorSegmentedControlOptions, ConfiguratorColorControlOptions, ConfiguratorStringControlOptions, ConfiguratorSelectControlOptions, ConfiguratorSizeControlOptions, ConfiguratorNumberControlOptions } from './controls';
export type ConfiguratorControlOptions = ConfiguratorBooleanControlOptions | ConfiguratorSegmentedControlOptions | ConfiguratorColorControlOptions | ConfiguratorStringControlOptions | ConfiguratorSelectControlOptions | ConfiguratorSizeControlOptions | ConfiguratorNumberControlOptions;
export interface ConfiguratorDemoProps extends DemoAreaProps {
    code: string | ((props: Record<string, any>) => string);
    controls: ConfiguratorControlOptions[];
}
export declare function ConfiguratorDemo({ code, controls, children, centered, maxWidth, minHeight, withPadding, dimmed, striped, }: ConfiguratorDemoProps): React.JSX.Element;
