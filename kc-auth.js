import Keycloak from './keycloak.js';

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "realm_sis_webapp",
    clientId: "web-app"
});

document.getElementById('loginBtn').addEventListener('click', () => {
    console.log("Connecting...");
    
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        if (authenticated) {
            
            const roles = keycloak.tokenParsed["resource_access"]?.["web-app"]?.roles || [];
            console.log(keycloak.tokenParsed)
            console.log(roles)
            const isAdmin = roles.includes('admin')
            document.getElementById('message').textContent = isAdmin ? 'You are admin!' : 'You are user!';
        } else {
            console.log('User not authenticated');
        }
    }).catch(error => {
        console.error('Keycloak initialization failed', error);
    });
});

document.getElementById('registerBtn').addEventListener('click', () => {

    const keycloakUrl = "http://localhost:8080";
    const realm = "realm_sis_webapp";
    const clientId = "web-app";
    const redirectUri = encodeURIComponent("http://127.0.0.1:3000");

    const registerUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/registrations`
        + `?client_id=${clientId}`
        + `&redirect_uri=${redirectUri}`
        + `&response_type=code`
        + `&scope=openid`;

    window.location.href = registerUrl;
});