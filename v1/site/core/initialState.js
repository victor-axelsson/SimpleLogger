
import { ROUTES } from 'core/constants'

export const initialState = {
    user: {},
    appState: {
        namespaces: null,
        entries: null
    },
    navigation: {
        route: {
            name: ROUTES.HOME,
            title: "Welcome",
            props: null
        }
    },
};