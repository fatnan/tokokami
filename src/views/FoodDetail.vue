<template>
  <div>
    <Navbar :total="this.total_qty" />

    <div class="header mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/foods">Foods</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.nama }}
          </li>
        </ol>
      </nav>
    </div>
    <div class="content">
      <div class="row">
        <div class="col-md-6">
          <img :src="`../assets/${product.gambar}`" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <h4>
            Harga: <strong>{{ formatNumber(product.harga) }}</strong>
          </h4>

					<form v-on:submit.prevent="">
						<div class="form-group">
							<label for="jumlah" class="control-label">Jumlah</label>
							<input type="number" class="form-control" min="1" id="jumlah" placeholder="Jumlah Pesanan" v-model="cart.qty" required />
						</div>
						<div class="form-group">
							<label for="keterangan">Keterangan</label>
							<textarea class="form-control" id="keterangan" cols="5" rows="3" v-model="cart.note" placeholder="Keterangan (cth: Pedas)"></textarea>
						</div>
						<button class="btn btn-success" @click="addToCart"><b-icon-cart class="mr-2"></b-icon-cart> Pesan</button>
					</form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/layouts/Navbar.vue";
import axios from "axios";

export default {
  name: "FoodDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
			cart: {},
			total_qty: 0,
      total_product: 0
    };
  },
  methods: {
    setProduct(data) {
      this.product = data.data;
    },
    getProducts() {
        let url = "http://localhost:3000/cart"

        axios
            .get(url)
            .then((res) => this.total_product = res.data.length)
            .catch((err) => console.log(err));
    },
    getProduct() {
      axios
        .get(`http://localhost:3000/products/${this.$route.params.id}`)
        .then((res) => this.setProduct(res))
        .catch((err) => console.log(err));
    },
		addToCart() {
      this.getProducts()
			if (this.cart.qty) {
				this.cart.product = this.product

				return axios
					.post("http://localhost:3000/cart", this.cart)
					.then(() => {
						this.total_qty = this.total_product + 1
						
						this.$notify('Berhasil memasukan ke keranjang')
					})
					.catch((err) => console.log(err))
			}

			return this.$notify('Jumlah pesanan harus diisi')
		}
  },
  mounted() {
    this.getProduct();
  },
};
</script>
