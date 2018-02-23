import { ActionTree, GetterTree, MutationTree } from 'vuex'

export type RootState = object
export type MutationTree<S> = MutationTree<S>
export type ActionTree<S> = ActionTree<S, RootState>
export type GetterTree<S> = GetterTree<S, RootState>
