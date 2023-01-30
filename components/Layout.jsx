import React from 'react'
import {Header} from './'


// every React component will have children, which is the components or div tag nested inside the current component
// this can be passed in props
// <Layout> {children}</Layout>
const Layout = ({children}) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default Layout