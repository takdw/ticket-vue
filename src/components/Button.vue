<template>
  <button
    @click.stop="$emit('click', $event)"
    class="relative mt-4 px-12 py-2 rounded-lg text-white border border-transparent font-bold transition duration-300 ease-in-out overflow-hidden"
    :class="classes"
  >
    <span
      v-show="loading"
      class="absolute inset-0 inline-flex items-center justify-center"
      :class="bg"
    >
      <span
        class="block h-4 w-4 border-2 rounded-full spin"
        :class="border"
        style="border-bottom-color: transparent"
      ></span>
    </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["loading", "variant"],
  data: () => ({}),
  computed: {
    bg() {
      switch (this.variant) {
        case "primary":
          return !this.loading ? "bg-indigo-600" : "bg-indigo-400";
        case "secondary":
          return !this.loading ? "bg-white" : "bg-gray-200";
        case "danger":
          return !this.loading ? "bg-red-600" : "bg-red-400";
        default:
          return !this.loading ? "bg-gray-800" : "bg-gray-600";
      }
    },
    text() {
      switch (this.variant) {
        case "secondary":
          return "text-gray-700";
        case "primary":
        case "danger":
        default:
          return "text-white";
      }
    },
    border() {
      return this.text.replace("text", "border");
    },
    classes() {
      switch (this.variant) {
        case "primary":
          return `${this.bg} ${
            this.text
          } hover:bg-indigo-400 focus:border-indigo-700 active:bg-indigo-600 focus:shadow-outline-indigo ${
            this.loading ? "cursor-wait" : ""
          }`;
        default:
          return `${this.bg} ${
            this.text
          } hover:bg-gray-700 focus:border-gray-900 active:bg-gray-900 focus:shadow-outline-gray ${
            this.loading ? "cursor-wait" : ""
          }`;
      }
    },
  },
};
</script>
