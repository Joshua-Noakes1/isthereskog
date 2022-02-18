<script lang="ts">
  import Navbar from "./components/Navbar.svelte"
  import Card from "./components/Card.svelte"
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</svelte:head>

<main>
  <Navbar />
  <div style="margin: 10px 0 10px 0;"></div>
  <Card />
</main>

<style>
  :root {
    background-color: #7F7D9C;
  }
</style>