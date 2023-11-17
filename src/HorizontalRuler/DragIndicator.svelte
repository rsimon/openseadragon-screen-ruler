<script lang="ts">
  export let x: number;
  export let y: number;
  export let scale: number;
  export let slant: number;

  $: dx = 7 / scale;
  $: dy = 4 / scale;
  $: rotation = 180 * Math.atan(slant) / Math.PI;
</script>

<g transform={`rotate(${rotation}, ${x}, ${y})`}>
  <path 
    d={`M${x - dx} ${y - 1.5 * dy} l${dx} ${- dy} l${dx} ${dy}`} />

  <path 
    d={`M${x - dx} ${y + 1.5 * dy} l${dx} ${dy} l${dx} ${-dy}`} />
</g>

<style>
  path {
    fill: transparent;
    pointer-events: none;
    stroke: #ff0000;
    stroke-linejoin: bevel;
    stroke-linecap: round;
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
</style>