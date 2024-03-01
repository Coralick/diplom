function Button({children}  ){
    function handleClick(e){
        e.preventDefault()
        console.log('click')
    }
    return(
        <button className="button" onClick={handleClick}>{children}</button>
    )
}
export default Button