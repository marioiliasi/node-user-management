import { Alert } from '../constants';

export function alert(state = {}, action: any) {
    switch (action.type) {
        case Alert.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case Alert.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case Alert.CLEAR:
            return {};
        default:
            return state
    }
}
