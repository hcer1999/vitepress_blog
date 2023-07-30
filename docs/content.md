<script setup>
import { data } from './content/data.js'
// 将data 下的items反转
data.forEach(item => {
  item.items.reverse()
})
</script>

<style src="../nav/index.scss"></style>

<CNavLinks v-for="{title, items} in data" :title="title" :items="items"/>
