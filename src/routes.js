import {createRouter} from 'vue-router'
import Profile from './components/Profile.vue'
import Welcomepage from './components/Welcomepage.vue'
import Error from './components/Error.vue'
const routes = [

    {
        path: `/profile/:id`,
        component:Profile
    },
    {
        path: '/',
        component:Welcomepage
    },
    {
        path: '/error',
        component: Error
    }
    ]
export default function (history) {
    return createRouter({
        history,
        routes
    })
}
