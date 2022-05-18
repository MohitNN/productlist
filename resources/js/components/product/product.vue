<template>
<div>
    <h3 class="text-center mb-4">PRODUCTS LIST</h3>
    <form action="post" v-debounce:500ms="search" :debounce-events="['keyup']">
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="form.search" placeholder="Search">
        </div>
    </form>

    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Product Auther Name</th>
                <th>Price</th>
                <th>Craeted Date</th>
            </tr>
        </thead>
        <tbody v-if="getProduct.length > 0">
            <tr v-for="(get , key) in getProduct" :key="get.key">
                <td scope="row">{{++key}}</td>
                <td>{{get.name}}</td>
                <td>{{get.auther_name}}</td>
                <td>{{get.price}}</td>
                <td>{{get.created_at | moment("MM-DD-YYYY") }}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="5" class="text-center"><h3>Data Not Found...!</h3></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
export default {
    name: 'Product',
    data(){
        return{
            form:{
                search : '',
            }
        }
    },
    computed: {
        ...mapState('auth', ['user']),
        ...mapGetters({
            getProduct: "auth/getProduct",
            getSearchProduct: "auth/getSearchProduct",
        }),
    },
    created() {
        this.search();
    },
    methods: {
        ...mapActions({
            getAllProduct: "auth/product",
            getAllSearchProduct: "auth/searchProduct",
        }),
        search(){
            this.getAllProduct(this.form.search)
            .then((resp)=>{
           })
        }
    }
}
</script>
