import { App } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const browser: App<BrowserProps>;

declare interface BrowserProps extends WindowProps {
    url?: string;
}

export { }
