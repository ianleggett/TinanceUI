/* Import Headers */
import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./redux/storeConfig/store"
import Spinner from "./components/Plugins/Spinner"

/* Import Styles */
import './index.scss';
import 'animate.css/animate.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'react-notifications-component/dist/theme.css'
import 'antd/dist/antd.css';

/* Import Router Module */
const Router = lazy(() => import("./Router"))

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <Router />
        </Suspense>
    </Provider>,
    document.getElementById("root")
)