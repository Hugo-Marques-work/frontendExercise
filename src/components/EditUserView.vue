<template>
  <BForm @submit.prevent="createUser" @reset="cancelOperation">
    <BFormGroup
      id="input-group-fullName"
      label="Full name:"
      label-for="input-fullName"
    >
      <BFormInput
        id="input-fullName"
        v-model="fullName"
        placeholder="Enter a full name"
        required
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-email"
      label="Email address:"
      label-for="input-email"
    >
      <BFormInput
        id="input-email"
        v-model="email"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>
    <div class="form-button-container">
      <BButton class="submit-button" type="submit" variant="primary"> Edit User </BButton>
      <BButton type="reset" variant="danger"> Cancel </BButton>
    </div>
  </BForm>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
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
      fullName: '',
      email: '',
    }
  },
  async mounted() {
    this.fullName = this.user.fullName;
    this.email = this.user.email;
  },
  methods: {
    cancelOperation() {
      this.$emit("goBack");
    },
    async createUser() {
      await RemoteService.updateUser(this.user.id, this.fullName, this.email);
      this.$emit("goBack");
    },
  },
});
</script>
