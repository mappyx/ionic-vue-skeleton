<template>
  <ion-page>
    <ion-content>
      <div class="login-container">
        <div class="login-background"></div>
        <ion-card>
          <div class="logo-container">
            <img src="../../../assets/images/logo.png" alt="logo" />
          </div>
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="login-input">
                  <ion-input label="Correo: " type="email" v-model="form.email"></ion-input>
                </div>
                <div class="login-input">
                  <ion-input label="Contraseña: " type="password" v-model="form.password"></ion-input>
                </div>
              <ion-button expand="block" class="login-button" @click="handleLogin">Iniciar sesión
                <ion-icon slot="end" :icon="logIn"></ion-icon>
              </ion-button>
            </form>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonCard, IonLabel, IonButton, IonInput, alertController, IonIcon } from '@ionic/vue'
import { logIn, personAdd } from 'ionicons/icons';
import { mapActions, mapGetters } from "vuex"
import { useIonRouter } from '@ionic/vue';
import config from '@/config';
export default {
  name: 'SigninPage',
  components: { IonContent, IonPage, IonCard, IonLabel, IonButton, IonInput, IonIcon },
  setup() {
    const router = useIonRouter();
    return {
      router,
      logIn,
      personAdd
    };
  },
  data() {
    return {
      title: config.APP_NAME,
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleLogin() {
      this.signIn(this.form).then(() => {
        this.form.email = "";
        this.form.password = "";
        this.router.navigate({ name: 'dashboard.index' }, 'forward', 'replace');
      }).catch(async (err: any) => {
        const errorAlert = await alertController
            .create({
              header: 'Failed',
              subHeader: 'Fallo la autenticación',
              message: err,
              buttons: ['OK'],
            });
        await errorAlert.present()
      })
    }
  }
}
</script>

<style scoped>

ion-page {
  color: black;
}

ion-button {
  --background: transparent;
  --box-shadow: none;
  --border-radius: 0;
  --border-style: none;
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
  --color: inherit;
}

ion-card {
  position: absolute;
  background-color: transparent;
  box-shadow: none;
  font-size: 1em;
  width: 100%;
}

ion-list {
  background-color: transparent;
  box-shadow: none;
}


.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(48, 48, 168);
  z-index: -1;
}

.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  border-radius: 10px;
  padding-top: 20px;
}

.login-input {
  padding: 1em;
  background-color: rgba(187, 215, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 1em;
  width: 90%;
}

.login-input ion-input {
  color: rgb(0, 0, 0);
  background-color: #fff;
  border-radius: 10px;
}

.login-input ion-label {
  color: #fff;
}

.login-button {
  margin-top: 20px;
  border-radius: 20px;
  background-color: rgb(193, 0, 0);
  color: #fff;
  width: 15rem;
  height: 3rem;
  margin: 1rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
  margin-bottom: 2rem;
}

.logo-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>