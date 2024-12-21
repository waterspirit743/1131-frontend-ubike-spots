<script setup lang="ts"></script>

<template>
  <main class="home-view">
    <img src="@/assets/logo.png" alt="logo" class="banner" />
    <div class="links-wrapper">
      <RouterLink class="nav-link" to="/spots">Spots</RouterLink>
      <RouterLink class="nav-link" to="/about">About</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.home-view {
  padding: 6rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px rgba(255, 255, 255, 0.6) solid;
  border-radius: 0.25rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.banner {
  height: 10vh;
}

.links-wrapper {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  padding: 1rem 2rem;
  border: 1px #fff solid;
  border-radius: 0.5rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link:active {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
