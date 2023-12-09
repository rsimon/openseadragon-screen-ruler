# OpenSeadrago Screen Ruler

A screen ruler overlay for OpenSeadragon.

## Integration

### 1. Script and stylesheet files

Add the [osd-screenruler.js](https://raw.githubusercontent.com/rsimon/openseadragon-screen-ruler/main/example/osd-screenruler.js) script file and the [osd-screenruler.css](https://raw.githubusercontent.com/rsimon/openseadragon-screen-ruler/main/example/osd-screenruler.css) stylesheet to your page template. (I also recommend putting the [osd-screenruler.js.map](https://raw.githubusercontent.com/rsimon/openseadragon-screen-ruler/main/example/osd-screenruler.js.map) file in the same location as `osd-screenruler.js`. It's not strictly needed, but will help to generate readable console messages, in case of runtime errors.)

```html
<head>
  <!-- ... other stuff -->
  <script src="osd-screenruler.js"></script>
  <link rel="stylesheet" href="osd-screenruler.css">
  <!-- ... other stuff -->
</head>
```

### 2. Initialization

Initialize the screen ruler plugin __after you initialize the OSD viewer.__

```js
# OpenSeadragon viewer must be initialized before the overlay plugin!
var viewer = OpenSeadragon({
  // ...
});

var ruler = OSDScreenRuler.init(viewer, {
  // slope persists across page changes if true (optional, default false)
  persistentSlope: true, 
  // visibility of the ruler persists across page changes (optional, default false)
  persistentVisibility: true
});
```

### 3. Attaching Buttons

Ruler visibility can be controlled programmatically, through an API function 
on the `ruler` object.

Create a button anywhere on your page (with a unique Id for convenience).

```html
<button id="toggle-ruler">Toggle Ruler Visibility</button>
```

After initializing the ruler, attach a click handler to the button.

```js
document.getElementById('toggle').addEventListener('click', function() {
  // The ruler has `.setVisible` and `.isVisible` functions to set and
  // get visibility status. The line below will toggle the current status.
  ruler.setVisible(!ruler.isVisible());
});
```

- Online demo: https://screen-ruler.rainersimon.io/
- Source code: https://github.com/rsimon/openseadragon-screen-ruler/blob/main/example/index.html
