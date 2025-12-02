import { App } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const settings: App<SettingsProps>;

declare interface SettingsProps extends WindowProps {
    tab?: number;
}

export { }
