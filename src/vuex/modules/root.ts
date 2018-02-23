import { MutationTree, ActionTree, GetterTree } from '../vuex.d'
interface StateTree {
  [key: string]: any
}
const state: StateTree = {}

const mutations: MutationTree<StateTree> = {}

const actions: ActionTree<StateTree> = {}
const getters: GetterTree<StateTree> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
