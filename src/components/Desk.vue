<script setup lang="ts">
import { onMounted, ref, unref } from "vue";
import Note from "./Note.vue";

const container = ref<HTMLElement | null>(null);
const note = ref<HTMLElement | null>(null);

function onMouseDown(e: MouseEvent) {
  console.log(e.clientX, e.clientY);
}

const zIndex = ref(30);

function showDroppable(elem: HTMLElement) {
  const header = elem.querySelector(":first-child") as HTMLElement | null;
  if (!header) return;
  header.style.opacity = "1";
  elem.style.border = "8px solid red";
}

function hideDroppable(elem: HTMLElement) {
  const header = elem.querySelector(":first-child") as HTMLElement | null;
  if (!header) return;
  header.style.opacity = "0";
  elem.style.border = "none";
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
    console.log("note", _note);
    if (!_note || !desk.contains(_note)) return;
    console.log("note", 1);

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

      _note.hidden = true;
      _note.style.pointerEvents = "none";
      const elUnder = document.elementFromPoint(e.clientX, e.clientY);
      _note.style.pointerEvents = "auto";

      console.log("elUnder", elUnder);

      if (!elUnder) return;
      const droppable = elUnder.closest(
        "[data-droppable]"
      ) as HTMLElement | null;
      console.log("droppable", droppable);

      if (!desk?.contains(droppable)) return;
      // console.log("droppable", droppable);

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
</script>

<template>
  <div class="w-full h-full bg-red-100">
    <div
      ref="container"
      id="desk"
      class="h-full w-full grid grid-cols-2 grid-rows-2 bg-white relative overflow-hidden"
    >
      <div class="bg-red-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Срочно и важно
        </h2>
        <Note
          class="w-[200px] h-[200px] cursor-pointer"
          text="Понюхать бебру"
        />
      </div>
      <div class="bg-yellow-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Важно, но не срочно
        </h2>

        <Note
          class="w-[200px] h-[200px] !bg-slate-500 cursor-pointer"
          text="Врезать шершавого"
        />
      </div>
      <div class="bg-blue-300" data-droppable>
        <h2
          class="opacity-0 text-[32px] w-full text-center font-bold lowercase select-none transition-opacity duration-500 linear"
        >
          Срочно, но не важно
        </h2>

        <Note
          class="w-[200px] h-[200px] !bg-green-500 cursor-pointer"
          text="Погонять лысого"
        />
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
