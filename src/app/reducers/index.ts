import * as fromViolation from './violation-reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ViolationReducer, ViolationReducerState } from './violation-reducer';

export interface RootReducerState {
    violations: fromViolation.ViolationReducerState
}
export const rootReducer: ActionReducerMap<RootReducerState> = {
    violations: fromViolation.ViolationReducer
}

export const getViolationState = (state: RootReducerState) => state.violations;

export const getViolationLoaded = createSelector(getViolationState, fromViolation.getLoaded);
export const getViolationLoading = createSelector(getViolationState, fromViolation.getLoading);
export const getViolations = createSelector(getViolationState, fromViolation.getViolations);
export const getViolationError = createSelector(getViolationState, fromViolation.getError);
