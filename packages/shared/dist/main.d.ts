export declare const ANSI: {
    fg: {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
    };
    bg: {};
    decoration: {
        dim: string;
        bold: string;
    };
    reset: string;
};

export declare function clamp(value: number, min: number, max: number): number;

export declare class EventEmitter<EventMap extends EventNamesMap> {
    #private;
    static EVENT_NAMES: EventNamesMap;
    /**
     * Add event listener for an event
     */
    on<Key extends keyof EventMap>(eventName: Key, callback: (data: unknown) => void): void;
    /**
     * Remove event listener for an event
     */
    off<Key extends keyof EventMap>(eventName: Key, callback: (data: unknown) => void): void;
    /**
     * Dispatch event
     */
    emit<Key extends keyof EventMap>(eventName: Key, data?: unknown): void;
}

export declare type EventNamesMap = Record<string, string>;

/**
 * Format a time relative to now
 * @param date - The date
 * @param maxLength - The maximum amount of units, e.g.: 3 => years, months, days
 */
export declare function formatRelativeTime(date: Date, maxLength: number | undefined, allowAffixes: boolean): string;

/**
 * Format a time
 * @param time - Time in milliseconds
 * @param maxLength - The maximum amount of units, e.g.: 3 => years, months, days
 */
export declare function formatTime(time: number, maxLength: number | undefined, allowAffixes: boolean): string;

export declare function isValidInteger(number: number | string): number | boolean;

export declare function randomFromArray<Type>(array: Type[]): Type;

export declare function randomRange(min: number, max: number): number;

export declare function removeDuplicatesFromArray<Type>(array: Type[]): Type[];

export declare function removeFromArray<Type>(item: Type, array: Type[]): void;

export declare function round(value: number, precision: number): number;

export { }
