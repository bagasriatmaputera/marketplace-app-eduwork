<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Update Kategori</h3>
            <form @submit.prevent="updateKategori">
                <div class="mb-3">
                    <label for="name" class="form-label">Kode</label>
                    <input type="text" class="form-control" id="code" v-model="categories.code"
                        placeholder="Enter your code">
                </div>

                <div class="mb-3">
                    <label for="name" class="form-label">Nama Kategori</label>
                    <input type="text" class="form-control" v-model="categories.name" id="name"
                        placeholder="Enter your name of category">
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import router from '@/router';
export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            code: '',
            name: '',
            categoryId: '',
            categories: ''
        }
    },
    mounted() {
        //console.log(this.$route.params)
        this.categoryId = this.$route.params.categoryId
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName === '' || this.userName == null) {
            alert('Youre not authentication, Login first!')
            router.push({ name: 'login' })
        }
        this.getCategory()
    },
    methods: {
        getCategory() {
            axios
                .get('http://localhost/marketplace-api/public/api/category/' + this.categoryId, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    //taruh value category dengan id di categories
                    // console.log(response.data.data)
                    this.categories = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updateKategori() {
            if (confirm('Yakin ingin mengubah?')) {
                const formData = new FormData()
                //sebelumnya sudah dibungkun categoris maka disni wajib this.categories.code
                formData.append('code', this.categories.code)
                formData.append('name', this.categories.name)
                formData.append("_method", "put");


                axios
                    .post('http://localhost/marketplace-api/public/api/category/' + this.categoryId, formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then((response) => {
                        console.log(response)
                        alert('Berhasil Mengubah User')
                        router.push({ name: 'category' })
                    })
                    .catch(function (error) {
                        alert(error.response.data.message)
                        console.log(error)
                    })
            }
        }
    }
}
</script>
<style lang="">

</style>