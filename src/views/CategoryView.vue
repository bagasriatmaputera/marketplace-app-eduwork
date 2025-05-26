<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>List Category At B MarketPlace</h3>
            <a href="/category/category-add" class="btn btn-success">Tambah Kategori</a>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama Kategori</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody v-for="(category, index) in categories" :key="index">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ category.code }}</td>
                        <td>{{ category.name }}</td>
                        <td><router-link :to="{
                            name: 'categoryUpdate',
                            params: { categoryId: category.id },
                        }" class="btn btn-warning">Edit</router-link> || <button @click="deleteCategory(category.id)"
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
import router from '@/router'
import axios from 'axios'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            categories: []
        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }
        this.getCategories()
    },
    methods: {
        getCategories() {
            axios
                .get('http://localhost/marketplace-api/public/api/category', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.categories = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        //delete method
        deleteCategory(id) {
            if (confirm("Yakin ingin menghapus kategori ini?")) {
                axios
                    .delete(`http://localhost/marketplace-api/public/api/category/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then((response) => {
                        alert("Kategori berhasil dihapus");
                        this.getCategories(); // refresh list user
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Gagal menghapus kategori");
                    });
            }
        }
    }
}
</script>
<style lang="">

</style>