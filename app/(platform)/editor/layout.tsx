
function Layout({children} : {children: React.ReactNode}) {

  return (
    <div className="h-full" >
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout 