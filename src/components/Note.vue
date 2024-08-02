<script setup lang="ts">
export interface NoteProps {
  text?: string;
  background?: string;
}

const props = defineProps<NoteProps>();
</script>

<template>
  <div
    :class="[
      ' min-w-[200px] min-h-[200px] h-[200px] w-[200px] flex justify-center items-center font-bold',
      ,
      ' p-4 shadow-[5px_5px_7px_rgba(33,33,33,.7)] font-great-vibes text-[24px]',
    ]"
    data-draggable
    :style="{ background: props.background ?? '#fcc' }"
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped></style>
