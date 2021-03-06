
const Header =({handleOnSearch})=>{
    return(
    <>
        <div className='header'>
            <div className='row' >
                <div className="col-12  d-flex justify-content-around p-1 bg-dark text-white">
                    <h2>Crud List</h2>
                    <input type='text' placeholder='search'  name='searchValue'  onChange={handleOnSearch} style={{width:'270px',height:'40px'}} ></input>
                </div>
            </div>
        </div>
    </>
    )
}
export default Header;