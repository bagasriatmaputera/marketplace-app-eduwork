<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-10">
            <h3>List Product</h3>
            <a href="/product/product-add" class="btn btn-success">Tambah Produk</a>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Image</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody v-for="(product, index) in products" :key="index">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>
                            <img v-if="product.image" :src="url + product.image" alt=""
                                style="height: 50px; width: 50px; object-fit: cover;">
                            <img v-else src="/src/assets/no image.jpg" alt=""
                                style="height: 50px; width: 50px; object-fit: cover;">
                        </td>
                        <td>{{ product.category_id }}</td>
                        <td>Rp.{{ product.price }}</td>
                        <td>
                            <router-link :to="{
                                name: 'productUpdate',
                                params: { productId: product.id },
                            }" class="btn btn-warning">Edit</router-link> || <button @click="deleteProduct(product.id)"
                                class="btn btn-danger">Delete</button>

                        </td>
                    </tr>
                </tbody>
            </table>
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
            products: [],
            url: 'http://localhost/marketplace-api/public/storage/items/'


        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }
        this.getProducts()
    },
    methods: {
        getProducts() {
            axios
                .get('http://localhost/marketplace-api/public/api/product', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.products = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                    if (error.status == 401) {
                        alert('Silahkan Login Ulang')
                        router.push({ name: 'login' })
                    }
                })
        },
        deleteProduct(id) {
            if (confirm('Yakin ingin menghapus?')) {
                axios
                    .delete(`http://localhost/marketplace-api/public/api/product/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then((response) => {
                        alert("product berhasil dihapus");
                        this.getProducts(); // refresh list user
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Gagal menghapus product");
                    });
            }
        }
    }

}
</script>
<style lang="">

</style>