declare module '@sketchfab/viewer-api' {
  export interface SketchfabAPI {
    start: () => void;
    stop: () => void;
    addEventListener: (event: string, func: (obj: object) => void) => void;
  }

  export interface ViewerOptions {
    success: (api: SketchfabAPI) => void;
    error?: (errorMessage: string) => void;
    autostart?: boolean;
  }

  export default class Sketchfab {
    constructor(version: string, iframe: HTMLElement | null);
    init(uid: string, options: ViewerOptions): void;
  }
}
