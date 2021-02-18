import { state } from "@angular/animations";
import { Violation_List_Success, Violation_List_Request, Violation_List_Error} from "app/actions/violation-list";
import { Action } from "../actions";

export interface ViolationReducerState {
    loading: boolean;
    loaded: boolean;
    error: boolean;
    violations: any;
}

const initialState: ViolationReducerState = {
    loaded: false,
    loading: false,
    error: false,
    violations: []
};

export function ViolationReducer(state = initialState, action: Action): ViolationReducerState {
    switch (action.type) {
        case Violation_List_Request: {
            return {...state, loading: true};
        }
        case Violation_List_Error: {
            return {...state, error: true, loading: false};
        }
        case Violation_List_Success: {
            const updateViolations = state.violations.concat(action.payload.data);
            return {...state, loading: false, loaded: true, violations: updateViolations, error: false};
        }
        default: {
            return state;
        }
    }
}

//selectors

export const getLoading = (state: ViolationReducerState) => state.loading;
export const getLoaded = (state: ViolationReducerState) => state.loaded;
export const getViolations = (state: ViolationReducerState) => state.violations;
export const getError = (state: ViolationReducerState) => state.error;