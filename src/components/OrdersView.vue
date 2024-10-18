<template>
  <BButton variant="primary" @click="goBack()"> Return to User </BButton>
  <div v-if="isDefaultView" class="order-view-container">
    <div class="orders-title">
      <BButton class="list-create-button" @click="startCreatingOrder" variant="success"> Create new Order </BButton>
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
      :items="orders" :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
    > 
      <template #cell(actions)="row">
        <BButton variant="primary" size="sm" class="me-1" @click="startEditingOrder(row.item)"> Edit Order </BButton>
        <BButton variant="danger" size="sm" class="me-1" @click="startDeletingOrder(row.item)"> Delete Order </BButton>
      </template>    
    </BTable>
    <BPagination
      v-model="currentPage"
      :total-rows="orders.length"
      :per-page="perPage"
      :align="'fill'"
      size="sm"
      class="my-0"
    />
  </div>
  <div v-if="creatingOrder" class="create-order-container">
    <CreateOrderView :user="user" @goBack="resetView"/>
  </div>
  <div v-if="activeOrder != null && editingOrder" class="edit-order-container">
    <EditOrderView :order="activeOrder" @goBack="resetView"/>
  </div>
  <BModal
    v-model="deletingOrder"
    @ok="deleteOrder()"
    :ok-only="activeOrder == null"
    :ok-title="activeOrder == null ? 'Ok' : 'Delete Order'"
    :ok-variant="activeOrder === null ? 'primary' : 'danger'"
  >
    <BCard v-if="activeOrder == null">
      Error: Order has not been detected
    </BCard>
    <p v-else> Are you sure you wish to delete this order? </p>
  </BModal>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
import User from "@/models/User";
import { BButton, type TableItem } from "bootstrap-vue-next";
import CreateOrderView from "./CreateOrderView.vue";
import EditOrderView from "./EditOrderView.vue";
import type Order from "@/models/Order";

export default defineComponent({
  emits: ["goBack"],
  props: {
    user: {
      type: User,
      required: true,
    }
  },
  data() {
    return {
      //table data
      orders: [] as Order[],
      fields: [
        {key: 'id', sortable: true},
        //{key: 'userId', sortable: true}, could be added
        {key: 'orderDate', sortable: true},
        {key: 'product', sortable: true},
        {key: 'actions', sortable: false},
      ],
      currentPage: 1,
      perPage: 10,
      filter: "",

      //action data
      creatingOrder: false,
      activeOrder: null as null | Order,
      editingOrder: false,
      deletingOrder: false,
    }
  },
  async mounted() {
    await this.resetView();
  },
  computed: {
    isDefaultView() {
      return !this.creatingOrder && !this.editingOrder;
    },
  },
  methods: {
    startCreatingOrder(): void {
      this.creatingOrder = true;
    },
    startEditingOrder(order: TableItem<Order>): void {
      this.activeOrder = order;
      this.editingOrder = true;
    },
    startDeletingOrder(order: TableItem<Order>): void {
      this.activeOrder = order;
      this.deletingOrder = true;
    },
    async deleteOrder(): Promise<void> {
      if(!this.activeOrder) return;
      
      await RemoteService.deleteOrder(this.activeOrder.id);
      await this.resetView();
    },
    async resetView(): Promise<void> {
      this.creatingOrder = false;
      this.activeOrder = null;
      this.deletingOrder = false;
      this.editingOrder = false;
      await this.refreshItems();
    },
    async refreshItems(): Promise<void>  {
      this.orders = await RemoteService.getOrders(this.user.id);
    },
    goBack(): void {
      this.$emit('goBack');
    }
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