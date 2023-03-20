let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.895681, 37.423132],
    zoom: 16,
    controls: []
  })

const coords = [
  [55.895681, 37.423132] 
];

const myCollection = new ymaps.GeoObjectCollection({},{
  draggable: false,
  iconLayout: 'default#image',
  iconImageHref: './images/map/marker.svg',
  iconImageSize: [58, 73],
  iconImageOffset: [-30, -75]
})

coords.forEach(coord => {
  myCollection.add(new ymaps.Placemark(coord))
})

myMap.behaviors.disable('scrollZoom');

myMap.geoObjects.add(myCollection);

}

ymaps.ready(init);