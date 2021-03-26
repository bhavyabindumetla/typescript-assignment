import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'
import { usersNormAdapter } from './users-normalizer-slice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const userNormSelector = usersNormAdapter.getSelectors<RootState>(state => state.usersNormRes)

// Rename the exports for readability in component usage
// export const {
//     selectById: selectUserById,
//     selectIds: selectUserIds,
//     selectEntities: selectUserEntities,
//     selectAll: selectAllUsers,
//     selectTotal: selectTotalUsers
//   } = usersAdapter.getSelectors(state => state.users)