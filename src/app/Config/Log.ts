import { environment } from 'environments/environment';

export const Log = {
    d(msg: String) {
        if (!environment.production) {
            console.log("Log Msg is:" + msg)
        }
    }
};
