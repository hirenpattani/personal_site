(function($){


		$(function(){

			$('#form').on('submit', function(e){
				e.preventDefault();

				var name = $('#name');
				var email = $('#email');
				var error = false;

				$('.error').remove();

				if(name.val() == '') {
					name.after("<p class='error' style='color: red;'>Name Should not be empty.</p>");
					error = true;
				}

				if(email.val() === '') {
					email.after("<p class='error' style='color: red;'>Email Should not be empty.</p>");
					error = true;
				}


			


				if(error == false){
					$.ajax({
					  type: "POST",
					  url: 'email.php',
					  data: {
					  	'j-name': name.val(),
					  	'j-email': email.val(),
					  },
					  success: function(result){
					  	$('.container').prepend(result);
					  }
					});
				}
				
			});

		});

})(jQuery);