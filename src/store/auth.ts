import { defineStore } from "pinia";

export interface State {
  email: string | null;
  uid: string;
  photoURL?: string | null;
  displayName?: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    email: "",
    uid: "",
    photoURL: "",
    displayName: "",
  }),
  getters: {
    isSignedIn(state) {
      return Boolean(state.email && state.uid);
    },
  },
  actions: {
    login(newData: State) {
      this.$state = newData;
    },
    logout() {
      this.$reset();
    },
  },
});

// {
//   "uid": "c4JV65mYzDNHD1j0C1bh0XSwgSt2",
//   "email": "agustinus.10121231@mahasiswa.unikom.ac.id",
//   "emailVerified": true,
//   "displayName": "AGUSTINUS WESLY SITANGGANG",
//   "isAnonymous": false,
//   "photoURL": "https://lh3.googleusercontent.com/a/AGNmyxb65jk3vmVnEOPPsrgEgDn_CluMmQNiG5Evypjx=s96-c",
//   "providerData": [
//       {
//           "providerId": "google.com",
//           "uid": "113418447626021932676",
//           "displayName": "AGUSTINUS WESLY SITANGGANG",
//           "email": "agustinus.10121231@mahasiswa.unikom.ac.id",
//           "phoneNumber": null,
//           "photoURL": "https://lh3.googleusercontent.com/a/AGNmyxb65jk3vmVnEOPPsrgEgDn_CluMmQNiG5Evypjx=s96-c"
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "APJWN8c2cyTpyjUU38VzEvRfRjTjnZC4xpDlkmPgEyeM56Gq5_2Gm9sDX8XM1T0XfM9XVm1GwCCUjKiOFlEIl3ZvwKe6pzrxGfqJwuig2m1AhQ_nvgbsYNRGTmOD4wWZ4rWKBjJDOQv8uFT7rk4xBMryo8uK8WW_xAn0QHgmoQEeXtFyAaM3JwN3ZUvU4sT7CRxrEY2gWOuunviTrCgSEOtFuUUk4Ia9lbP-pVronvFvo4vWZNaEMxtOul2Gzk9A9V2fu_iTZESXA9ts09ihzzzteafIRSZXkL1vFfEvay8TuhLOKDbly2n2Do5nVBLK797f9zjmMvmtglleY-lKTqCeDqtYVMcyAJ3P5tVYdMuOTHzfD87M9CgEYn4YGRN9rQ-XCIyT7Fki1XBJcuDyLwvghQh_Ls9Ayk1RayreELk8xzRAq8h4yLlp7HxqNombCukH_CtjzlLkzvwEhR0-NRHEE63dKU8jAA",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQUdVU1RJTlVTIFdFU0xZIFNJVEFOR0dBTkciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YjY1amszdm1WbkVPUFBzcmdFZ0RuX0NsdU1tUU5pRzVFdnlwang9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXNlY3VyaXR5LTMyODI4IiwiYXVkIjoiZmlyLXNlY3VyaXR5LTMyODI4IiwiYXV0aF90aW1lIjoxNjc4OTUwNDQ0LCJ1c2VyX2lkIjoiYzRKVjY1bVl6RE5IRDFqMEMxYmgwWFN3Z1N0MiIsInN1YiI6ImM0SlY2NW1ZekROSEQxajBDMWJoMFhTd2dTdDIiLCJpYXQiOjE2Nzg5NTA0NDQsImV4cCI6MTY3ODk1NDA0NCwiZW1haWwiOiJhZ3VzdGludXMuMTAxMjEyMzFAbWFoYXNpc3dhLnVuaWtvbS5hYy5pZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzNDE4NDQ3NjI2MDIxOTMyNjc2Il0sImVtYWlsIjpbImFndXN0aW51cy4xMDEyMTIzMUBtYWhhc2lzd2EudW5pa29tLmFjLmlkIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.H0RuENNdcsMi0dlIGhJrQ3brfA-nm5fSCG0OiJ1RqtFS7pj5qV3ny2y390XBVj8qNXAKMvfMREXzrfFtuCbtwQoik2J2XfQ85nnWUAtUY5sNIOGwgX9DMbf6ItP8ZLM0Mpn-jNI1AyJ0OOgJVlJirGAvJYQOw0LG9KQvnKO76YJosmQPP45rhIxPP9vw6T04NCfR9njMt-K6k-jIOUVHtc-I69pf_-HIKUxUd-ROHsNLGedWVDWOU9F3w17X0Iqy2l2euN8WURAK_-nsdW9r12qLs4hFqsswbdYV58VshtCWbFFDDp2ynBDfnvAc6cazuO_0XC7H695BhWqs5u1Ppg",
//       "expirationTime": 1678954043870
//   },
//   "createdAt": "1678950444723",
//   "lastLoginAt": "1678950444724",
//   "apiKey": "AIzaSyD3JPbuLeh3DevbMoPL0w1RmGACwvU4p7Q",
//   "appName": "[DEFAULT]"
// }
