import { App } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const terminal: App<TerminalProps>;

declare interface TerminalProps extends WindowProps {
    path?: string;
    input?: string;
}

export { }
