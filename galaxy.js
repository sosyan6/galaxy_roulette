const request = require( 'request' );

const getCookie = () => new Promise( resolve => {
	request.post( {
		uri: 'https://galaxymobile-members.jp/pointchance/login',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: 'data[coupon_id]=PC301goDapdRbvky1Y7V'
	}, ( err, res, body ) => {
		if( err ) return;
		for( var c of res.headers['set-cookie'] ){
			if( c.match( /CAKEPHP_SUGOROKU/ ) ){
				resolve( c.match( /CAKEPHP_SUGOROKU=[^;]+;/ )[0] );
			}
		}
	} );
} );

getCookie().then( cookie => {
	request.get( {
		uri: 'https://galaxymobile-members.jp/pointchance/api/roulette/?deluxe=1',
		headers: { Cookie: cookie }
	}, ( err, res, body ) => {
		console.log( res.body );
	} );
} );