<template>
        <ion-router-outlet id="main-content"></ion-router-outlet>
</template>

<script lang="ts">
    import { IonRouterOutlet } from '@ionic/vue';
    export default {
        name: 'AuthenticationPage',
        components: { IonRouterOutlet }
    };
</script>
