<template>
  <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ title }}</ion-title>
          <ion-buttons slot="primary">
            <ion-button color="secondary" @click="handleSignOut">
              <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">{{ title }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <div id="container">
    	</div>
  </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonMenuButton } from '@ionic/vue';
import { mapActions } from "vuex";
import { caretForwardCircleOutline, logOut } from 'ionicons/icons';
import { useIonRouter } from '@ionic/vue';
import config from '@/config';

export default {
  name: 'DashboardPage',
  components: {
    IonMenuButton,
    IonTitle,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonIcon,
    IonButton
  },
    data(): {
      title: string,  
    } {
      return {
        title: config.APP_NAME
      };
    },
    setup() {
      const router = useIonRouter();
      return {
        router
      };
    },
    methods: {
    ...mapActions("auth", ["signOut"]),
    handleSignOut() {
      this.signOut().then((resp: any) => {
        console.log(resp);
      }).catch((error: any) => {
        console.log(error);
      });
    }
  },
  computed: {
    caretForwardCircleOutline() {
      return caretForwardCircleOutline;
    },
    logOut() {
      return logOut;
    }
  }
};
</script>
