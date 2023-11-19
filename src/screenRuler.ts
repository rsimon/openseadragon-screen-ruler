import type OpenSeadragon from 'openseadragon';
import { HorizontalRuler } from './HorizontalRuler';
import type { ScreenRulerOpts } from './ScreenRulerOpts';

export const init = (viewer: OpenSeadragon.Viewer, opts?: ScreenRulerOpts) => {

  let _visible = opts?.visible === undefined ? true : opts.visible;

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