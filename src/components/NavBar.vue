<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">B MarketPlace</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user">User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/product">Product</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/category">Category</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="logout()">Logout</a>
                    </li>
                </ul>
                <li class="d-flex">
                    <span>Hi, {{ name }}</span>
                </li>
            </div>
        </div>
    </nav>
</template>
<script>
import axios from 'axios'
import router from '@/router'
export default {
    props: ['name'],
    methods: {
        logout() {
            axios
                .get('http://localhost/marketplace-api/public/api/auth/logout', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log('Logout berhasil:', response.data)
                    // Hapus token dari localStorage
                    localStorage.removeItem('token')
                    localStorage.removeItem('name')
                    localStorage.removeItem('email')
                    // Redirect ke halaman login
                    router.push({ name: 'login' })
                })
                .catch((error) => {
                    console.error('Terjadi kesalahan saat logout:', error)
                })
        },
    },
}
</script>
<style lang=""></style>
