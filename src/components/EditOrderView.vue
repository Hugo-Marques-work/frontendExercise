<template>
  <BForm @submit.prevent="createOrder" @reset="cancelOperation">
    <BFormGroup
      id="input-group-orderDate"
      label="Order date:"
      label-for="input-orderDate"
    >
      <BFormInput
        id="input-orderDate"
        v-model="orderDate"
        type="date"
        placeholder="Enter order date"
        required
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-product"
      label="Product:"
      label-for="input-product"
    >
      <BFormInput
        id="input-product"
        v-model="product"
        placeholder="Enter the product name"
        required
      />
    </BFormGroup>
    <div class="form-button-container">
      <BButton class="submit-button" type="submit" variant="success"> Create new Order </BButton>
      <BButton type="reset" variant="danger"> Cancel </BButton>
    </div>
  </BForm>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
import Order from "@/models/Order";

export default defineComponent({
  emits: ["goBack"],
  props: {
    order: {
      type: Order,
      required: true,
    }
  },
  data() {
    return {
      orderDate: new Date(0),
      product: '',
    }
  },
  async mounted() {
    this.orderDate = this.order.orderDate;
    this.product = this.order.product;
  },
  methods: {
    cancelOperation() {
      this.$emit("goBack");
    },
    async createOrder() {
      await RemoteService.updateOrder(this.order.id, this.orderDate, this.product);
      this.$emit("goBack");
    }
  },
});
</script>
