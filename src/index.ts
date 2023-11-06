import type OpenSeadragon from 'openseadragon';
import HorizontalRuler from './HorizontalRuler.svelte';

export const init = (viewer: OpenSeadragon.Viewer) => {

  const overlay = new HorizontalRuler({
    target: viewer.element.querySelector('.openseadragon-canvas')!,
    props: { viewer }
  });
  
}