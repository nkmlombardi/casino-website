$('document').ready(function() {
	var webAuth = new auth0.WebAuth({
		domain: 'royale.auth0.com',
		clientID: '9bgYSC9O6xqfl2d7ioE6by8PsC6e06mA',
		redirectUri: 'http://localhost:3000/',
		audience: 'https://' + 'royale.auth0.com' + '/userinfo',
		responseType: 'token id_token',
		scope: 'openid'
	})

	var loginBtn = $('#btn-login')

	loginBtn.click(function(e) {
		e.preventDefault()
		webAuth.authorize()
	})
})

$('document').ready(function() {
	var loginStatus = $('.container h4')
	var loginView = $('#login-view')
	var homeView = $('#home-view')

	// buttons and event listeners
	var homeViewBtn = $('#btn-home-view')
	var loginBtn = $('#btn-login')
	var logoutBtn = $('#btn-logout')

	homeViewBtn.click(function() {
		homeView.css('display', 'inline-block')
		loginView.css('display', 'none')
	})

	loginBtn.click(function(e) {
		e.preventDefault()
		webAuth.authorize()
	})

	logoutBtn.click(logout)

	function setSession(authResult) {
		// Set the time that the Access Token will expire at
		var expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		)
		localStorage.setItem('access_token', authResult.accessToken)
		localStorage.setItem('id_token', authResult.idToken)
		localStorage.setItem('expires_at', expiresAt)
	}

	function logout() {
		// Remove tokens and expiry time from localStorage
		localStorage.removeItem('access_token')
		localStorage.removeItem('id_token')
		localStorage.removeItem('expires_at')
		displayButtons()
	}

	function isAuthenticated() {
		// Check whether the current time is past the
		// Access Token's expiry time
		var expiresAt = JSON.parse(localStorage.getItem('expires_at'))
		return new Date().getTime() < expiresAt
	}

	function handleAuthentication() {
		webAuth.parseHash(function(err, authResult) {
			if (authResult && authResult.accessToken && authResult.idToken) {
				window.location.hash = ''
				setSession(authResult)
				loginBtn.css('display', 'none')
				homeView.css('display', 'inline-block')
			} else if (err) {
				homeView.css('display', 'inline-block')
				console.log(err)
				alert(
					'Error: ' + err.error + '. Check the console for further details.'
				)
			}
			displayButtons()
		})
	}

	function displayButtons() {
		if (isAuthenticated()) {
			loginBtn.css('display', 'none')
			logoutBtn.css('display', 'inline-block')
			loginStatus.text('You are logged in!')
		} else {
			loginBtn.css('display', 'inline-block')
			logoutBtn.css('display', 'none')
			loginStatus.text('You are not logged in! Please log in to continue.')
		}
	}
})
