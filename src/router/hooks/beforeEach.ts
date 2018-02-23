import { NavigationGuard } from 'vue-router'
const beforeEach: NavigationGuard = async (to, from, next) => {
  next()
}
export default beforeEach
