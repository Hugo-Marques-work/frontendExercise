<template>
  <BForm @submit.prevent="createUser" @reset="cancelOperation">
    <BFormGroup
      id="input-group-fullName"
      label="Full name:"
      label-for="input-fullName"
    >
      <BFormInput
        id="input-fullName"
        v-model="newUser.fullName"
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
        v-model="newUser.email"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-password"
      label="Password:"
      label-for="input-password"
    >
      <BFormInput
        id="input-password"
        v-model="newUser.password"
        type="password"
        placeholder="Enter password"
        required
      />
    </BFormGroup>
    <div class="form-button-container">
      <BButton class="submit-button" type="submit" variant="success"> Create new User </BButton>
      <BButton type="reset" variant="danger"> Cancel </BButton>
    </div>
  </BForm>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
import UserCreateDto from "@/models/UserCreateDto";

export default defineComponent({
  emits: ["goBack"],
  data() {
    return {
      newUser: new UserCreateDto('', '', ''),
    }
  },
  async mounted() {
    this.newUser = new UserCreateDto('', '', '');
  },
  methods: {
    cancelOperation() {
      this.$emit("goBack");
    },
    async createUser() {
      await RemoteService.createUser(this.newUser);
      this.$emit("goBack");
    }
  },
});
</script>
