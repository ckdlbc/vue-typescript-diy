import vue from 'vue'
declare global {
  const Vue: typeof vue
}
declare module 'vue/types/vue' {
  interface Vue {}
}
