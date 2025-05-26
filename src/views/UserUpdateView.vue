<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>Edit User</h3>
            <form @submit.prevent="updateUser">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="users.name"
                        placeholder="Enter your new or the same name">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="users.email" id="email"
                        placeholder="Enter your new or the same email">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="users.password" id="password"
                        placeholder="Enter your new or the same password">
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" v-model="users.address"
                        placeholder="Enter your new or the same address">
                </div>

                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phoneNumber" v-model="users.phone_number"
                        placeholder="Enter your new or the same phone number">
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
            userId: '',
            users: ''
        }
    },
    mounted() {
        // mengambil user id 
        // console.log(this.$route.params.userId)
        // taruh userid di data userId
        this.userId = this.$route.params.userId
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }

        //buat get user untuk value update
        this.getUsers()
    },
    methods: {
        getUsers() {
            axios
                .get('http://localhost/marketplace-api/public/api/user/' + this.userId, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    //taruh value user dengan id di users
                    console.log(response.data.data)
                    this.users = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updateUser() {

            const formdata = new FormData();
            //sebelumnya sudah dibungkun users maka disni wajib this.users.name
            formdata.append('name', this.users.name)
            formdata.append('email', this.users.email)
            formdata.append('password', this.users.password)
            formdata.append('address', this.users.address)
            formdata.append('phone_number', this.users.phone_number)
            formdata.append("_method", "put");

            axios
                .post('http://localhost/marketplace-api/public/api/user/' + this.userId, formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => {
                    console.log(response)
                    alert('Berhasil Mengubah User')
                    router.push({ name: 'user' })
                })
                .catch(function (error) {
                    //meberikan alert jika error sesuai response error
                    alert(error.response.data.message)
                    console.log(error)
                })
        }
    }
}
</script>
<style lang="">

</style>