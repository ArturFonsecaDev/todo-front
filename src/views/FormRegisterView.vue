<template>
    <FormCardRegister 
    :label1="label1"
    :label2="label2"
    :label3="label3"
    :buttonLabel1="buttonLabel1"
    :buttonLabel2="buttonLabel2"
    :title="title"
    >
    </FormCardRegister>
</template>

<script>

import FormCardRegister from '../components/FormCardRegisterComponent.vue';

export default {
    components: {
        FormCardRegister
    },
    props: {
        label1: {
            type: String,
            required: true
        },
        label2: {
            type: String,
            required: true
        },
        label3: {
            type: String,
            required: true
        },
        buttonLabel1: {
            type: String,
            required: true
        },
        buttonLabel2: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
}
</script>