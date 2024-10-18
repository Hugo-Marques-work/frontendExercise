<template>
  <BForm @submit.prevent="createOrder" @reset="cancelOperation">
    <BFormGroup
      id="input-group-orderDate"
      label="Order date:"
      label-for="input-orderDate"
    >
      <BFormInput
        id="input-orderDate"
        v-model="newOrder.orderDate"
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
        v-model="newOrder.product"
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
import User from "@/models/User";

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
      newOrder: new Order({id: -1, userId: -1, orderDate: new Date(), product: ''}), //id is not used in creation
    }
  },
  async mounted() {
    this.newOrder = new Order({id: -1, userId: this.user.id,
      orderDate: new Date(), product: ''
    });
  },
  methods: {
    cancelOperation() {
      this.$emit("goBack");
    },
    async createOrder() {
      await RemoteService.createOrder(this.newOrder);
      this.$emit("goBack");
    }
  },
});
</script>
