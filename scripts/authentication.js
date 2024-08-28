const initiateGoogleSignin = () => {
    google.accounts.id.initialize({
        client_id: '86537079534-penkko2851ln147m7dlqnub71h1r7ph4',
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt();
}

const handleCredentialResponse = jwt => {
    sessionStorage.setItem("credential", jwt.credential);
}