import React, {useState} from 'react'
import './App.css'
import app from './modules/firebase'

function App() {
    const [userIntent, setUserIntent] = useState('Register')
    const [appUser, setAppUser] = useState(undefined)

    const onSubmit = async event => {
        event.preventDefault();
        const [email, password] = event.target;

        if (userIntent == 'Register') {
            const response = await app.auth().createUserWithEmailAndPassword(email.value, password.value)
            console.log('Auth. response:', response)
            setAppUser(response.user)
        } else {
            const response = await app.auth().signInWithEmailAndPassword(email.value, password.value)
            console.log('Auth. response:', response)
            setAppUser(response.user)
        }
        console.log(appUser)
    }

    return (
        <main>
            {!appUser &&
            <form onSubmit={onSubmit} id='loginform'>
                <h1>{userIntent}</h1>
                <input type='email' placeholder="email"/>
                <input type='password' placeholder="password"/>
                <input type='submit' value={userIntent}/>
                <button onClick={() => setUserIntent(userIntent == 'Register' ? 'Login' : 'Register')}>
                    {userIntent == 'Register' ? 'Login' : 'Register'} instead
                </button>
            </form>
            }
            {appUser && <h1>Welcome {appUser.email}</h1>}
        </main>
    );
}

export default App
