<script lang="ts">
  import { onMount } from 'svelte';
  import OpenSeadragon from 'openseadragon';
    
  export let viewer: OpenSeadragon.Viewer;

  // Current image dimensions
  let dimensions: [number, number];

  // Current OSD viewer scale
  let scale = 1;

  // CSS layer transform
  let transform: string;

  // Ruler vertical pos
  let vpos: number;

  // Pointer state: ruler grabbed or not
  let grabbed = false;

  $: handleSize = 6 / scale;

  const init = () => {
    const dim = viewer.world.getItemAt(0)?.source?.dimensions;

    if (dim) {
      dimensions = [dim.x, dim.y];
      vpos = dim.y / 2;
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
  }

  const onPointerDown = (evt: PointerEvent) => {
    if (evt.button !== 0) // Block right mouse button
      return; 

    grabbed = true;

    const target = evt.target as Element;
    target.setPointerCapture(evt.pointerId);

    viewer.setMouseNavEnabled(false);
  }

  const onPointerMove = (evt: PointerEvent) => {
    if (grabbed) {
      const { offsetX, offsetY } = evt;
      const { y } = viewer.viewport.viewerElementToImageCoordinates(new OpenSeadragon.Point(offsetX, offsetY));
      vpos = y;
    }
  }

  const onPointerUp = (evt: PointerEvent) => {
    grabbed = false;

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
        y1={vpos} 
        x2={dimensions[0]} 
        y2={vpos} />

      <rect 
        class="handle" 
        x={0} 
        y={vpos - handleSize / 2} 
        width={dimensions[0]} 
        height={handleSize} 
        on:pointerdown={onPointerDown} />
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

  rect.handle {
    fill: transparent;
    cursor: ns-resize;
  }
</style>