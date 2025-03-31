// types/global.d.ts
declare module 'three/examples/jsm/loaders/FontLoader' {
    import { Font } from 'three/examples/jsm/loaders/FontLoader';
    import { Loader } from 'three';
    export class FontLoader extends Loader {
      parse(json: object): Font;
      load(
        url: string,
        onLoad: (font: Font) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
    }
  }
  