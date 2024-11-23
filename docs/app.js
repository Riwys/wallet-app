document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    
});

let user;

function handleReceivedData(data) {
    console.log(data);
    let message = document.querySelector('#message');
    message.innerHTML = `Hey ${data.Name}, your total balance is ${data.balance}`;
}

function googleLogin() {
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
    .then(async result => {
        user = result.user;
        console.log(user)
        // window.location.assign('./home.html');
        document.body.outerHTML = "<h2>Welcome to Wallet App</h2>"
        document.body.insertAdjacentHTML('beforeend', `<h3 id="message"></h3>
                                                        <h3>Update My Balance</h3>
                                                        <input id="inputArea">
                                                        </input>
                                                        <button
                                                        onclick="updatePost(event)">
                                                        Update My Balance
                                                        </button>`);

        //database
        const db = firebase.firestore();

        const myUser = db.collection('users').doc(user.uid);

        if(!myUser) {
            db.collection('users').doc(user.uid).set({
                Name: user.displayName,
                createdAt: new Date(),
                balance: 0
            })
            console.log('creating user');
        }

        await myUser.onSnapshot(doc => {
            console.log(doc);
            const data = doc.data();
            handleReceivedData(data);
        })
       

        button.addEventListener( 'click', showInput );
        function showInput() {
            let buttons = document.getElementsByClassName('buttonStyle');
            let button = buttons[0];
            console.log(button);
            button.remove();
            document.body.insertAdjacentHTML('afterend', `<br> 
                <label for='amount to be added'>
                Say the amount to be added
                </label>
                <br><br> 
                <input type='text' 
                name='amount to be added' 
                placeholder='type it'>
                <button class='submit'
                id='submit'
                onclick="handleSubmit">
                Submit
                </button>`); 
        }

    })
    .catch(console.log)
}


function updatePost(e) {
    const db = firebase.firestore();
    const myUser = db.collection('users').doc(user.uid);
    let input = document.querySelector('#inputArea')
    myUser.update({ balance: input.value })
}