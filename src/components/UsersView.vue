<template>
  <div v-if="isDefaultView" class="user-view-container">
    <div class="users-title">
      <h2> Users </h2>
      <BButton class="list-create-button" @click="startCreatingUser" variant="success"> Create new User </BButton>
    </div>
    <BFormGroup
      label="Filter"
      label-for="filter-input"
      label-size="sm"
      class="myFilter"
    >
      <BInputGroup size="sm">
        <BFormInput
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        />
      </BInputGroup>
    </BFormGroup>
    <BTable :sort-by="[{key: 'id', order: 'desc'}]" 
      :items="users" :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
    > 
      <template #cell(actions)="row">
        <BButton variant="primary" size="sm" class="me-1" @click="seeUserOrders(row.item)"> See User Orders </BButton>
        <BButton variant="primary" size="sm" class="me-1" @click="startEditingUser(row.item)"> Edit User </BButton>
        <BButton variant="danger" size="sm" class="me-1" @click="startDeletingUser(row.item)"> Delete User </BButton>
      </template>    
    </BTable>
    <BPagination
      v-model="currentPage"
      :total-rows="users.length"
      :per-page="perPage"
      :align="'fill'"
      size="sm"
      class="my-0"
    />
  </div>
  <div v-if="creatingUser" class="create-user-container">
    <CreateUserView @goBack="resetView"/>
  </div>
  <div v-if="activeUser != null && seeingUserOrders" class="edit-user-container">
    <OrdersView :user="activeUser" @goBack="resetView"/>
  </div>
  <div v-if="activeUser != null && editingUser" class="edit-user-container">
    <EditUserView :user="activeUser" @goBack="resetView"/>
  </div>
  <BModal
    v-model="deletingUser"
    @ok="deleteUser()"
    :ok-only="activeUser == null"
    :ok-title="activeUser == null ? 'Ok' : 'Delete User'"
    :ok-variant="activeUser === null ? 'primary' : 'danger'"
  >
    <BCard v-if="activeUser == null">
      Error: User has not been detected
    </BCard>
    <p v-else> Are you sure you wish to delete this user? </p>
  </BModal>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
import type User from "@/models/User";
import { BButton, type TableItem } from "bootstrap-vue-next";
import CreateUserView from "./CreateUserView.vue";
import EditUserView from "./EditUserView.vue";
import OrdersView from "./OrdersView.vue";

export default defineComponent({
  data() {
    return {
      //table data
      users: [] as User[],
      fields: [
        {key: 'id', sortable: true},
        {key: 'fullName', sortable: true},
        {key: 'email', sortable: true},
        {key: 'actions', sortable: false},
      ],
      currentPage: 1,
      perPage: 10,
      filter: "",

      //action data
      activeUser: null as null | User,
      //Can be converted to an enum, current version might be easier to read
      creatingUser: false,
      seeingUserOrders: false,
      editingUser: false,
      deletingUser: false,
    }
  },
  async mounted() {
    await this.resetView();
  },
  computed: {
    isDefaultView() {
      return !this.creatingUser && !this.editingUser && !this.seeingUserOrders; 
      //deletingUser is a modal so we still want the default view
    },
  },
  methods: {
    startCreatingUser(): void {
      this.creatingUser = true;
    },
    startEditingUser(user: TableItem<User>): void {
      this.activeUser = user;
      this.editingUser = true;
    },
    startDeletingUser(user: TableItem<User>): void {
      this.activeUser = user;
      this.deletingUser = true;
    },
    seeUserOrders(user: TableItem<User>): void {
      this.activeUser = user;
      this.seeingUserOrders = true;
    },
    async deleteUser(): Promise<void> {
      if(!this.activeUser) return;
      
      await RemoteService.deleteUser(this.activeUser.id);
      await this.resetView();
    },
    async resetView(): Promise<void> {
      this.creatingUser = false;
      this.activeUser = null;
      this.deletingUser = false;
      this.editingUser = false;
      this.seeingUserOrders = false;
      await this.refreshItems();
    },
    async refreshItems(): Promise<void>  {
      this.users = await RemoteService.getAllUsers();
    },
  },
});
</script>

<style scoped>
.list-create-button {
  float: right;
}
.myFilter {
  margin-top: 20px;
}
</style>