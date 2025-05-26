<template>
	<div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="card shadow-lg p-4" style="min-width: 350px;">
			<h3 class="text-center mb-4">Welcome Back</h3>
			<form id="loginForm" @submit.prevent="login">
				<div class="mb-3">
					<label for="email" class="form-label">Email address</label>
					<input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required>
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required>
				</div>
				<button type="submit" class="btn btn-primary w-100">Login</button>
			</form>
		</div>
	</div>
</template>
<script>
import router from '@/router'
import axios from 'axios'
import { errorMessages } from 'vue/compiler-sfc'
export default {
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		login() {
			axios
				.post('http://localhost/marketplace-api/public/api/auth/login', {
					email: this.email,
					password: this.password
				},
				)
				.then((response) => {
					console.log(response)
					localStorage.setItem('name', response.data.data.name)
					localStorage.setItem('token', response.data.data.tokens)
					router.push({ name: 'home' })
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	}
}
</script>
<style></style>