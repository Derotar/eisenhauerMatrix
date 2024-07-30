<script setup lang="ts">
export interface NoteProps {
  text?: string;
}

const props = defineProps<NoteProps>();
</script>

<template>
  <div
    class="bg-yellow-300 border border-black rounded-[20px] min-w-[200px] min-h-[200px] h-[200px] w-[200px] flex justify-center items-center font-bold text-base"
    data-draggable
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped></style>
