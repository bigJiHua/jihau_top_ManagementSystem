import { defineStore } from 'pinia'
import { ref } from 'vue'
import useLocalStorage from '@/Hooks/useLocalStorage'

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: useLocalStorage.getLoc('token', false) ,
  }),
  getters: {
    getToken(): string | null {
      return this.token;
    },
    isToken(): boolean {
      return this.token !== null && this.token !== undefined;
    }
  },
});