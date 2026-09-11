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
