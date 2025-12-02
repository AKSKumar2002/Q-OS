/**
 * A skin inspired by the MacOS interface
 */
export declare const macOsSkin: Skin;

/**
 * A minimalistic skin with monochrome icons
 */
export declare const minimalSkin: Skin;

export declare const pixelSkin: Skin;

export declare class Skin {
    systemIcon: SkinOptions["systemIcon"];
    appIcons: SkinOptions["appIcons"];
    appNames: SkinOptions["appNames"];
    wallpapers: SkinOptions["wallpapers"];
    defaultWallpaper: SkinOptions["defaultWallpaper"];
    fileIcons: SkinOptions["fileIcons"];
    folderIcons: SkinOptions["folderIcons"];
    loadStyleSheet: SkinOptions["loadStyleSheet"];
    defaultTheme: SkinOptions["defaultTheme"];
    constructor(options?: Partial<SkinOptions>);
}

declare interface SkinOptions {
    /**
     * SVG icon for the system
     * @default
     * "https://os.prozilla.dev/icon.svg"
     */
    systemIcon: string;
    /**
     * Replacements for app icons based on app id
     */
    appIcons?: {
        [key: string]: string;
    };
    /**
     * Replacements for app names based on app id
     */
    appNames?: {
        [key: string]: string;
    };
    /**
     * Array of URLs of wallpaper images
     */
    wallpapers: string[];
    /**
     * URL of default wallpaper image
     * @default
     * "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"
     */
    defaultWallpaper: string;
    /**
     * URLs of icons for types of files
     */
    fileIcons: {
        generic: string;
        info?: string;
        text?: string;
        code?: string;
        external?: string;
        video?: string;
        audio?: string;
    };
    /**
     * URLs of icons for types of folders
     */
    folderIcons: {
        generic: string;
        images?: string;
        text?: string;
        link?: string;
        video?: string;
        audio?: string;
    };
    /**
     * Function that dynamically imports style sheet
     */
    loadStyleSheet?: () => void;
    /**
     * Default theme
     */
    defaultTheme?: Theme;
}

export declare enum Theme {
    Dark = 0,
    Light = 1,
    Cherry = 2,
    Mango = 3,
    Aqua = 4,
    Grape = 5
}

/**
 * A skin inspired by the Windows95 interface
 */
export declare const windows95Skin: Skin;

export { }
