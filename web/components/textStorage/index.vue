<template>
  <div class="textStorage">
    <div class="top">
      <van-nav-bar title="临时存储区">
        <van-icon
          v-if="active === 0"
          slot="right"
          name="plus"
          size="20"
          color="#ee0a24"
          @click="handleAdd"
        />
      </van-nav-bar>
      <van-tabs v-if="!isFromSmartphone" v-model="active">
        <van-tab>
          <template #title> <van-icon name="orders-o" /> 列表 </template>
        </van-tab>
        <van-tab>
          <template #title> <van-icon name="records" /> 存储区 </template>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon name="user-o" /> {{ username }}
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="main-content">
      <List
        v-if="active === 0"
        :handle-change-active-tab="handleChangeActiveTab"
      />
      <Storage v-if="active === 1" :storage-name-from-list="storageName" />
      <User v-if="active === 2" />
    </div>
    <van-tabbar v-if="isFromSmartphone" v-model="active">
      <van-tabbar-item icon="orders-o"> 列表 </van-tabbar-item>
      <van-tabbar-item icon="records"> 存储区 </van-tabbar-item>
      <van-tabbar-item icon="user-o">
        {{ username }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Storage from "./TStorage";
import List from "./list";
import User from "./user";

export default {
  name: "TextStorage",
  components: {
    Storage,
    List,
    User,
  },
  data() {
    return {
      isFromSmartphone: this.$ua?.isFromSmartphone(),
      active: 1,
      storageName: "",
    };
  },
  computed: {
    username() {
      return this.$store?.state?.user?.username || "游客";
    },
  },
  watch: {
    username(val, oldVal) {
      if (val !== oldVal) {
        this.storageName = "";
      }
    },
  },
  methods: {
    handleChangeActiveTab(active, storageName) {
      this.active = active;
      this.storageName = storageName;
    },
    handleAdd() {
      this.handleChangeActiveTab(1, "add");
    },
  },
};
</script>

<style>
.textStorage {
  margin: 0 auto;
  max-width: 1024px;
  border-left: 1px solid #ebedf0;
  border-right: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
}
.textStorage .van-tab__text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.textStorage + footer {
  display: none;
}
.textStorage .top {
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 1000;
}
.textStorage .main-content {
  padding-bottom: 50px;
}
</style>
