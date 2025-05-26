<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Tambahkan User</h3>
            <form @submit.prevent="tambahUser">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your name">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter your email">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" id="password"
                        placeholder="Enter your password">
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" v-model="address"
                        placeholder="Enter your address">
                </div>

                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber"
                        placeholder="Enter your phone number">
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
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
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
        tambahUser() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password,
                address: this.address,
                phoneNumber: this.phoneNumber,
            }

            const formdata = new FormData();
            formdata.append('name', data.name)
            formdata.append('email', data.email)
            formdata.append('password', data.password)
            formdata.append('address', data.address)
            formdata.append('phone_number', data.phoneNumber)
            axios
                .post('http://localhost/marketplace-api/public/api/user', formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log(response)
                    alert('Berhasil Menambahkan User')
                    router.push({ name: 'user' })
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