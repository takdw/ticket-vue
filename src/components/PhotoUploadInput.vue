<template>
  <div>
    <div>
      <div class="grid grid-cols-4 mt-1 items-stretch form-input">
        <button
          type="button"
          @click="openUploader"
          class="form-input block uppercase font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition ease-in-out duration-300 whitespace-no-wrap truncate"
          :class="{
            'border-red-500 focus:shadow-red focus:border-red-500': fileTypeError,
            'col-span-3': hasFile || hasExisting,
            'col-span-4': !hasFile && !hasExisting,
          }"
          placeholder=""
          v-model="model"
          :title="hasFile ? file.name : filename"
        >
          <span v-if="hasFile">{{ file.name }}</span>
          <span v-if="hasExisting">{{ filename.split("/").pop() }}</span>
          <span v-if="!hasFile && !hasExisting">Select a file</span>
        </button>
        <div
          v-if="hasFile || hasExisting"
          class="flex col-span-1 justify-center"
        >
          <button
            class="text-gray-600 hover:text-gray-800 px-2 py-1 text-sm font-medium transition ease-in-out duration-300"
            type="button"
            @click="preview = true"
          >
            Preview
          </button>
          <button
            class="text-gray-600 hover:text-red-800 px-2 py-1 text-sm font-medium transition ease-in-out duration-300"
            type="button"
            @click="remove"
          >
            Remove
          </button>
        </div>
      </div>
      <input
        @change="processFile"
        :id="data.id"
        :ref="ref"
        type="file"
        class="hidden"
      />
    </div>
    <p v-if="fileTypeError" class="text-red-500 font-semibold text-sm">
      Only <strong>.png</strong>, <strong>.jpg</strong> and
      <strong>.jpeg</strong> file types are allowed.
    </p>
    <transition
      enter-class="opacity-25"
      enter-active-class="transition duration-150 ease-out"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="transition duration-150 ease-out"
      leave-to-class="opacity-25"
      @after-enter="mainPrev = true"
      @before-leave="mainPrev = false"
    >
      <div
        v-if="preview"
        @click="preview = false"
        class="fixed inset-0 bg-black bg-opacity-25 z-50"
      >
        <div class="h-full grid place-items-center overflow-y-auto">
          <transition
            enter-class="transform scale-75"
            enter-active-class="transition duration-150 ease-out"
            enter-to-class="transform scale-100"
            leave-class="transform scale-100"
            leave-active-class="transition duration-150 ease-out"
            leave-to-class="transform scale-75"
          >
            <div
              v-if="mainPrev"
              @click.stop
              class="w-full max-w-lg rounded-lg bg-white overflow-hidden border-4 border-gray-300"
            >
              <img
                class="w-full object-cover"
                :src="previewData || (existing ? getPath(existing) : '')"
                :alt="filename"
              />
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  components: {},
  data: () => ({
    model: "",
    ref: "",
    fileTypeError: false,
    file: {},
    preview: false,
    mainPrev: false,
    previewData: "",
    existing: "",
    removeExisting: false,
  }),
  watch: {
    data(newValue) {
      this.existing = newValue.existing;
    },
  },
  created() {
    this.ref = Math.random().toString(36).substring(7);
    this.existing = this.data.existing;
  },
  computed: {
    hasFile() {
      return this.file instanceof File;
    },
    filename() {
      return this.file.name || this.existing;
    },
    hasExisting() {
      return !!(this.existing && !this.removeExisting);
    },
  },
  methods: {
    openUploader() {
      this.$refs[this.ref].click();
    },
    processFile(e) {
      this.fileTypeError = false;

      const file = e.target.files[0];

      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        this.fileTypeError = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.previewData = e.target.result;
      };
      reader.readAsDataURL(file);

      this.file = file;
      this.$emit("input", file);
    },
    remove() {
      console.log("removing");
      this.file = {};
      this.removeExisting = true;
      this.$emit("input", {});
    },
    getPath(path) {
      return process.env.VUE_APP_BACKEND_URL + "/storage/" + path;
    },
  },
};
</script>

<style></style>
