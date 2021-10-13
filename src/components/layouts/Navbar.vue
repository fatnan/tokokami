<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Emameun!</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/foods">Foods</router-link>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">
            Cart
            <b-icon-bag></b-icon-bag>
            <span class="badge badge-success ml-2" v-bind:total="total">{{ this.total ? this.total : this.data }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: "navbar",
  props: ["total"],
  data() {
    return {
      data: 0
    }
  },
  methods: {
    setData(data) {
      this.data = data
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/cart")
      .then((res) => {
        this.setData(res.data.length)
      })
      .catch((err) => console.log(err))
  },
};
</script>

<style>
</style>