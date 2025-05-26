<template>
  <div>
    <NavBar :name="userName" />
    <h3 class="text-center">Welcome, {{ userName }}</h3>
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-12 col-sm-8 mb-2">
          <!-- Search Product -->
          <div class="col-12 mb-2 mt-2">
            <input class="form-control" type="text" v-model="keywords" placeholder="Search Product"
              :onchange="searchProduct()">
          </div>
          <hr>
          <!-- List Product -->
          <div class="col-12">
            <div class="row">
              <div v-for="(product, index) in filteredProducts" :key="index"
                class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 ">
                <div class="card">
                  <img :src="url + product.image" class="card-img-top object-fit-cover" height="165px" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-center">{{ product.name }}</h5>
                    <p class="card-text text-center">{{ `Rp.${product.price} ` }}</p>
                    <div class="d-flex justify-content-center">
                      <!-- ambil id dari btn dan mencegah reload dengan . prevent -->
                      <a href="" @click.prevent="pilihBtn(product.id)" class="btn btn-success">Beli</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- list choose -->
        <div class="col-12 col-sm-4 mb-2 mb-3 bordered">
          <div class="col-12">
            <h3>List Pilih</h3>
            <hr>
            <div v-for="(order, index) in orders" :key="index">
              <div class="d-flex justify-content-between">
                <span>{{ order.name }} (x){{ order.qty }}</span>
                <span>{{ `Rp.${order.price}` }}</span>
              </div>
              <div style="font-size: smaller;" class="text-muted">
                {{ `Rp.${order.originalPrice}` }}
              </div>
              <div class="button">
                <button class="btn btn-sm btn-outline-warning me-2" @click="decreaseQty(order)">-</button>
                <button class="btn btn-sm btn-outline-success me-2" @click="increaseQty(order)">+</button>
                <button class="btn btn-sm btn-outline-danger me-2" @click="deleteOrder(order)">delete</button>
              </div>

            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <span style="font-size: large; font-weight: 600;">Total</span>
              <span style="font-size: large; font-weight: 600;">{{ `Rp.${totalHarga}` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import router from '@/router'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      userName: '',
      keywords: '',
      products: [],
      filteredProducts: [],
      orders: [],
      url: 'http://localhost/marketplace-api/public/storage/items/',
      total: 0
    }
  },
  mounted() {
    this.userName = localStorage.getItem('name')
    if (!this.userName || this.userName == null) {
      alert('Cannot access this page, plase login first')
      router.push({ name: 'login' })
    }
    this.getProduct()
  },
  computed: {
    totalHarga() {
      return this.orders.reduce((total, order) => total + order.price, 0)
    }
  },
  methods: {
    pilihBtn(id) {
      // ambil object dari array filteredProducts
      let pilih = this.filteredProducts.filter(product => product.id == id)[0]
      // ambil object
      let produk = Object.assign({}, pilih)
      produk.originalPrice = pilih.price
      //ambil dan maping index array untuk logika qty
      let indexArray = this.orders.map(e => e.id).indexOf(produk.id)
      //logika dan penambahan qty pada object variabel products
      if (indexArray != -1) {
        this.orders[indexArray].qty++
        this.orders[indexArray].price = this.orders[indexArray].originalPrice * this.orders[indexArray].qty
      } else {
        produk.qty = 1
        this.orders.push(produk)
      }

      // ambil pricenya saja
      let orderPrice = this.orders.map(order => order.price)
      let hargaAwal = 0
      //terus ditambah apabila data price masuk
      orderPrice.forEach(price => {
        hargaAwal += price
      })
      this.total = hargaAwal
    },
    getProduct() {
      axios
        .get('http://localhost/marketplace-api/public/api/product', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          // console.log(response)
          this.products = response.data.data
        })
        .catch(function (error) {
          console.log(error.status)
          if (error.status == 401) {
            alert('Silahkan Login Ulang')
            router.push({ name: 'login' })
          }
        })
    },
    searchProduct() {
      //memfilter data product dan mengandung item dari keywprds
      this.filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(this.keywords.toLowerCase()))
    },
    decreaseQty(item) {
      let indexArray = this.orders.map(e => e.id).indexOf(item.id)
      if (this.orders[indexArray].qty > 1) {
        this.orders[indexArray].qty--
        this.orders[indexArray].price = this.orders[indexArray].originalPrice * this.orders[indexArray].qty
      } else {
        this.orders.splice(indexArray, 1)
      }
    },
    increaseQty(item) {
      let indexArray = this.orders.map(e => e.id).indexOf(item.id)
      this.orders[indexArray].qty++
      this.orders[indexArray].price = this.orders[indexArray].originalPrice * this.orders[indexArray].qty
    },
    deleteOrder(item) {
      let arrayIndex = this.orders.map(e => e.id).indexOf(item.id)
      this.orders.splice(arrayIndex, 1)
    }
  }
}
</script>
<style lang="">

</style>