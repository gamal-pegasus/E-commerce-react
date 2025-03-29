import {createRoot}from 'react-dom/client'
import App from './App'
import '../src/index.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/flowbite/dist/flowbite.js'
import 'swiper/css';

const root=createRoot(document.getElementById('root'))

root.render(<App/>)