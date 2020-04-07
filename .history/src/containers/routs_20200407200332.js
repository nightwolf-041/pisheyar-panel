// this file is includes all routes of projects and send to App component

import React from 'react';

const HomePage = React.lazy(() =>
    import ('../components/panelMainPathes/homePage/HomePage'))
const DataTable = React.lazy(() =>
    import ('../components/panelMainPathes/dataTable/Datatable'))
const ChatBox = React.lazy(() =>
    import ('../components/panelMainPathes/chatBox/ChatBox'))
const SettingsPage = React.lazy(() =>
    import ('../components/panelMainPathes/settingsPage/SettingsPage'))
const PostCreate = React.lazy(() =>
    import ('../components/panelMainPathes/postCreate/PostCreate'))
const PostsList = React.lazy(() =>
    import ('../components/panelMainPathes/postsList/PostsList'))
const SinglePost = React.lazy(() =>
    import ('../components/panelMainPathes/singlePost/SinglePost'))
const PostEdit = React.lazy(() =>
    import ('../components/panelMainPathes/postEdit/PostEdit'))
const CategoriesList = React.lazy(() =>
    import ('../components/panelMainPathes/categoriesList/CategoriesList'))
const Categories = React.lazy(() =>
    import ('../components/panelMainPathes/categories/Categories'))
const notFound = React.lazy(() =>
    import ('../components/404/notFound'))


const routs = [
    { exact: true, path: '/', component: HomePage },
    { exact: true, path: '/list', component: DataTable },
    { exact: true, path: '/chat', component: ChatBox },
    { exact: true, path: '/postCreate', component: PostCreate },
    { exact: true, path: '/postsList', component: PostsList },
    { exact: true, path: '/settings', component: SettingsPage },
    { exact: true, path: '/singlePost', component: SinglePost },
    { exact: true, path: '/postEdit', component: PostEdit },
    { exact: true, path: '/categoriesList', component: CategoriesList },
    { exact: true, path: '/category', component: Categories },
    { path: '*', component: notFound }
]

export default routs