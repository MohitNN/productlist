<template>
    <div>
        <form action="post" @submit.prevent="registerForm">
            <div class="form-group">
                <div :key="key" v-for="(error, key) in Object.keys(errors)" class="alert alert-danger" role="alert">
                {{errors[error][0]}}
                </div>
              <label for="name">Name</label>
              <input type="text"
                class="form-control" id="name" v-model="form.name" aria-describedby="helpId" placeholder="Enter Your Name" required>
            </div>
            <div class="form-group">
              <label for="email">Username</label>
              <input type="email"
                class="form-control" id="email" v-model="form.email" aria-describedby="helpId" placeholder="Enter Username" required>
            </div>
            <div class="form-group">
              <label for="username">Password</label>
              <input type="password"
                class="form-control" id="password" v-model="form.password" aria-describedby="helpId" placeholder="Enter Password" required>
            </div>
            <div class="form-group">
              <label for="cpassword">Confirm Password</label>
              <input type="password"
                class="form-control" v-model="form.password_confirmation" id="password_confirmation" aria-describedby="helpId" placeholder="Enter Confirm Password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
export default {
   name: 'Register',
   data(){
       return{
           form:{
               email : '',
               name : '',
               password : '',
               password_confirmation : '',
           },
           errors : []
       }
   },
   methods:{
       ...mapActions('auth',['register']),
       registerForm(){
           this.register(this.form)
           .then((resp)=>{
               console.log(resp);
               if(resp){
                   this.$toast.success("Register Successfuly");
                   this.$router.push({name:'login'})
               }
           }).catch((error) => {
               console.log(error.response)
               if (error.response.status == 400 && error.response.data.message){
                    this.errors =  error.response.data.message
               }
           }) ;
       }
   }
};
</script>
