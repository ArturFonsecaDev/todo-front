<template>
    <button :type="type" class="btn btn-lg w-100">{{ buttonLabel }}</button>
</template>

<script>
export default {
    props: {
        buttonLabel: String,
        type: String
    }
}
</script>