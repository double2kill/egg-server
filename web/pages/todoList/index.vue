<template>
  <TodoListPage />
</template>

<script>
import TodoListPage from '~/components/todoList'
import head from '@/utils/getHead'

export default {
  components: {
    TodoListPage
  },
  head
}
</script>
