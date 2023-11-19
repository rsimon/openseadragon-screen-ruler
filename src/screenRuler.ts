import type OpenSeadragon from 'openseadragon';
import { HorizontalRuler } from './HorizontalRuler';
import type { ScreenRulerOpts } from './ScreenRulerOpts';

const persistSlope = (slope: number): void =>
  localStorage.setItem('screen-ruler-slope', slope.toString());

const getPersistedSlope = (): number => {
  const str = localStorage.getItem('screen-ruler-slope');
  return str ? parseFloat(str) : 0;
}

const persistVisibility = (visible: boolean): void =>
  visible ? 
    localStorage.setItem('screen-ruler-visibility', 'true') :
    localStorage.removeItem('screen-ruler-visibility');

const getPersistedVisibility = (): boolean =>
  localStorage.getItem('screen-ruler-visibility') === 'true';

export const init = (viewer: OpenSeadragon.Viewer, opts?: ScreenRulerOpts) => {

  let _visible = opts?.visible === undefined ? 
    opts?.persistentVisibility ? getPersistedVisibility() : true : 
    opts.visible;

  const k = opts?.persistentSlope ? getPersistedSlope() : 0;

  const overlay = new HorizontalRuler({
    target: viewer.element.querySelector('.openseadragon-canvas')!,
    props: { viewer, visible: _visible, initialSlope: k }
  });

  if (opts?.persistentSlope) {
    overlay.$on('changeSlope', evt => {
      const k = evt.detail;
      persistSlope(k);
    });
  }

  const destroy = () => overlay.$destroy();

  const isVisible = () => _visible;

  const setVisible = (visible: boolean) => {
    _visible = visible;

    overlay.$set({ visible });

    if (opts?.persistentVisibility)
      persistVisibility(visible);
  }

  return {
    destroy,
    isVisible,
    setVisible
  }
  
}