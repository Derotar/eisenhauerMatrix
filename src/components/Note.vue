<script setup lang="ts">
import { computed, ref } from "vue";

export interface NoteProps {
  text?: string;
  background?: string;
}

const props = defineProps<NoteProps>();
const emit = defineEmits<{ (e: "update:text", text: string): void }>();

const str = computed({
  get: () => props.text ?? "",
  set: (val) => emit("update:text", val),
});
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
    <div class="w-full h-full relative">
      <label
        for="textarea"
        class="w-full h-full flex items-center justify-center text-black overflow-hidden text-center font-gabriela"
      >
        {{ str }}
      </label>
      <textarea
        v-model="str"
        id="textarea"
        class="resize-none outline-none appearance-none bg-transparent overflow-hidden w-full h-full opacity-0 absolute inset-0"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
