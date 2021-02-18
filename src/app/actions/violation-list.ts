export const Violation_List_Request = 'Violation list request';
export const Violation_List_Success = 'Violation list success';
export const Violation_List_Error = 'Violation list error';

export class ViolationListRequestAction {
    readonly type = Violation_List_Request;
}

export class ViolationListErrorAction {
    readonly type = Violation_List_Error;
}

export class ViolationListSuccessAction {
    readonly type = Violation_List_Success;
    constructor(public payload?: { data: any}) {

    }
}
