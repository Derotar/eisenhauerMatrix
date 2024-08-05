<script setup lang="ts">
import { onMounted, ref, unref } from "vue";
import Note from "./Note.vue";
import { generateBrightColor } from "../utils";

const desk = ref<HTMLElement | null>(null);

function showDroppable(elem: HTMLElement) {
  const header = elem.querySelector(":first-child") as HTMLElement | null;
  if (!header) return;
  header.style.opacity = "1";
}

function hideDroppable(elem: HTMLElement) {
  const header = elem.querySelector(":first-child") as HTMLElement | null;
  if (!header) return;
  header.style.opacity = "0";
}

onMounted(() => {
  const desk = document.getElementById("desk");
  if (!desk) return;

  desk.onmousedown = function (e: MouseEvent) {
    const target = e.target;
    if (!target) return;
    const _note = (target as HTMLElement).closest(
      "[data-draggable]"
    ) as HTMLElement;

    if (!_note || !desk.contains(_note)) return;

    _note.ondragstart = function () {
      return false;
    };

    const rect = _note.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    function moveAt(elem: HTMLElement, x: number, y: number) {
      elem.style.top = y - shiftY + "px";
      elem.style.left = x - shiftX + "px";
    }

    let currentDroppable: HTMLElement | null = null;

    function onMouseMove(e: MouseEvent) {
      if (!_note) return;

      moveAt(_note, e.clientX, e.clientY);

      _note.style.pointerEvents = "none";
      const elUnder = document.elementFromPoint(e.clientX, e.clientY);
      _note.style.pointerEvents = "auto";

      if (!elUnder) return;
      const droppable = elUnder.closest(
        "[data-droppable]"
      ) as HTMLElement | null;

      if (!desk?.contains(droppable)) return;

      if (droppable !== currentDroppable) {
        if (!currentDroppable && droppable) {
          showDroppable(droppable);
          console.log("2");
        } else if (currentDroppable && droppable) {
          hideDroppable(currentDroppable);
          showDroppable(droppable);
          console.log("3");
        } else if (currentDroppable && !droppable) {
          console.log("4");

          hideDroppable(currentDroppable);
        }
        currentDroppable = droppable;
      }
    }

    if (!_note) return;
    desk.append(_note);
    _note.style.position = "absolute";
    moveAt(_note, e.clientX, e.clientY);

    desk.addEventListener("mousemove", onMouseMove);

    desk.onmouseup = function () {
      desk.removeEventListener("mousemove", onMouseMove);
      if (currentDroppable) hideDroppable(currentDroppable);
      desk.onmouseup = null;

      //save position
      const noteId = _note.getAttribute("data-id");
      if (noteId) {
        const foundNote = notes.value.find(
          (item) => item.id === Number(noteId)
        );
        if (foundNote) {
          const rect = _note.getBoundingClientRect();
          foundNote.points.x = rect.left;
          foundNote.points.y = rect.top;
        }
      }
    };
  };

  //   if (!_note) return;
  //   console.log("down");
  //   _note.style.position = "absolute";
  //   _note.style.zIndex = "50";

  //   function onMouseMove(e: MouseEvent) {
  //     const x = e.clientX;
  //     const y = e.clientY;

  //     _note!.style.left = x + "px";
  //     _note!.style.top = y + "px";
  //   }

  //   _note.addEventListener("mousemove", onMouseMove);

  //   _note.onmouseup = function () {
  //     _note.removeEventListener("mousemove", onMouseMove);
  //     _note.onmouseup = null;
  //   };

  //   _note.ondragstart = function () {
  //     return false;
  //   };
  // };

  // _note.addEventListener("mousedown", onMouseDown);
});

interface Note {
  text: string;
  id: number;
  background: string;
  points: {
    x: number;
    y: number;
  };
}

const notes = ref<Note[]>([
  { text: "Занюхать бебру", id: 0, points: { x: 0, y: 0 }, background: "#fcc" },
]);
const id = ref(0);
const addNote = () => {
  notes.value.push({
    text: "",
    id: ++id.value,
    background: generateBrightColor(),
    points: {
      x: 0,
      y: 0,
    },
  });
};
</script>

<template>
  <div class="w-full h-full bg-red-100">
    <div
      ref="desk"
      id="desk"
      class="h-full w-full grid grid-cols-2 grid-rows-2 bg-white relative overflow-hidden"
    >
      <button
        @click.stop="addNote"
        @mousedown.stop
        class="w-20 h-20 bg-white rounded-full shadow-lg shadow-gray-400 absolute bottom-20 right-20 flex justify-center items-center transition-all duration-100 ease-in-out hover:bg-gray-200 active:bg-gray-300"
      >
        +
      </button>
      <Note
        v-for="note in notes"
        :key="note.id"
        class="w-[200px] h-[200px] cursor-pointer absolute"
        :style="{ top: note.points.x, left: note.points.y }"
        v-model:text="note.text"
        :background="note.background"
        :data-id="note.id"
      />
      <div class="bg-red-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Срочно и важно
        </h2>

        {{ notes }}
      </div>
      <div class="bg-yellow-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Важно, но не срочно
        </h2>
      </div>
      <div class="bg-blue-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Срочно, но не важно
        </h2>
      </div>
      <div class="bg-green-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Не важно и не срочно
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
