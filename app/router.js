
require('./modules/account-manager').AccountManager;
var AM = new AccountManager();

module.exports = function(app) {
	
// login window //	
	
	app.get('/', function(req, res){
		res.render('index', { 
			locals: {
				title: 'Hello - Please Login To Your Account',
			}
		});
	});	
	
	app.post('/', function(req, res){
		if (req.param('email') == null){
			addAccount(req, res);
		}	else{
			getCredentials(req, res);
		}
	});
	
	function addAccount(req, res)
	{
	    AM.create({
	        user: req.param('user'),
	        pass: req.param('pass'),
	    }, function( e, obj) {
			if (!e){
				res.send('ok', 200);
			}	else{
				res.send('could not add record', 400);
			}
	    });		
	}
	
	function getCredentials(req, res)
	{
		console.log('email = '+req.param('email'));
		res.send('ok', 200);		
	}
	
// view & delete accounts //			
	
	app.get('/print', function(req, res) {
		AM.findAll( function(e, accounts){
			res.render('print', {
				locals: {
					title : 'Account List',
					accts : accounts
				}
			});
		})
	});	
	
	app.post('/delete', function(req, res){
		AM.delete(req.body.id, function(e, obj){
			if (!e){
	 			res.send('ok', 200);
			}	else{
				res.send('record not found', 400);
			}
	    });
	});
	
	app.get('/home', function(req, res) {
		res.render('home', { 
			locals: {
				title: 'Welcome',
			}
		});
	});
	
	app.get('/new-account', function(req, res) {
		res.render('new-account', { 
			locals: {
				title: 'Create Account',
			}
		});
	});
	
	app.post('/new-account', function(req, res){
		console.log(req.param('email'));
	 	res.send('ok', 400);
	//	user: req.param('user'),
	//	pass: req.param('pass'),
	});
		
	
// separate socket view for later ...
	
	app.get('/socket', function(req, res) {
		res.render('socket', {
			locals: { title : 'SF-Bridge'}
		});
	});		
 
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
	
};