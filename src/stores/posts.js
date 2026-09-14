// stores/posts.js
import { reactive } from "vue";

let idCounter = 1;

export const posts = reactive([
  {
    id: idCounter++,
    user: "@MissBrenda456",
    text: "Clean the tables from the center, please guys.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@EcoVolunteers",
    text: "Volunteers needed for reforestation in the National Park. Saturday, August 8, 9:00 a.m. Registration open.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@Do_recicle",
    text: "Electronics recycling campaign at the community center. Bring your old devices and help us reduce waste.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@Mr_Beast",
    text: "Beach cleanup day this Sunday. Meeting point: main pier at 8:00 a.m. Gloves and bags provided.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@UnPulmonMas",
    text: "Urban tree adoption project. Sponsor a tree and receive monthly updates on its growth. More info at our booth.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@GreenRootsSV",
    text: "Community garden workshop this Saturday at 10 a.m. Learn to grow your own vegetables in small spaces. Free seeds for the first 20 attendees.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@PlayaLimpia",
    text: "We collected 240 kg of plastic from El Tunco beach last weekend. Join our next cleanup on Sunday at 7 a.m. Bring reusable gloves if you have them.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@ReciclaConmigo",
    text: "Reminder: batteries and old phone chargers go in the yellow bin, not the regular trash. Drop-off point open Monday to Friday, 8 a.m. to 5 p.m.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@EcoEscuela",
    text: "Local schools are starting a 'Zero Waste Lunch' challenge this month. Parents, pack reusable containers and help us reduce single-use plastics.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@VerdeUrbano",
    text: "Tree planting day at Parque Colon. We need 30 volunteers to help us plant 50 native trees. Tools and refreshments provided. Sign up at our booth.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@CompostaSV",
    text: "Free composting workshop next Thursday at 4 p.m. Learn how to turn kitchen scraps into nutrient-rich soil for your garden. Bring a small container.",
    image: null,
    own: false,
  },
  {
    id: idCounter++,
    user: "@AirePuro",
    text: "Air quality report: Santa Ana is at a moderate level this week. Carpool when possible and avoid burning trash. Every small action counts.",
    image: null,
    own: false,
  },
]);

export function addPost(text, file) {
  const post = {
    id: idCounter++,
    user: "Tú",
    text,
    image: null,
    own: true,
  };

  // Caso 1: no hay imagen → agregar directo
  if (!file) {
    posts.unshift(post);
    return;
  }

  // Caso 2: hay imagen → esperar a que se lea, y luego agregar
  const reader = new FileReader();
  reader.onload = (e) => {
    post.image = e.target.result;
    posts.unshift(post);
  };
  reader.readAsDataURL(file);
}

export function removePost(id) {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) posts.splice(idx, 1);
}
