import { userConstants } from '../constants';
import {User} from "../services/user";

export function users(state: any = {}, action: any) {
    switch (action.type) {
        case userConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETBYID_SUCCESS:
            return {
                item: action.user
            };
        case userConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.ADD_EMPTY:
            console.log('*******' + JSON.stringify(state));
            return {
                ...state,
                items: [...state.items, action.user]
            };
        case userConstants.REFRESH:
            return {
                ...state,
                items: state.items.map((user: User) => user._id === action.id ? action.user : user)
            };
        case userConstants.CREATE_REQUEST:
            return {
                items: state.items
            };
        case userConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: [...state.items.filter((user: User) => user._id.length > 0), action.user]
            };
        case userConstants.CREATE_FAILURE:
            return {
                items: state.items.filter((user: User) => user._id !== action.id)
            };
        case userConstants.UPDATE_REQUEST:
            return {
                items: state.items
            };
        case userConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: state.items.map((user: User) => user._id === action.id ? action.user : user)
            };
        case userConstants.UPDATE_FAILURE:
            return {
                items: state.items
            };
        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being del
            return {
                ...state,
                items: state.items.map((user: User) =>
                    user._id === action.id
                        ? { ...user, deleted: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,
                items: state.items.filter((user: User) => user._id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map((user: User) => {
                    if (user._id === action.id) {
                        // make copy of user without 'deleting:true' property
                        user.deleted = false;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...user, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}
