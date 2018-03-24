$( document ).ready(function(){

  function displayUserProfile(user){
    firebase.auth().onAuthStateChanged(function(user) {
    if(firebase.auth().currentUser){
      if(firebase.auth().currentUser){
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
         $.ajax({
            url: '/profile/'+user.uid,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('idtoken',idToken)
            },
            data: {},
            success: function (currentUser) {
             
              $('.current-user-email').text(currentUser.email);
              $('.current-user-bio').text(currentUser.bio);
              $('.current-user-name').html(currentUser.displayName);
              $('.current-user-avatar').attr("src",currentUser.avatarUrl);

            },
            error: function () { },
        });
       })
    
   

      /*
     */
    }
       else{
        //POP UP MODAL FOR NOT LOGGED IN
        console.log('Not logged in...');
      }
    }
  });
  
}
  
  function initialize(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      displayUserProfile(user);
    } else {
      // No user is signed in.
    }
    });
  }




  function createNewProfile(displayName,email){
    const user = {
      displayName : displayName,
      email : email
    }
    if(firebase.auth().currentUser){
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        $.post('/profile',{user:user,idToken:idToken}).then(function(data){
          console.log(data) 
          window.location = "/home";
        });
      }).catch(function(error) {
          //POP UP ERROR MODAL WITH ERROR MESSAGE
          console.log('Error...' + error);
      });
    }
    else{
        //POP UP MODAL FOR NOT LOGGED IN
        console.log('Not logged in...');
      }
    }

    initialize();

    $(document).on('click','.save-profile',function(){
      console.log('sup');
        const displayName = $('#inputName').val();
        const email = $('#email').text;
        createNewProfile(displayName,email);
        
      });


    
    
 });