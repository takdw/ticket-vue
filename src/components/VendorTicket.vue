<template>
  <div class="grid grid-cols-7">
    <div class="col-span-4 px-6 py-4 whitespace-nowrap">
      <div class="font-medium text-gray-900">Event Title {{ ticket }}</div>
      <div class="text-sm text-gray-500">Venue &bull; Date and Time</div>
    </div>
    <div class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap">
      <svg
        class="text-green-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    >
      <svg
        class="text-red-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="col-span-1 grid place-items-center whitespace-nowrap text-right text-sm font-medium"
    >
      <button
        type="button"
        class="p-2 text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ticket"],
};
</script>
