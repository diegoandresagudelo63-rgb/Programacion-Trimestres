export const Login = () => {
    return (
        <p>Login</p>
    )
}


    return (
        <div className='containerLogin'>
            <div className='contedorImagen'></div>
            <div className='contenedorForm'></div>
                <h2>Login</h2>
                <form onSubmit={accesLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlImput1" className="form-label">usuario</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">contraseña</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-primary col-12'>Acceder</button>
                    </div>
                    
                </form>



        </div>
    )