// sketchfab.d.ts
declare module '@sketchfab/viewer-api' {
  export interface SketchfabAPI {
    start: () => void;
    stop: () => void;
    // Define other methods and properties you use
  }

  export interface ViewerOptions {
    success: (api: SketchfabAPI) => void;
    error?: (errorMessage: string) => void;
    autostart?: boolean;
    // Include other initialization options here
  }

  export default class Sketchfab {
    constructor(version: string, iframe: HTMLIFrameElement);
    init(uid: string, options: ViewerOptions): void;
  }
}

export {};
