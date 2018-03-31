ideaBox();


function ideaBox() {
  
  var $titleInput = $('.title-input');
  var $bodyInput = $('.body-input');
  var $saveButton = $('.submit-button'); 
  var $searchInput = $('.search-input');
  var $cardTitle = $('.card-title');
  var $cardBody = $('.card-body');
  var $cardContainer = $('.idea-card')

  $saveButton.on('click', appendIdeaCard);
  $bodyInput.on('keyup', toggleSaveButton);
  $titleInput.on('click', toggleSaveButton);
  $cardContainer.on('click', 'li .delete-button', deleteCard);
  $cardContainer.on('click', 'li .upvote-button', upVote);
  $cardContainer.on('click', '.downvote-button', downVote);



  function appendIdeaCard(event) {
    event.preventDefault();
    
    var title = $titleInput.val();
    var body = $bodyInput.val();

    $cardContainer.append(`
      <li>
        <h1 class="card-title">${title}</h1>
        <button class="delete-button buttons-style"></button>
        <p class="card-body">${body}</p>
        <button class="upvote-button buttons-style up-down-style"></button>
        <button class="downvote-button buttons-style up-down-style"></button>
        <p class="quality">quality:<span class="quality-value">swill</span></p>
        <hr>
      </li>
    `);
    };


  function upVote() {
    var $quality = $('.quality-value');
    var qualityValue = $quality.html()

    if (qualityValue === 'swill') {
      $quality.text('plausible');
    } else if (qualityValue === 'plausible') {
      $quality.text('Genius');
    };
  };

  function downVote() {
    var $quality = $('.quality-value');
    var qualityValue = $quality.html()

    if (qualityValue === 'Genius') {
      $quality.text('plausible');
    } else if (qualityValue === 'plausible') {
      $quality.text('swill');
    };
  };

  function deleteCard() {
    this.closest('li').remove()
  };

  function toggleSaveButton() {

    if ($titleInput.val() && $bodyInput.val())
      $saveButton.prop('disabled', false);
    else {
      $saveButton.prop('disabled', true);
    };
  };
 
};

