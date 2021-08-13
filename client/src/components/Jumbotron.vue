<template>
  <div class="jumbotron">
    <h1 class="display-4">MEVN Stack Book Manager</h1>
    <p class="lead">
      This is a sample task manager application, built with MongoDB, ExpressJS, VueJS, and NodeJS technologies.
    </p>
    <hr class="my-4" />
    <p>
      Click below to begin managing books for users.
    </p>
    <router-link class="btn btn-success btn-lg" to="/book">
     View Books
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>