<template>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">電影名: {{ movie.title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body px-5">
                <div class="row">
                    <!-- <button v-for="item in blackIdList" :key="item" type="button" class="btn btn-light my-1 w-100  position-relative">
                    {{ item }}
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-2"
                            @click="deleteItem(item)">
                        X
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </button> -->
                    <p>上映日期: {{ movie.release_date }}</p>
                    <p>人氣: {{ movie.popularity }}</p>
                    <p>平均分數: {{ movie.vote_average }}</p>
                    <p>投票數: {{ movie.vote_count }}</p>
                    <p>{{ movie.overview }}</p>
                </div>
                <button type="button" class="btn btn-primary mx-2">加入清單</button>
                <button type="button" class="btn btn-primary mx-2">去訂位!</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: "Modal",
    data() {
        return {
        }
    },
    props: {
        movie: {
            type: Object,
            default: {},
        }
    },
    mounted() {
        // console.log(movie)
    },
    methods: {
        // deleteItem(item) {
        //     this.$emit("deleteItem", item);
        // }
    }
}
</script>

<style>

</style>