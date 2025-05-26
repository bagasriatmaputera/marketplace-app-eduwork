<template>
    <NavBar :name="userName" />
    <div class="container-fluid d-flex justify-content-center">
        <div class="col-8">
            <h3>List User At B MarketPlace</h3>
            <a href="/user/user-add" class="btn btn-success">Tambah Users</a>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>Nomor Telp</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody v-for="(user, index) in users" :key="index">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.address }}</td>
                        <td>{{ user.phone_number }}</td>
                        <td><router-link :to="{
                            name: 'userUpdate',
                            params: { userId: user.id },
                        }" class="btn btn-warning">Edit</router-link> || <button @click="deleteUser(user.id)"
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
            users: []
        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == null) {
            alert('Cannot access this page, plase login first')
            router.push({ name: 'login' })
        }
        this.getUsers()
    },
    methods: {
        getUsers() {
            axios
                .get('http://localhost/marketplace-api/public/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.users = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                    if (error.status == 401) {
                        alert('Silahkan Login Ulang')
                        router.push({ name: 'login' })
                    }
                })
        },
        //delete method
        deleteUser(id) {
            if (confirm("Yakin ingin menghapus user ini?")) {
                axios
                    .delete(`http://localhost/marketplace-api/public/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then((response) => {
                        alert("User berhasil dihapus");
                        this.getUsers(); // refresh list user
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Gagal menghapus user");
                    });
            }
        }
    }
}
</script>
<style lang="">

</style>