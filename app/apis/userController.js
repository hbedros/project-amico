const firebaseAdmin = require('./firebaseAdmin.js');
const UserController = {


	createUser : function(data){

		const User = {
			uid : data.uid,
			displayName : data.displayName,
			email : data.email,
		}

		return User;
	},

	/*validateUid : function(uid, success){
		firebaseAdmin.auth().getUser(uid)
		 .then(function(userRecord) {
		    // See the UserRecord reference doc for the contents of userRecord.
		    //console.log("Successfully fetched user data:", userRecord.toJSON());

		    return true;
		})
		.catch(function(error) {
			console.log("Error fetching user data:", error);
			return false;
		});
	},*/
	
	insertUser: function(User){
		
		const UserController = this;
		
			firebaseAdmin.database().ref('users/' + User.uid).set({
				uid : User.uid,
				email : User.email,
				displayName : User.displayName
			});
		
	},
	//just testing
	getUser : function(uid){
			
				const db = firebaseAdmin.database();
				const ref = db.ref("users/");
				ref.once("value", function(snapshot) {
				  console.log(snapshot.val());
				});	
	},
	//success is a callback that performs whatever action for the logged in user
	validateIdToken : function(idToken,success){
		try{

			firebaseAdmin.auth().verifyIdToken(idToken)
	  		.then(function(decodedToken) {
	    		const uid = decodedToken.uid;
	    		console.log('Validated Token for UID: ' + uid);
	    		success(uid);
	    		return true;
	  		}).catch(function(error) {
	     		console.log('ERROR DURING VALIDATION');
	     		console.log(error.message);
	     		return false;
	     	});
		}
	
		catch(error){
			console.log(new Error('Error during token validation'));
			console.log(error.message);
			return error.message;
		}

	}

}

module.exports = UserController;
