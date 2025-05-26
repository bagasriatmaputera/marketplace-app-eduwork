<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Tambahkan Kategori</h3>
            <form @submit.prevent="tambahKategori">
                <div class="mb-3">
                    <label for="name" class="form-label">Kode</label>
                    <input type="text" class="form-control" id="code" v-model="code" placeholder="Enter your code">
                </div>

                <div class="mb-3">
                    <label for="name" class="form-label">Nama Kategori</label>
                    <input type="text" class="form-control" v-model="name" id="name"
                        placeholder="Enter your name of category">
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
        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }
    },
    methods: {
        tambahKategori() {
            let data = {
                name: this.name,
                code: this.code,
            }

            const formdata = new FormData();
            formdata.append('name', data.name)
            formdata.append('code', data.code)
            axios
                .post('http://localhost/marketplace-api/public/api/category', formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log(response)
                    alert('Berhasil Menambahkan category')
                    router.push({ name: 'category' })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
}
</script>
<style lang="">

</style>