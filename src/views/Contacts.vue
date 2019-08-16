<template>
    <div class="Contacts">
      <!-- 联系人列表 -->
      <van-contact-list
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
      <!-- 联系人编辑 -->
      <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"
        />
      </van-popup>
    </div>
</template>

<script>
import { ContactList, ContactEdit, Popup, Toast } from 'vant'
export default {
  name: 'Contacts',
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data () {
    return {
      list: [],
      showEdit: false,
      isEdit: false,
      editingContact: {},
      instance: null // axios 实例
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取联系人列表
    async getList () {
      let res = await
      this.$Http.getContactList()
      this.list = res.data
    },

    // 添加联系人
    onAdd () {
      this.editingContact = { id: this.list.length }
      this.isEdit = false
      this.showEdit = true
    },

    // 编辑联系人
    onEdit (item) {
      this.isEdit = true
      this.showEdit = true
      this.editingContact = item
    },

    // 保存联系人
    async onSave (info) {
      if (this.isEdit) {
        let res = await this.$Http.editContact(info)
        if (res.code === 200) {
          Toast('保存成功')
          this.showEdit = false
          this.getList()
        }
      } else {
        /* let res = await
        this.$Http.newContactJson(info)
        if (res.code === 200) {
          Toast('保存成功')
          this.showEdit = false
          this.getList()
        } */

        let res = await
        this.$Http.newContactFrom(info, true)
        if (res.code === 200) {
          Toast('保存成功')
          this.showEdit = false
          this.getList()
        }
      }
    },

    // 删除联系人
    async onDelete (info) {
      let res = await this.$Http.delContact({
        id: info.id
      })
      if (res.code === 200) {
        Toast('删除成功')
        this.showEdit = false
        this.getList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .van-contact-list__add {
    z-index: 0;
  }
  .van-popup {
    height: 100%;
    background-color: #f2f2f2;
  }
</style>
