<template>
    <div class="main">
        <form action="post" @submit.prevent="loginForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="email"
                class="form-control" v-model="form.email" id="email" aria-describedby="helpId" placeholder="Enter Username" required>
            </div>
            <div class="form-group">
              <label for="username">Password</label>
              <input type="password"
                class="form-control" v-model="form.password" id="password" aria-describedby="helpId" placeholder="Enter Password" required>
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
   name: 'Login',
   data(){
       return{
           form:{
                email : '',
                password : ''
           }
       }
   },
   methods:{
       ...mapActions('auth',['login']),
       loginForm(){
           this.login(this.form)
           .then((resp)=>{
               if(resp.data.status == true){
                   this.$toast.success("Login Successfuly");
                   this.$router.push({name:'product'})
               }
           })
           .catch((errors) => {
               console.log(errors.response.data.message);
            if(errors.response.status != 200){
              var msg = errors.response.data.message;
              this.$toast.error(msg);
            }
           })
       }
   }
};
</script>
