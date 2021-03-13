import { Alert } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message: string) {
    return { type: Alert.SUCCESS, message };
}

function error(message: string) {
    return { type: Alert.ERROR, message };
}

function clear() {
    return { type: Alert.CLEAR };
}
