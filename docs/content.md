<script setup>
import data from './content/data'

// let { title } = data
let title = data[0].title + '[' +  data[0].items.length + ']'
</script>

<style src="../nav/index.scss"></style>

<CNavLinks v-for="{ items} in data" :title="title" :items="items"/>
