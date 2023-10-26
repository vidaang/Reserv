import React from 'react';
import { MantineColor, PortalProps, ElementProps } from '@mantine/core';
import { NprogressStore } from './nprogress.store';
export interface NavigationProgressProps extends ElementProps<'div'> {
    /** Component store, controls state */
    store?: NprogressStore;
    /** Initial progress value, `0` by default */
    initialProgress?: number;
    /** Key of `theme.colors` of any other valid CSS color, `theme.primaryColor` by default */
    color?: MantineColor;
    /** Controls height of the progress bar */
    size?: number;
    /** Step interval in ms, `500` by default */
    stepInterval?: number;
    /** Determines whether the progress bar should be rendered within `Portal`, `true` by default */
    withinPortal?: boolean;
    /** Props to pass down to the `Portal` when `withinPortal` is `true` */
    portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;
    /** Progressbar z-index, `9999` by default */
    zIndex?: React.CSSProperties['zIndex'];
}
export declare function NavigationProgress({ initialProgress, color, size, stepInterval, withinPortal, portalProps, zIndex, store, ...others }: NavigationProgressProps): React.JSX.Element;
export declare namespace NavigationProgress {
    var displayName: string;
}
//# sourceMappingURL=NavigationProgress.d.ts.map