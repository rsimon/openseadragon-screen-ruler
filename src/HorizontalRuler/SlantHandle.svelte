<script lang="ts">
  export let x: number;
  export let y: number;
  export let scale: number;

  $: outer = 20 / scale;
  $: inner = 6 / scale;
</script>

<circle
  class="slant-handle-outer"
  cx={x} 
  cy={y} 
  r={outer} 
  on:pointerdown />

<circle
  class="slant-handle-inner"
  cx={x} 
  cy={y} 
  r={inner} />

<style>
  circle.slant-handle-outer {
    cursor: grab;
    fill: transparent;
  }

  circle.slant-handle-inner {
    stroke: #ff0000;
    stroke-width: 3px;
    vector-effect: non-scaling-stroke;
    fill: #fff;
    pointer-events: none;
  }
</style>