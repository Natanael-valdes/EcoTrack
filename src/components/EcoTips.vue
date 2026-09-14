<template>
  <!-- Sección de Eco-Tips -->
  <section class="tips-section">
    <h2>Quick Eco-Tips for Crafting</h2>
    <div class="tips-grid">
      <div class="tip-card">
        <span class="tip-icon">🧼</span>
        <h3>Clean Waste First</h3>
        <p>
          Always wash bottles, cans, and containers thoroughly before reuse to
          avoid bad odors or mold.
        </p>
      </div>
      <div class="tip-card">
        <span class="tip-icon">✂️</span>
        <h3>Safety First</h3>
        <p>
          Use child-safe scissors for paper and get adult assistance when
          cutting thick plastic or metal edges.
        </p>
      </div>
      <div class="tip-card">
        <span class="tip-icon">🎨</span>
        <h3>Eco-Friendly Paints</h3>
        <p>
          Use water-based acrylic paints instead of solvent-based sprays to
          reduce harmful fumes.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Sección de Tips */
.tips-section {
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 40px;
}

.tips-section h2 {
  text-align: center;
  color: #2d5a27;
  margin-top: 0;
  margin-bottom: 25px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.tip-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  text-align: center;
}

.tip-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 10px;
}

.tip-card h3 {
  margin: 0 0 8px 0;
  color: #2d5a27;
}

.tip-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
