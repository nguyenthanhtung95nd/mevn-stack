<template>
  <div id="custom-home">
    <Jumbotron />
  </div>
</template>

<script>
// @ is an alias to /src
import Jumbotron from "@/components/Jumbotron.vue";

export default {
  name: "Home",
  components: {
    Jumbotron,
  },
};
</script>
