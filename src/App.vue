<template>
  <div id="app" class="container">
    <notifications/>
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/layouts/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>
