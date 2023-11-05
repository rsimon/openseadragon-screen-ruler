import type OpenSeadragon from 'openseadragon';
import ScreenRulerOverlay from './ScreenRulerOverlay.svelte';

export const init = (viewer: OpenSeadragon.Viewer) => {

  const overlay = new ScreenRulerOverlay({
    target: viewer.element.querySelector('.openseadragon-canvas')!,
    props: { viewer }
  });
  
}