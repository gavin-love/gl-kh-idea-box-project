ideaBox();


function ideaBox() {
  
  var $titleInput = $('.title-input');
  var $bodyInput = $('.body-input');
  var $saveButton = $('.submit-button'); 
  var $searchInput = $('.search-input');
  var $cardTitle = $('.card-title');
  var $cardBody = $('.card-body');
  var $deleteButton = $('.delete-button');
  var $qualityValue = $('.quality-value'); 
  var $upVoteButton = $('.upvote-button');
  var $downVoteButton = $('.downvote-button');
  var $cardContainer = $('.idea-card')

  $saveButton.on('click', createIdeaCard);
  $bodyInput.on('keyup', toggleSaveButton);
  $titleInput.on('click', toggleSaveButton);
  // $cardContainer.on('click', '.delete-button', deleteCard);
  // $cardContainer.on('click', '.upvote-button', upVote);
  // $cardContainer.on('click', '.downvote-button', downVote);



  function createIdeaCard(event) {
    event.preventDefault();
    console.log('hello')
  }


  function toggleSaveButton() {

    if ($titleInput.val() && $bodyInput.val())
      $saveButton.prop('disabled', false);
    else {
      $saveButton.prop('disabled', true);
    };
  };
 
};

