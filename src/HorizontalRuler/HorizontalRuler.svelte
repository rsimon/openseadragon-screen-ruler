<script lang="ts">
  import { onMount } from 'svelte';
  import OpenSeadragon from 'openseadragon';
    
  export let viewer: OpenSeadragon.Viewer;
  export let handlePadding = 20;

  // Current image dimensions
  let dimensions: { width: number, height: number };

  // Current rule params (y = kx + d)
  let k: number;
  let d: number;

  // Current OSD viewer scale
  let scale = 1;

  // CSS layer transform
  let transform: string;

  // Pointer state: ruler grabbed or not
  let grabbed: 'ruler' | 'left-slant' | 'right-slant' | undefined;

  $: handleSize = 6 / scale;

  let handlePositions: { left: number, middle: number, right: number };

  const init = () => {
    const dim = viewer.world.getItemAt(0)?.source?.dimensions;

    if (dim) {
      dimensions = { width: dim.x, height: dim.y };
      k = 0;
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
    if (grabbed === 'ruler') {
      const { offsetX, offsetY } = evt;
      const { y } = viewer.viewport.viewerElementToImageCoordinates(new OpenSeadragon.Point(offsetX, offsetY));
      d = y;
    } else if (grabbed === 'left-slant') {

    } else if (grabbed === 'right-slant') {
      
    }
  }

  const onPointerUp = (evt: PointerEvent) => {
    grabbed = undefined;

    const target = evt.target as Element;
    target.releasePointerCapture(evt.pointerId);

    viewer.setMouseNavEnabled(true);
  }

  onMount(() => {
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

<svg class="osd-screenruler">
  <g 
    transform={transform}
    on:pointermove={onPointerMove} 
    on:pointerup={onPointerUp}>

    {#if dimensions}
      <line 
        x1={0} 
        y1={d} 
        x2={dimensions.width} 
        y2={k * dimensions.width + d} />

      <rect 
        class="h-pos-handle" 
        x={0} 
        y={d - handleSize / 2} 
        width={dimensions.width} 
        height={handleSize} 
        on:pointerdown={onPointerDown('ruler')} />

      <circle 
        class="l-slant-handle"
        cx={handlePositions.left} 
        cy={k * handlePositions.left + d} 
        r={100} 
        on:pointerdown={onPointerDown('left-slant')} />

      <circle 
        class="middle-dot"
        cx={handlePositions.middle} 
        cy={k * handlePositions.middle + d} 
        r={50} />

      <circle 
        class="r-slant-handle"
        cx={handlePositions.right} 
        cy={k * handlePositions.right + d} 
        r={100} 
        on:pointerdown={onPointerDown('right-slant')} />
    {/if}
  </g>
</svg>

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

  line {
    stroke: red;
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }

  rect.h-pos-handle {
    fill: transparent;
    cursor: ns-resize;
  }
</style>