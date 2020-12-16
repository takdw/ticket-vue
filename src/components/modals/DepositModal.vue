<template>
  <transition
    enter-class="opacity-0"
    enter-to-class="opacity-1"
    enter-active-class="transition ease-out duration-150"
    leave-active-class="transition ease-out duration-150"
    leave-to-class="opacity-0"
    leave-class="opacity-1"
    @after-enter="show = true"
  >
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-black bg-opacity-25 grid place-items-center"
      @click="hide"
    >
      <transition
        enter-class="transform scale-75 opacity-0"
        enter-to-class="transform scale-100 opacity-1"
        enter-active-class="transition ease-out duration-150"
        leave-active-class="transition ease-out duration-150"
        leave-to-class="transform scale-75 opacity-0"
        leave-class="transform scale-100 opacity-1"
        @after-leave="modalOpen = false"
      >
        <div
          v-if="show"
          class="max-w-lg bg-white rounded-lg shadow overflow-hidden"
          @click.stop
        >
          <div class="p-6">
            <h2 class="font-medium">Depoist Money</h2>
            <p class="mt-4 leading-tight text-gray-600">
              To add money to your wallet, please depsoit cash to the bank
              account number provided below at your nearest Commercial Bank of
              Ethiopia branch.
            </p>
            <p
              class="py-2 text-center mt-8 rounded bg-gray-200 text-gray-700 text-2xl font-display font-medium"
            >
              1000028628777
            </p>
            <p class="mt-8 leading-tight text-gray-800 font-medium">
              Already deposited?
            </p>
            <p class="mt-4 leading-tight text-gray-600">
              Please attach a photo of the recipet of the transaction. Once we
              confirm the transaction, the money will be added to your account.
              This process usually takes upto 3 days.
            </p>
            <PhotoUploadInput
              class="mt-4"
              :data="{ id: 'transaction', existing: '' }"
              v-model="photo"
            />
            <p class="text-red-500 text-sm font-medium" v-if="error">
              Please select a file first.
            </p>
            <p class="text-red-500 text-sm font-medium" v-if="uploadError">
              There was an error while uploading the file.
            </p>
            <Button
              :loading="uploading"
              type="button"
              @click="upload"
              class="mt-4 block w-full py-3"
              >Upload</Button
            >
          </div>
          <div class="bg-gray-200 text-right p-4">
            <Button type="button" @click="hide" variant="outline"
              >Cancel</Button
            >
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Button from "@/components/Button";
import PhotoUploadInput from "@/components/PhotoUploadInput";

export default {
  components: {
    Button,
    PhotoUploadInput,
  },
  data: () => ({
    modalOpen: false,
    show: false,
    uploading: false,
    photo: "",
    error: false,
    uploadError: false,
  }),
  created() {},
  watch: {
    modalOpen(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
  },
  computed: {},
  beforeDestory() {
    document.body.removeEventListener("keyup", this.escapeListener);
  },
  methods: {
    open() {
      this.modalOpen = true;
    },
    hide() {
      this.show = false;
      this.error = false;
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        this.hide();
      }
    },
    upload() {
      this.error = false;
      if (!this.photo) {
        this.error = true;
        return;
      }

      this.uploading = true;

      const fd = new FormData();
      fd.append("photo", this.photo);

      this.$http
        .post("/api/deposit", fd)
        .then(() => this.hide())
        .catch(err => {
          console.log(err);
          this.uploadError = true;
        })
        .finally(() => (this.uploading = false));
    },
  },
};
</script>

<style></style>
