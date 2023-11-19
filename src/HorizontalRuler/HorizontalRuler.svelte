<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import OpenSeadragon from 'openseadragon';
  import DragIndicator from './DragIndicator.svelte';
  import SlantHandle from './SlantHandle.svelte';

  const dispatch = createEventDispatcher<{ changeSlope: number }>();
    
  export let viewer: OpenSeadragon.Viewer;
  export let handlePadding = 8;
  export let visible: boolean;
  export let initialSlope: number;

  // Current image dimensions
  let dimensions: { width: number, height: number };

  // Current rule params (y = kx + d)
  let k: number = initialSlope;
  let d: number;

  // Current OSD viewer scale
  let scale = 1;

  // CSS layer transform
  let transform: string;

  // Pointer state: ruler grabbed or not
  let grabbed: 'ruler' | 'left-slant' | 'right-slant' | undefined;

  $: handleSize = 8 / scale;

  let handlePositions: { left: number, middle: number, right: number };

  const init = () => {
    const dim = viewer.world.getItemAt(0)?.source?.dimensions;

    if (dim) {
      dimensions = { width: dim.x, height: dim.y };
      d = dim.y / 2;

      onUpdateViewport();
    }
  }

  const onUpdateViewport = () => {
    const containerWidth = viewer.viewport.getContainerSize().x;

    const zoom = viewer.viewport.getZoom(true);
    const flipped = viewer.viewport.getFlip();

    const p = viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0, 0), true);
    if (flipped)
      p.x = containerWidth - p.x;
    
    const scaleY = zoom * containerWidth / viewer.world.getContentFactor();
    const scaleX = flipped ? - scaleY : scaleY;

    // @ts-ignore note: getRotation(true <- realtime value) only since OSD 4!
    const rotation = viewer.viewport.getRotation(true);

    transform = `translate(${p.x}, ${p.y}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`;

    scale = zoom * containerWidth / viewer.world.getContentFactor();

    setHandlePositions();
  }

  const setHandlePositions = () => {
    const { viewport } = viewer;

    // Bounds of the current viewport in image coordinates
    const viewportBounds = viewport.viewportToImageRectangle(viewport.getBounds(true));
    const { x, width } = viewportBounds;

    const left = Math.max(0, x + handlePadding / scale);
    const right = Math.min(dimensions.width, x + width - handlePadding / scale);
    const middle = left + (right - left) / 2;

    handlePositions = { left, middle, right };
  }

  const onPointerDown = (handle: 'ruler' | 'left-slant' | 'right-slant') => (evt: PointerEvent) => {
    if (evt.button !== 0) // Block right mouse button
      return; 

    grabbed = handle;

    const target = evt.target as Element;
    target.setPointerCapture(evt.pointerId);

    viewer.setMouseNavEnabled(false);
  }

  const onPointerMove = (evt: PointerEvent) => {
    if (!grabbed)
      return;

    const { offsetX, offsetY } = evt;
    const { x, y } = viewer.viewport.viewerElementToImageCoordinates(new OpenSeadragon.Point(offsetX, offsetY));

    if (grabbed === 'ruler') {
      d = y - k * x;
    } else if (grabbed === 'left-slant') {
      const y1 = k * handlePositions.right + d;

      const deltaX = handlePositions.right - handlePositions.left;
      const deltaY = y - y1;

      k = - deltaY / deltaX;
      d = y1 - k * handlePositions.right;

      dispatch('changeSlope', k);
    } else if (grabbed === 'right-slant') {
      const y0 = k * handlePositions.left + d;

      const deltaX = handlePositions.right - handlePositions.left;
      const deltaY = y0 - y;

      k = - deltaY / deltaX;
      d = y0 - k * handlePositions.left;

      dispatch('changeSlope', k);
    }
  }

  const onPointerUp = (evt: PointerEvent) => {
    grabbed = undefined;

    const target = evt.target as Element;
    target.releasePointerCapture(evt.pointerId);

    viewer.setMouseNavEnabled(true);
  }

  onMount(() => {
    document.addEventListener('pointerup', onPointerUp);

    viewer.addHandler('open', init);
    viewer.addHandler('update-viewport', onUpdateViewport);

    // In case OSD has already loaded
    init();

    return () => {
      viewer.removeHandler('page', init);
      viewer.removeHandler('update-viewport', onUpdateViewport);
    }
  });
</script>

{#if visible}
  <svg>
    <g 
      class="osd-screenruler"
      transform={transform}
      on:pointermove={onPointerMove}>

      {#if dimensions}
        {@const y2 = k * dimensions.width + d}
        <line 
          class="ruler" 
          x1={0} 
          y1={d} 
          x2={dimensions.width} 
          y2={y2} 
          on:pointerdown={onPointerDown('ruler')} />

        <polygon 
          class="h-pos-handle hideable" 
          points={[
            [0, d - handleSize / 2],
            [dimensions.width, y2 - handleSize / 2],
            [dimensions.width, y2 + handleSize / 2],
            [0, d + handleSize / 2]
          ].map(t => t.join(',')).join(' ')}
          on:pointerdown={onPointerDown('ruler')} />

        <SlantHandle 
          class="hideable"
          x={handlePositions.left} 
          y={k * handlePositions.left + d} 
          scale={scale}
          on:pointerdown={onPointerDown('left-slant')} />

        <DragIndicator 
          class="hideable"
          x={handlePositions.middle} 
          y={k * handlePositions.middle + d} 
          scale={scale} 
          slant={k} />

        <SlantHandle 
          class="hideable"
          x={handlePositions.right} 
          y={k * handlePositions.right + d} 
          scale={scale}
          on:pointerdown={onPointerDown('right-slant')} />
      {/if}
    </g>
  </svg>
{/if}

<style>
  svg {
    box-sizing: border-box;
    height: 100%;
    left: 0;
    outline: none;
    position: absolute;
    top: 0;
    touch-action: none;
    width: 100%;

    -webkit-user-select: none; 
      -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
            user-select: none;
  }

  .osd-screenruler :global(.hideable *) {
    opacity: 0;
    transition: opacity 350ms ease-in-out;
    transition-delay: 1s;
  }

  .osd-screenruler:hover :global(.hideable *) {
    opacity: 1;
    transition-delay: 0s;
  }

  line.ruler {
    stroke: red;
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }

  polygon.h-pos-handle {
    fill: transparent;
    cursor: ns-resize;
  }
</style>