const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const text = document.getElementById('text');
const bus = document.querySelector('.bus');
const eat = document.querySelector('.eat');
const images = document.querySelectorAll('.transform');

//Transform images

images.forEach(img=> {
    img.addEventListener('mouseover', function() {
        img.classList.add('transforms');
    })

    img.addEventListener('mouseout', function() {
        img.classList.remove('transforms');
    })
})


//Scrolling

btn1.addEventListener("click", function (e) {
    e.preventDefault();
    text.scrollIntoView({ behavior: "smooth" });
  });
  
  btn2.addEventListener("click", function (e) {
    e.preventDefault();
    bus.scrollIntoView({ behavior: "smooth" });
  });
  
  btn3.addEventListener("click", function (e) {
    e.preventDefault();
    eat.scrollIntoView({ behavior: "smooth" });
  });
  
//Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");


let curSlide = 0;
const maxSlide = slides.length;

const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide='${i}'> </button>`
    );
  });
};
createDots();

//Create active dots

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};

activateDot(curSlide);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activateDot(slide);
  }
});


const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);
activateDot(0);

//Next slide

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

//Prev slide

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//With keaboard

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});


//Add map

const mapOptions = {
    center: [17.385044, 78.486671],
    zoom: 7,
  };
const map = L.map("map").setView([48.0350889, 9.2486652], 5.6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const budapest = L.marker([47.51, 19.01])
  .addTo(map)
  .bindPopup("Budapest")
  .openPopup();

const wien = L.marker([48.25, 16.3]).addTo(map).bindPopup("Wien").openPopup();

const brno = L.marker([49.2, 16.59]).addTo(map).bindPopup("Brno").openPopup();

const krakow = L.marker([50.06, 19.93])
  .addTo(map)
  .bindPopup("Krakow")
  .openPopup();

const nurnberg = L.marker([49.45, 11.07])
  .addTo(map)
  .bindPopup("Nürnberg")
  .openPopup();
const munich = L.marker([48.13, 11.57])
  .addTo(map)
  .bindPopup("München")
  .openPopup();
const prague = L.marker([50.08, 14.43])
  .addTo(map)
  .bindPopup("Praha")
  .openPopup();

const barcelona = L.marker([41.38, 2.17])
  .addTo(map)
  .bindPopup("Barcelona")
  .openPopup();

const porto = L.marker([41.15, -8.61])
  .addTo(map)
  .bindPopup("Porto")
  .openPopup();

const lisboa = L.marker([38.72, -9.14])
  .addTo(map)
  .bindPopup("Lisboa")
  .openPopup();

//Add marsh on map

const addCities = function (coords, colors) {
  const layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  // Adding layer to the map
  map.addLayer(layer);

  // Creating latlng object
  var latlngs = [coords];
  // Creating a poly line
  var polyline = L.polyline(latlngs, { color: colors });

  // Adding to poly line to map
  polyline.addTo(map);
};

addCities(
  [
    [49.45, 11.07],
    [48.13, 11.57],
    [50.08, 14.43],
  ],
  "red"
);

addCities(
  [
    [47.51, 19.01],
    [48.25, 16.3],
    [49.2, 16.59],
    [50.06, 19.93],
  ],
  "blue"
);

addCities(
  [
    [41.38, 2.17],
    [41.15, -8.61],
    [38.72, -9.14],
  ],
  "green"
);

