<template>
  <div class="hello">
    <ul>
      <li v-for="item in links" :key="item.id">
        <a :href="item.href" target="_blank" rel="noopener">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      links: [
        { id: '1', href: 'http://code-craft.greatwebtech.cn/', text: 'code-craft' },
        { id: '2', href: 'http://table.greatwebtech.cn/', text: 'table' },
        { id: '3', href: 'http://birthday.greatwebtech.cn/', text: 'birthday' },
        { id: '4', href: 'http://cmd.greatwebtech.cn/', text: 'cmd' },
        { id: '5', href: 'http://family.greatwebtech.cn/', text: 'family' },
        { id: '6', href: 'http://handsontable.greatwebtech.cn/', text: 'handsontable' }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
