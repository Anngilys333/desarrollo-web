/*Preferiblemente solo modificar los apartados que digan "modificar" */

//LOGICA DEL MAPTOUR

// Importar módulos y librerías de la API de Esri ArcGIS
require([
    'esri/Map',
    'esri/views/MapView',
    'esri/geometry/Point',
    'esri/layers/GraphicsLayer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/PopupTemplate',
    'esri/Graphic'
  ], function(Map, MapView, Point, GraphicsLayer, SimpleMarkerSymbol, PopupTemplate, Graphic) {

    // Creación de un objeto Map con basemap 'topo'
    const map = new Map({
      basemap: 'topo' //tipo de basemapa (modificar al gusto)
    });

    // Creación de un objeto MapView y configuración de propiedades
    const view = new MapView({
      container: 'viewDiv',// Contenedor HTML para mostrar el mapa
      map: map, //mapa asociado
      center: [-74.006, 40.7128],// Centro del mapa inicial
      zoom: 10 // Nivel de zoom inicial (modificar al gusto)
    });

    // Creación de un objeto GraphicsLayer y agregándolo al mapa
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // ¡MODIFICAR!
    //DEBE COINCIDIR LA CANTIDAD DE DATOS CON LA CANTIDAD DE LEYENDAS CREADAS EN EL HTML
    /* MODIDIFCAR LOS DATOS ENTRE COMILLA SIMPLE
    POR CADA PUNTO SE DEBE LLENAR:
    name:'MODIFICAR' (FUNCIONA COMO TITULO Y COMO LEYENDA)
    description:'MODIFICAR' (FUNCIONA COMO DESCRIPCION AL DARLE CLIC AL PUNTO [EN EL POPUP])
    review:'MODIFICAR' (FUNCIONA COMO CONTENIDO O CUERPO DEL CONTENEDOR DE INFOMACION)
    lat:'MODIFICAR' (LO MAS IMPORTANTE, ES LA LATITUD DEL PUNTO QUE QUEREMOS UBICAR)
    long:'MODIFICAR' (LO MAS IMPORTANTE, ES LA LONGITUD DEL PUNTO QUE QUEREMOS UBICAR)
    imageUrl: 'MODIFICAR' (CAMBIAR LA IMAGEN QUE SE MUESTRA EN EL CONTENEDOR)
    color:'NO MODIFICAR' DEJAR PREDETERMINADO #FF0000
    */
    const locations = [
      { name: 'Movistar Arenas', description: 'Movistar Arenas', review: 'A modern indoor arena hosting concerts, sports, and cultural events in Bogotá', lat: 4.64943, long: -74.07728, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUg8Oxc58qUf0efiyCitZ6VXzoARZHfBxSQ&s', color: '#FF0000' },
      { name: 'Estadio El Campin', description: 'Estadio El Campin', review: 'Bogotá´s main football stadium, home to major local teams and international matches', lat: 4.64586, long: -74.07778, imageUrl: 'https://www.infobae.com/resizer/v2/FTCUCDGYRVDIJPI2WX4EK5QAWM.jpg?auth=db94615f278cd904136f35dd8df9014e98c50acba3e05c512d2f201f59bf34ea&smart=true&width=350&height=233&quality=85', color: '#00FF00' },
      { name: 'Coliseo Live', description: 'Coliseo Live', review: 'A large indoor venue near Bogotá, known for hosting major international concerts and events.', lat: 4.73828, long: -74.13284, imageUrl: 'https://www.coliseomedplus.com/wp-content/uploads/2023/08/coliseo-live.jpg', color: '#0000FF' },
      { name: 'Centro de Eventos Autopista Norte', description: 'Centro de Eventos Autopista Norte', review: 'An events center located along the North Highway, popular for large-scale concerts and festivals.', lat:4.84076, long: -74.03132, imageUrl: 'https://centrodeeventos.com.co/wp-content/uploads/2019/10/ubicacion-centro-de-eventos-autopista-norte2.jpg', color: '#FFFF00' },
      { name: 'Parque Simon Bolivar', description: 'Parque Simon Bolivar', review: 'The city´s largest urban park, offering green spaces, a lake, and venues for open-air events.', lat: 4.65818, long: -74.09418, imageUrl: 'https://www.sitiosturisticosbogota.com/wp-content/uploads/2018/11/PARQUE-SIMON-BOLIVAR.jpg', color: '#00FFFF' },
      { name: 'Chamorro Hall', description: 'Chamorro Hall', review: 'A versatile event venue used for concerts, conferences, and cultural shows in northern Bogotá.', lat: 4.73985, long: -74.04925, imageUrl: 'https://e.snmc.io/i/300/s/f15f41b0af1808956257d0974c700c29/7111082', color: '#FF00FF' }
    ];

    //recorre cada id de cada elemento leyenda agregado en el html para anexarle la propiedad name
    for (let i = 0; i < locations.length; i++) {
        const label = document.getElementById(`l${i + 1}`);
        if (label) {
          label.textContent = locations[i].name;
        }
      }
    
    //variable requerida para indexar
    let currentIndex = 0;

    // Función para mostrar una ubicación específica
    function showLocation(index) {
      const location = locations[index];
      // Creación de un punto basado en la latitud y longitud de la ubicación
      const point = new Point({
        longitude: location.long,
        latitude: location.lat
      });

      // Símbolo para el marcador en la ubicación
      const markerSymbol = new SimpleMarkerSymbol({
        color: location.color,
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      });

      // popup emergente para la ubicación
      const popupTemplate = new PopupTemplate({
        title: location.name,
        content: `${location.description}`
      });

      // Gráfico asociado al punto de ubicación
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: popupTemplate
      });

      // Limpiar capa gráfica y agregar el nuevo gráfico
      graphicsLayer.removeAll();
      graphicsLayer.add(pointGraphic);
      // Cambiar la vista del mapa a la ubicación actual
      view.goTo({ target: point, zoom: 15 });

      // Mostrar la información de la ubicación actual en el contenedor
      document.getElementById('locationImage').innerHTML = `<img src="${location.imageUrl}" style="max-width: 300px;"/>`;
      document.getElementById('locationTitle').textContent = `Título: ${location.name}`;
      document.getElementById('locationReview').textContent = `Reseña: ${location.review}`;
    }

    // Mostrar la ubicacion indexada al cargar (la posicion 0 es decir la inicial)
    showLocation(currentIndex);

    // Evento para mostrar la ubicación anterior
    document.getElementById('prevBtn').addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + locations.length) % locations.length;
      showLocation(currentIndex);
    });

    // Evento para mostrar la siguiente ubicación
    document.getElementById('nextBtn').addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % locations.length;
      showLocation(currentIndex);
    });

  });