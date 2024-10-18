<template>
  <UsersView/>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import RemoteService from "@/RemoteService";
import UsersView from "@/components/UsersView.vue";

export default defineComponent({
  err: '#error',
  data() {
    return {
    }
  },
  async mounted() {
  },
  methods: {
  },
  components: { UsersView }
});
</script>
