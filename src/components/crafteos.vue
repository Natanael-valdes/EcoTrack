<script setup>
import { ref, computed } from "vue";

/* =========================================================
   BASE DE DATOS DE PROYECTOS
   ========================================================= */
const projects = [
  {
    id: 1,
    title: "Self-Watering Planter",
    category: "plastic",
    icon: "🪴",
    difficulty: "Easy",
    time: "15 mins",
    desc: "Create a self-watering pot for herbs using a plastic soda bottle.",
    materials: [
      "1 plastic bottle",
      "Cotton string/yarn",
      "Soil & plant seed",
      "Scissors",
    ],
    steps: [
      "Cut the plastic bottle in half.",
      "Poke a small hole in the bottle cap and thread the cotton string through it.",
      "Screw the cap back on and place the top half upside down into the bottom half.",
      "Fill the bottom with water and the top half with soil and your plant.",
      "The string will pull water up into the soil automatically!",
    ],
  },
  {
    id: 2,
    title: "Desk Organizer",
    category: "cardboard",
    icon: "✏️",
    difficulty: "Easy",
    time: "20 mins",
    desc: "Turn cereal boxes and toilet paper rolls into a stylish desk holder.",
    materials: [
      "Cereal box",
      "3-4 toilet paper rolls",
      "Paint/colored paper",
      "Glue",
    ],
    steps: [
      "Cut the top of the cereal box at an angle.",
      "Paint or cover the box and paper rolls with colorful paper.",
      "Glue the rolls inside the box to create separate pen and pencil compartments.",
      "Let it dry and organize your desk supplies!",
    ],
  },
  {
    id: 3,
    title: "Tin Can Lantern",
    category: "glass",
    icon: "🕯️",
    difficulty: "Medium",
    time: "30 mins",
    desc: "Transform clean tin cans into beautiful decorative candle lanterns.",
    materials: [
      "Clean tin can",
      "Hammer & nail",
      "Water & freezer",
      "LED candle/tea light",
    ],
    steps: [
      "Fill the tin can with water and freeze it (prevents denting while hammering).",
      "Use a hammer and nail to punch small decorative patterns/holes into the can.",
      "Melt the ice out and paint the outside of the can.",
      "Place an LED tea light inside to watch the pattern light up!",
    ],
  },
  {
    id: 4,
    title: "Vertical Hanging Garden",
    category: "plastic",
    icon: "🌱",
    difficulty: "Advanced",
    time: "45 mins",
    desc: "Build a multi-tier garden for small spaces using large plastic bottles.",
    materials: ["3-4 Large plastic bottles", "Sturdy rope", "Soil", "Scissors"],
    steps: [
      "Cut a rectangular opening along the side of each bottle.",
      "Poke holes on both ends of each bottle and thread the rope through to chain them vertically.",
      "Tie knots under each bottle to hold them in place.",
      "Fill with soil, plant your herbs, and hang it on a wall or balcony!",
    ],
  },
  {
    id: 5,
    title: "Bottle Cap Mosaic",
    category: "plastic",
    icon: "🎨",
    difficulty: "Medium",
    time: "40 mins",
    desc: "Create colorful wall art using collected plastic bottle caps.",
    materials: [
      "Assorted bottle caps",
      "Wooden board",
      "Strong glue",
      "Spray paint",
    ],
    steps: [
      "Sort the bottle caps by color.",
      "Sketch a simple design on the wooden board.",
      "Glue the caps following your design.",
      "Let it dry for 24 hours before hanging it.",
    ],
  },
  {
    id: 6,
    title: "Cardboard Cat House",
    category: "cardboard",
    icon: "🐱",
    difficulty: "Advanced",
    time: "60 mins",
    desc: "Build a cozy multi-level house for your cat using shipping boxes.",
    materials: ["3 large boxes", "Duct tape", "Box cutter", "Old blanket"],
    steps: [
      "Stack and cut doorways between the boxes.",
      "Tape all joints from the inside for structure.",
      "Add a soft blanket or old t-shirt inside.",
      "Decorate with non-toxic paint if desired.",
    ],
  },
  {
    id: 7,
    title: "Glass Jar Terrarium",
    category: "glass",
    icon: "🌿",
    difficulty: "Easy",
    time: "25 mins",
    desc: "Turn a used glass jar into a mini self-sustaining ecosystem.",
    materials: [
      "Glass jar",
      "Small pebbles",
      "Activated charcoal",
      "Soil",
      "Small plants",
    ],
    steps: [
      "Add a 2 cm layer of pebbles for drainage.",
      "Sprinkle a thin layer of activated charcoal.",
      "Add soil and plant your small plants.",
      "Mist with water and close the lid.",
    ],
  },
  {
    id: 8,
    title: "Paper Bead Jewelry",
    category: "cardboard",
    icon: "📿",
    difficulty: "Easy",
    time: "30 mins",
    desc: "Roll colorful magazine pages into beautiful handmade beads.",
    materials: ["Old magazines", "Wooden skewer", "Glue", "String"],
    steps: [
      "Cut long thin triangles from magazine pages.",
      "Roll each strip tightly around a skewer.",
      "Seal with glue and let dry.",
      "Thread the beads into a necklace or bracelet.",
    ],
  },
  {
    id: 9,
    title: "Upcycled Tote Bag",
    category: "plastic",
    icon: "👜",
    difficulty: "Medium",
    time: "35 mins",
    desc: "Turn an old t-shirt into a reusable shopping bag with zero sewing.",
    materials: ["Old t-shirt", "Scissors", "Fabric marker"],
    steps: [
      "Cut off the sleeves and the neckline.",
      "Cut the bottom into strips and tie them together.",
      "Turn it inside out and you're done!",
      "Decorate with a fabric marker if you like.",
    ],
  },
  {
    id: 10,
    title: "Tin Can Wind Chimes",
    category: "glass",
    icon: "🔔",
    difficulty: "Medium",
    time: "35 mins",
    desc: "Make musical wind chimes from old tin cans and string.",
    materials: [
      "5-6 clean tin cans",
      "Twine",
      "A sturdy branch",
      "Nail & hammer",
    ],
    steps: [
      "Punch a hole at the bottom of each can.",
      "Tie each can at different lengths to the branch.",
      "Hang the branch outdoors.",
      "Listen to your recycled wind chimes!",
    ],
  },
  {
    id: 11,
    title: "Plastic Bottle Bird Feeder",
    category: "plastic",
    icon: "🐦",
    difficulty: "Easy",
    time: "20 mins",
    desc: "Turn a soda bottle into a hanging bird feeder for your garden.",
    materials: [
      "1 plastic bottle",
      "Wooden spoon or perch stick",
      "String or wire",
      "Bird seeds",
    ],
    steps: [
      "Cut two small holes near the middle of the bottle for the perch.",
      "Push the wooden spoon through both holes so it sticks out on each side.",
      "Cut a small feeding opening just above the perch.",
      "Fill the bottle with bird seeds and screw the cap on.",
      "Tie a string around the neck and hang it from a branch.",
    ],
  },
  {
    id: 12,
    title: "Cardboard Piggy Bank",
    category: "cardboard",
    icon: "🐷",
    difficulty: "Medium",
    time: "40 mins",
    desc: "Build a cute piggy bank from an old shoebox and cardboard tubes.",
    materials: [
      "Shoebox",
      "2 toilet paper rolls",
      "Colored paper or paint",
      "Glue & scissors",
      "Marker",
    ],
    steps: [
      "Cut a coin slot on the top of the shoebox.",
      "Cut the toilet paper rolls in half to make the pig's legs.",
      "Glue the legs under the box and let them dry.",
      "Cover the whole box with pink paper or paint.",
      "Draw eyes and a snout with a marker to finish your piggy bank!",
    ],
  },
];

/* =========================================================
   ESTADO REACTIVO
   ========================================================= */
const activeCategory = ref("all");
const activeDifficulty = ref("all");
const searchQuery = ref("");
const sortBy = ref("default");
const onlyFavorites = ref(false);
const favorites = ref([]);
const selectedProject = ref(null);

/* =========================================================
   OPCIONES DE FILTROS
   ========================================================= */
const categories = [
  { value: "all", label: "All Projects" },
  { value: "plastic", label: "Plastic" },
  { value: "cardboard", label: "Paper & Cardboard" },
  { value: "glass", label: "Glass & Tin" },
];

const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Advanced", label: "Advanced" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "time-asc", label: "Time: Shortest first" },
  { value: "time-desc", label: "Time: Longest first" },
  { value: "difficulty", label: "By Difficulty" },
  { value: "title", label: "Alphabetical" },
];

/* =========================================================
   HELPERS
   ========================================================= */
function parseTime(t) {
  return parseInt(t, 10) || 0;
}

const difficultyOrder = { Easy: 1, Medium: 2, Advanced: 3 };

/* =========================================================
   COMPUTED PRINCIPAL
   ========================================================= */
const filteredProjects = computed(() => {
  let result = [...projects];

  if (activeCategory.value !== "all") {
    result = result.filter((p) => p.category === activeCategory.value);
  }

  if (activeDifficulty.value !== "all") {
    result = result.filter((p) => p.difficulty === activeDifficulty.value);
  }

  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q),
    );
  }

  if (onlyFavorites.value) {
    result = result.filter((p) => favorites.value.includes(p.id));
  }

  switch (sortBy.value) {
    case "time-asc":
      result.sort((a, b) => parseTime(a.time) - parseTime(b.time));
      break;
    case "time-desc":
      result.sort((a, b) => parseTime(b.time) - parseTime(a.time));
      break;
    case "difficulty":
      result.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
      );
      break;
    case "title":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
});

/* =========================================================
   ACCIONES
   ========================================================= */
function openModal(project) {
  selectedProject.value = project;
}

function closeModal() {
  selectedProject.value = null;
}

function toggleFavorite(id) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((f) => f !== id);
  } else {
    favorites.value = [...favorites.value, id];
  }
}

function isFavorite(id) {
  return favorites.value.includes(id);
}

function resetFilters() {
  activeCategory.value = "all";
  activeDifficulty.value = "all";
  searchQuery.value = "";
  sortBy.value = "default";
  onlyFavorites.value = false;
}
</script>

<template>
  <main class="handcraft-container">
    <!-- ============ Buscador y Orden ============ -->
    <section class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder=" Search crafts by name or description..."
      />
      <select v-model="sortBy" class="sort-select">
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </section>

    <!-- ============ Filtros de Categoría ============ -->
    <section class="filters-section">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="filter-btn"
        :class="{ active: activeCategory === cat.value }"
        @click="activeCategory = cat.value"
      >
        {{ cat.label }}
      </button>
    </section>

    <!-- ============ Filtros de Dificultad ============ -->
    <section class="filters-section difficulty-filters">
      <button
        v-for="d in difficulties"
        :key="d.value"
        class="filter-btn filter-btn--difficulty"
        :class="{ active: activeDifficulty === d.value }"
        @click="activeDifficulty = d.value"
      >
        {{ d.label }}
      </button>

      <button
        class="filter-btn filter-btn--fav"
        :class="{ active: onlyFavorites }"
        @click="onlyFavorites = !onlyFavorites"
      >
        {{ onlyFavorites ? "★ Favorites Only" : "☆ Favorites Only" }}
      </button>
    </section>

    <!-- ============ Info de resultados ============ -->
    <div class="results-info">
      <span>
        Showing <strong>{{ filteredProjects.length }}</strong> of
        <strong>{{ projects.length }}</strong> projects
        <span v-if="favorites.length"> · ❤️ {{ favorites.length }} saved</span>
      </span>
      <button
        v-if="
          activeCategory !== 'all' ||
          activeDifficulty !== 'all' ||
          searchQuery ||
          sortBy !== 'default' ||
          onlyFavorites
        "
        class="reset-btn"
        @click="resetFilters"
      >
        Reset filters
      </button>
    </div>

    <!-- ============ Grilla de Proyectos ============ -->
    <section class="projects-grid" id="projects-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
      >
        <div class="project-img-wrapper">
          <span>{{ project.icon }}</span>
          <span class="difficulty-tag">{{ project.difficulty }}</span>

          <button
            class="favorite-btn"
            :class="{ active: isFavorite(project.id) }"
            :title="
              isFavorite(project.id)
                ? 'Remove from favorites'
                : 'Add to favorites'
            "
            @click.stop="toggleFavorite(project.id)"
          >
            {{ isFavorite(project.id) ? "❤️" : "🤍" }}
          </button>
        </div>
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-meta">
            <span>⏱️ {{ project.time }}</span>
            <span>📦 {{ project.materials.length }} items</span>
          </div>
          <button class="view-btn" @click="openModal(project)">
            View Instructions
          </button>
        </div>
      </div>

      <!-- ============ Estado vacío ============ -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>No crafts match your filters</h3>
        <p>Try changing the category, difficulty or search term.</p>
        <button class="reset-btn" @click="resetFilters">Reset filters</button>
      </div>
    </section>
  </main>

  <!-- ============ Modal ============ -->
  <div
    class="modal-overlay"
    :class="{ active: selectedProject }"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">&times;</button>
      <div v-if="selectedProject" class="modal-body">
        <h2>{{ selectedProject.icon }} {{ selectedProject.title }}</h2>
        <p>
          <strong>Difficulty:</strong> {{ selectedProject.difficulty }} |
          <strong>Time:</strong> {{ selectedProject.time }}
        </p>

        <h4>Materials Needed:</h4>
        <ul>
          <li v-for="(m, i) in selectedProject.materials" :key="i">{{ m }}</li>
        </ul>

        <h4>Step-by-Step Instructions:</h4>
        <ol>
          <li v-for="(s, i) in selectedProject.steps" :key="i">{{ s }}</li>
        </ol>

        <button
          class="modal-fav-btn"
          :class="{ active: isFavorite(selectedProject.id) }"
          @click="toggleFavorite(selectedProject.id)"
        >
          {{
            isFavorite(selectedProject.id) ? "❤️ Saved" : "🤍 Save to favorites"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============ CSS ORIGINAL INTACTO ============ */
.handcraft-container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.filters-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 35px;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: #f0f4f1;
  border: 1px solid #c8e6c9;
  color: #2d5a27;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: #2d5a27;
  color: #ffffff;
  border-color: #2d5a27;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
}

.project-card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}

.project-img-wrapper {
  position: relative;
  height: 180px;
  background-color: #eef7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
}

.difficulty-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #2d5a27;
}

.project-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-info h3 {
  margin: 0 0 10px 0;
  color: #2d5a27;
  font-size: 1.2rem;
}

.project-info p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
  flex-grow: 1;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 15px;
}

.view-btn {
  background-color: #2d5a27;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
}

.view-btn:hover {
  background-color: #1e3d1a;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  max-width: 550px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #888;
}

.modal-close:hover {
  color: #000;
}

.modal-body h2 {
  color: #2d5a27;
  margin-top: 0;
}

.modal-body ol {
  padding-left: 20px;
  color: #444;
  line-height: 1.6;
}

.modal-body li {
  margin-bottom: 10px;
}

/* ============ NUEVAS CLASES ============ */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 220px;
  padding: 12px 18px;
  border-radius: 25px;
  border: 1px solid #c8e6c9;
  background: #ffffff;
  font-size: 0.95rem;
  color: #2d5a27;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: #2d5a27;
  box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.15);
}

.sort-select {
  padding: 12px 18px;
  border-radius: 25px;
  border: 1px solid #c8e6c9;
  background: #ffffff;
  color: #2d5a27;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.sort-select:hover {
  border-color: #2d5a27;
}

.difficulty-filters {
  margin-top: -20px;
  margin-bottom: 20px;
}

.filter-btn--difficulty {
  padding: 7px 16px;
  font-size: 0.85rem;
}

.filter-btn--fav {
  padding: 7px 16px;
  font-size: 0.85rem;
  border-style: dashed;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #556b54;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.results-info strong {
  color: #2d5a27;
}

.reset-btn {
  background: #f0f4f1;
  border: 1px solid #c8e6c9;
  color: #2d5a27;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #2d5a27;
  color: #ffffff;
  border-color: #2d5a27;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.05rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.15s ease,
    background 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.favorite-btn:hover {
  transform: scale(1.12);
  background: #ffffff;
}

.favorite-btn.active {
  background: #ffe6ea;
}

.modal-fav-btn {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #c8e6c9;
  background: #f0f4f1;
  color: #2d5a27;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-fav-btn:hover {
  background: #2d5a27;
  color: #ffffff;
}

.modal-fav-btn.active {
  background: #ffe6ea;
  border-color: #f8b7c2;
  color: #b03a52;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #556b54;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 10px;
}

.empty-state h3 {
  color: #2d5a27;
  margin: 0 0 8px 0;
}

.empty-state p {
  margin: 0 0 20px 0;
  font-size: 0.95rem;
}
</style>
