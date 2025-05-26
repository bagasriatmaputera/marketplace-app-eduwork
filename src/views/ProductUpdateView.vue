<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Edit Product</h3>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="name" class="form-label">Nama</label>
                    <input type="text" class="form-control" id="name" v-model="products.name"
                        placeholder="Enter your new or the same name">
                </div>

                <div class="mb-3">
                    <label for="kode" class="form-label">Kode Produk</label>
                    <input type="text" class="form-control" v-model="products.code" id="kode"
                        placeholder="Enter your new or the same Code">
                </div>

                <div class="mb-3">
                    <label for="kategori" class="form-label">Pilih Kategory</label>
                    <select v-model="products.category_id" class="form-select">
                        <option disabled value="">-- Choose Category --</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="imageNow" class="form-label">Gambar saat ini</label><br>
                    <img :src="url + products.image" width="120px" height="80px" class="object-fit-cover">
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">Pilih Gambar</label>
                    <input type="file" class="form-control" id="image" @change="imageFile" placeholder="pilih gambar">
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label">Harga</label>
                    <input type="nunmber" class="form-control" id="price" v-model="products.price"
                        placeholder="Enter your new or the same price">
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
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
            name: '',
            code: '',
            image: '',
            price: '',
            phoneNumber: '',
            productId: '',
            products: {},
            url: 'http://localhost/marketplace-api/public/storage/items/',
            categories: ''

        }
    },
    mounted() {
        // mengambil user id 
        // console.log(this.$route.params.productId)
        // taruh userid di data userId
        this.productId = this.$route.params.productId
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }

        //buat get product untuk value update
        this.getProduct()
        //getCategory untuk value option kategori
        this.getCategory()
    },
    methods: {
        getCategory() {
            axios
                .get('http://localhost/marketplace-api/public/api/category', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    // console.log(response)
                    this.categories = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        getProduct() {
            axios
                .get('http://localhost/marketplace-api/public/api/product/' + this.productId, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    //taruh value user dengan id di users
                    // console.log(response.data.data)
                    this.products = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updateProduct() {

            const formdata = new FormData();
            //sebelumnya sudah dibungkus users maka disni wajib this.users.name
            formdata.append('name', this.products.name)
            formdata.append('code', this.products.code)
            formdata.append('category_id', this.products.category_id)
            formdata.append('image_file', this.image)
            formdata.append('price', this.products.price)
            formdata.append("_method", "put");

            axios
                .post('http://localhost/marketplace-api/public/api/product/' + this.productId, formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log(response)
                    alert('Berhasil Mengubah Product')
                    router.push({ name: 'product' })
                })
                .catch(function (error) {
                    //meberikan alert jika error sesuai response error
                    alert(error.response.data.message)
                    console.log(error)
                })
        },
        imageFile(e) {
            let data = e.target.files[0];
            this.image = data
        }
    }
}
</script>
<style lang="">

</style>