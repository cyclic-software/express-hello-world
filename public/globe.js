(function() {
  let globe = planetaryjs.planet();
  // This plugin will automatically rotate the globe around its vertical
  // axis a configured number of degrees every second.
  function autorotate(degPerSec) {
    // Planetary.js plugins are functions that take a `planet` instance
    // as an argument...
    return function(planet) {
      let lastTick = null;
      let paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      // ...and configure hooks into certain pieces of its lifecycle.
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          let now = new Date();
          let delta = now - lastTick;
          // This plugin uses the built-in projection (provided by D3)
          // to rotate the globe each time we draw it.
          let rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };
  // Load our custom `autorotate` plugin; see below.
  globe.loadPlugin(autorotate(10));
  // The `earth` plugin draws the oceans and the land; it's actually
  // a combination of several separate built-in plugins.
  //
  // Note that we're loading a special TopoJSON file
  // (world-110m-withlakes.json) so we can render lakes.
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   '/world-110m-withlakes.json' },
    oceans:   { fill:   'rgba(50, 96, 143, .5)' },
    land:     { fill:   '#32608f' },
    borders:  { stroke: '#cccccc' }
  }));

  // This plugin takes lake data from the special
  // TopoJSON we're loading and draws them on the map.
  function lakes(options) {
    options = options || {};
    let lakes = null;

    return function(planet) {
      planet.onInit(function() {
        // We can access the data loaded from the TopoJSON plugin
        // on its namespace on `planet.plugins`. We're loading a custom
        // TopoJSON file with an object called "ne_110m_lakes".
        let world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  };
  // Load our custom `lakes` plugin to draw lakes; see below.
  globe.loadPlugin(lakes({
    fill: '#cccccc'
  }));
  // The `pings` plugin draws animated pings on the globe.
  globe.loadPlugin(planetaryjs.plugins.pings());
  globe.loadPlugin(planetaryjs.plugins.drag({
    // Dragging the globe should pause the
    // automatic rotation until we release the mouse.
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));
  // Set up the globe's initial scale, offset, and rotation.
  globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

  let canvas = document.getElementById('rotatingGlobe');
  canvas.width = 350;
  canvas.height = 350;
  // Draw that globe!
  globe.draw(canvas);

  var locations = [
    {"location": "Ohio", "lat": "40.32497", "lng": "-82.83653"},
    {"location": "Virginia",   "lat": "34.41222", "lng": "-78.47445"},
    {"location": "California", "lat": "36.48079", "lng": "-119.33910"},
    {"location": "Oregon", "lat": "43.81512", "lng": "-120.78339"},
    {"location": "Cape Town, South Africa", "lat": "-33.89178", "lng": "18.43676"},
    {"location": "Hong Kong, China", "lat": "22.30548", "lng": "114.17572"},
    {"location": "Mumbay, India", "lat": "19.07960", "lng": "72.87293"},
    {"location": "Osaka, Japan", "lat": "37.70725", "lng": "135.49608"},
    {"location": "Seoul, Korea", "lat": "37.55322", "lng": "126.99229"},
    {"location": "Singapore", "lat": "1.35724", "lng": "103.86827"},
    {"location": "Sydney", "lat": "-33.81413", "lng": "151.20285"},
    {"location": "Canada", "lat": "60.55165", "lng": "-111.21677"},
    {"location": "Frankfurt", "lat": "50.16668", "lng": "8.74766"},
    {"location": "Ireland", "lat": "53.15114", "lng": "-8.25418"},
    {"location": "London", "lat": "51.53359", "lng": "-0.02398"},
    {"location": "Milan", "lat": "45.48840", "lng": "9.21345"},
    {"location": "Paris", "lat": "48.85658", "lng": "2.35530"},
    {"location": "Stockholm", "lat": "59.32891", "lng": "18.06768"},
    {"location": "Bahrain", "lat": "35.20769", "lng": "72.54652"},
    {"location": "Sao Paulo", "lat": "-23.46811", "lng": "-46.57775"
    }
  ]

  locations.forEach(e => {
    setInterval(function() {
      globe.plugins.pings.add(e.lng, e.lat, { color: ['white'], ttl: 2000, angle: Math.random() * 4 });
    }, 150);
  });

})();
