import {navigate, RouteComponentProps} from "@reach/router"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginData, loginUser, selectMessage, selectStatus, selectUsername } from "./userSlice";
import styles from '../../styles/Pages.module.css';
import { useAppSelector} from '../../app/hooks';


function Login(props: RouteComponentProps) {
    const [formValues, setValue] = useState({
        username: '',
        password: ''
    });
    const username = useAppSelector(selectUsername);
    const message = useAppSelector(selectMessage);
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    const logIn = (data:LoginData) => {
        dispatch(loginUser(data));
    }

    const valueChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({...formValues, [e.target.name]: e.target.value});
    }

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        logIn(formValues);
        setValue({...formValues, password: ''});
    }

    useEffect(()=> {
        // This is poor safety, we check with an endpoint and cand be redirected by server.
        if(status === 'logged') {
            navigate('/search');
        }
    })

    return (
        <form 
            className={styles.flexColumn}
            onSubmit={submitHandler}
            method="POST"
        >
            <p>{username}</p>
            <p>{message}</p>
            <input type="text" name="username" placeholder="Username" value={formValues['username']} onChange={valueChangeHandler} />
            <input type="password" name="password" placeholder="Password" value={formValues['password']} onChange={valueChangeHandler} />
            <input type="submit" value="Login"/>
        </form>
    );
}

export default Login;