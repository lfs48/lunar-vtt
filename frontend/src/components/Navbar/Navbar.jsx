import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import tw from 'tailwind-styled-components';
import { logoutUser } from '../../store/reducers/session/sessionReducer';
import { TextButton1 } from '../../styles/components';

export default function Navbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const {user} = useSelector( (state) => ({
        user: state.session.user
    }));

    const handleLogout = (event) => {
        event.preventDefault();
        const action = {
            type: logoutUser.type
        };
        dispatch(action);
        history.push("/");
    }

    return(
        <Nav>
            <div></div>
            <div className="flex">
                <p className="mr-2">{user.username}</p>
                <TextButton1 onClick={e => handleLogout(e)}>Log Out</TextButton1>
            </div>
        </Nav>
    )
}

const Nav = tw.nav`
    w-full
    h-12
    bg-blue-300
    flex
    justify-between
    items-center
    px-12
`