<template>
    <div id="app">
        {{text}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '555'
            }
        },
    }
</script>

<style scoped>
    #app {
        color: red;
    }
</style>