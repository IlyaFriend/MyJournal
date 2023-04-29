<template>
<div class="container border-2 max-h-96 px-6 py-6 text-lg border-amber-900">
    <h2>{{ header }}</h2>
    <p>{{ article.slice(0, 100) }}...</p>
    <NuxtLink :to='writerLink'  class="underline text-amber-950 hover:text-amber-800">
        {{ $props.writer.firstname }} {{ $props.writer.lastname }}
    </NuxtLink>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
	header: {
		type: String,
		required: true,
	},
    article: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    writer: {
        type: Object,
        required: true,
    }
});

let writerLink = computed(() => {
    return `/${props.writer.username}`
})
</script>

<style scoped>
.container {
    /* width: 220% */
}
</style>