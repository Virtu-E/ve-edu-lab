import React from 'react'
import { Route } from 'react-router-dom'
import Layout from './views/Layout/Layout'

export const withLayout = (
    routes: Array<{ path: string; element: React.ReactElement }>,
    noContainer = false
) => {
    return (
        <Route element={<Layout noContainer={noContainer} />}>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Route>
    )
}
