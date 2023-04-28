import AuthService from "@/services/auth.service";
import AuthenticationError from "@/exceptions/authentication.error";
import TokenService from "@/services/token.service";

const state = {
    user: {},
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: ""
};

const getters = {
    authenticationErrorCode: (state: { authenticationErrorCode: any }) => {
        return state.authenticationErrorCode;
    },
    authenticationError: (state: { authenticationError: any }) => {
        return state.authenticationError;
    },
    authenticating: (state: { authenticating: any }) => {
        return state.authenticating;
    },
    user: (state: { user: any }) => {
        return state.user;
    }
};

const actions = {
    async signIn(context: any, signInData: any) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then((res: any) => {
                console.log(res);
                context.commit("signInSuccess", res);
                context.commit("setUser", res);
                resolve(res);
                window.location.reload();
            }).catch((err: any)  => {
                if (err instanceof AuthenticationError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message
                    });
                    reject(err.message);
                }
            });
        });
    },
    signOut(context: any) {
        context.commit("signOutRequest");
        return new Promise<void>((resolve) => {
            AuthService.signOut();
            context.commit("processSuccess");
            resolve();
            window.location.reload();
        });
    },
    setAuthenticatingStatus(context: any, status: any) {
        context.commit("setAuthenticatingStatus", status);
    },
    cleanState(context: any) {
        context.commit("cleanState");
    }
};

const mutations = {
    signInRequest(state: {
        authenticating: boolean;
        authenticationError: string;
        authenticationErrorCode: number;
    }) {
        state.authenticating = true;
        state.authenticationError = "";
        state.authenticationErrorCode = 0;
    },
    signInSuccess(state: {
        user: any;
        accessToken: any;
        authenticating: boolean;
    }, user: any ) {
        state.user = user;
        state.authenticating = false;
    },
    signInError(state: {
        user: any;
        authenticating: boolean;
        authenticationErrorCode: any;
        authenticationError: any;
    }, {errorCode, errorMessage}: any) {
        state.user = {};
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },
    signOutRequest(state: { authenticating: boolean, user: any }) {
        state.authenticating = false;
        state.user = {};
    },
    processSuccess(state: { authenticating: boolean }) {
        state.authenticating = false;
    },
    setAuthenticatingStatus(state: { authenticating: any }, status: any) {
        state.authenticating = status;
    },
    setUser(state: { user: any}, user: any) {
        state.user = user;
    },
    cleanState(state: {
        user: any;
        authenticating: boolean;
        authenticationErrorCode: any;
        authenticationError: any;
    }) {
        state.user = {};
        state.authenticating = false;
        state.authenticationErrorCode = 0;
        state.authenticationError = "";
    }
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
