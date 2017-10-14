
import { ROUTES } from 'core/constants'

export const initialState = {
    user: {},
    appState: {},
    navigation: {
        route: {
            name: ROUTES.HOME,
            title: "Welcome",
            props: null
        }
    },
};