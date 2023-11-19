import type OpenSeadragon from 'openseadragon';
import { HorizontalRuler } from './HorizontalRuler';

export const init = (viewer: OpenSeadragon.Viewer) => {

  let _visible = false;

  const overlay = new HorizontalRuler({
    target: viewer.element.querySelector('.openseadragon-canvas')!,
    props: { viewer, visible: _visible }
  });

  const destroy = () => overlay.$destroy();

  const isVisible = () => _visible;

  const setVisible = (visible: boolean) => {
    _visible = visible;
    overlay.$set({ visible });
  }

  return {
    destroy,
    isVisible,
    setVisible
  }
  
}