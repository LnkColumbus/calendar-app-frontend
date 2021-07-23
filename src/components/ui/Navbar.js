import React from 'react';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Daniela</span>

                <button
                    className="btn btn-outline-danger"
                >
                    <i className="fas fa-sign-out-alt"><span> Salir</span></i>
                </button>
            </div>
        </nav>
    )
}

