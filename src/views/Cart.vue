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
            Cart
          </li>
        </ol>
      </nav>
    </div>

    <h2 class="mt-3 mb-3">Cart</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center" scope="col">#</th>
            <th class="text-center" scope="col">Foto</th>
            <th class="text-center" scope="col">Makanan</th>
            <th class="text-center" scope="col">Keterangan</th>
            <th class="text-center" scope="col">Jumlah</th>
            <th class="text-center" scope="col">Harga</th>
            <th class="text-center" scope="col">Total Harga</th>
            <th class="text-center" scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in data" :key="product.id">
            <td>{{ setNumber(index) }}</td>
            <td>
              <img
                :src="`../assets/${product.product.gambar}`"
                class="img-fluid rounded"
                width="250"
              />
            </td>
            <td class="font-weight-bold text-center">{{ product.product.nama }}</td>
            <td>{{ product.note ? product.note : '-' }}</td>
            <td>{{ product.qty }}</td>
            <td align="right">{{ formatNumber(product.product.harga) }}</td>
            <td align="right">{{ formatNumber(product.qty * product.product.harga) }}</td>
            <td align="center">
              <button @click="removeProduct(product.id, index)" class="btn btn-sm btn-danger">
                <b-icon-trash></b-icon-trash>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="7" align="right" class="font-weight-bold">Grandtotal</td>
            <td>{{ formatNumber(grandTotal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/layouts/Navbar.vue";
import axios from "axios";
export default {
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      total_qty: 0
    };
  },
  methods: {
    setProduct(data) {
      this.data = data;
    },
    getCart() {
      axios
        .get("http://localhost:3000/cart")
        .then((res) => {
          this.setProduct(res.data);
        })
        .catch((err) => console.log(err));
    },
    removeProduct(productId, idx) {
      axios
        .delete(`http://localhost:3000/cart/${productId}`)
        .then(() => {
          this.data.splice(idx, 1)
          this.total_qty = this.data.length

          this.$notify('Berhasil menghapus dari keranjang')
        })
        .catch((err) => console.log(err))
    },
    setNumber(number) {
      return number = number + 1
    }
  },
  mounted() {
    this.getCart();
  },
  computed: {
    grandTotal() {
      return this.data.reduce(function (item, val) {
        return item+(val.product.harga*val.qty)
      }, 0)
    }
  },
};
</script>
