<template>
    <div class="mt-2">
        <div class="card-name d-flex" v-if="!user">
            <router-link :to="{ name: 'login' }">
            <button class="btn btn-primary mr-3">Log In</button>
            </router-link>
            <router-link :to="{ name: 'signup' }">
            <button class="btn btn-primary">Sign Up</button>
            </router-link>
        </div>

        <div class="card-name d-flex" v-else>
            <button v-if="$route.name != '404'" class="btn btn-primary mr-3">{{ userData ? userData.name : 'User' }}</button>
            <button v-if="$route.name != '404'" class="btn btn-primary" @click="logout">Log Out</button>
        </div>
        <div class="container mt-4">
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
import { mapActions,mapGetters,mapState} from "vuex";
export default {
    name:'Dashboard',
    computed:{
        ...mapState('auth',['user']),
        userData() {
            if(this.user) {
                return JSON.parse(this.user)
            }
        }
    },
    methods:{
        ...mapActions({
            logoutData: "auth/logout",
        }),
        logout(){
            this.logoutData()
            .then((resp)=>{
               if(resp.data.status == true){
                   this.$toast.success("Logout Successfuly");
                   this.$router.push({name:'login'})
               }
           })
        }
    }
}
</script>

<style>
.card-name{
    justify-content: center;
}
</style>
