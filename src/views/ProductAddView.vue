<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Tambahkan Product</h3>
            <form @submit.prevent="tambahProduct">
                <div class="mb-3">
                    <label for="name" class="form-label">Name Product</label>
                    <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your product">
                </div>

                <div class="mb-3">
                    <label for="kode" class="form-label">Kode Product</label>
                    <input type="text" class="form-control" v-model="kode" id="kode"
                        placeholder="Enter your product code">
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <!-- @click hanya menangkap saat input diklik, bukan saat file dipilih.
                            @change digunakan untuk menangani perubahan nilai input, termasuk ketika file dipilih — inilah yang -->
                    <input type="file" class="form-control" @change="imageChange" id="image"
                        placeholder="Enter your Image">
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select v-model="category" class="form-select">
                        <option disabled value="">-- Choose Category --</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" v-model="price" placeholder="Enter your price">
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
            kode: '',
            category: '',
            price: '',
            categories: '',
            image: ''
        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }
        this.getCategory()
    },
    methods: {
        getCategory() {
            axios
                .get('http://localhost/marketplace-api/public/api/category', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    // console.log(response)
                    this.categories = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        tambahProduct() {
            let data = {
                name: this.name,
                code: this.kode,
                category_id: this.category,
                price: this.price,
                image: this.image,
            }

            const formdata = new FormData();
            formdata.append('name', data.name)
            formdata.append('code', data.code.toUpperCase())
            formdata.append('category_id', data.category_id)
            formdata.append('price', data.price)
            formdata.append('image_file', data.image)
            axios
                .post('http://localhost/marketplace-api/public/api/product', formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log(response)
                    alert('Berhasil Menambahkan product')
                    router.push({ name: 'product' })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        imageChange(e) {
            let file = e.target.files[0];
            this.image = file
        }
    }
}
</script>
<style lang="">

</style>