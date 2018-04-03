
ideaBox();

function ideaBox() {
  var $titleInput = $('.title-input');
  var $bodyInput = $('.body-input');
  var $saveButton = $('.submit-button'); 
  var $searchInput = $('.search-input');
  var $cardTitle = $('.card-title');
  var $cardBody = $('.card-body');
  var $cardContainer = $('.idea-card');
  var string;
  var object;

  $saveButton.on('click', getIdeaTitleBody);
  $bodyInput.on('keyup', toggleSaveButton);
  $titleInput.on('click', toggleSaveButton);
  $cardContainer.on('click', 'li .delete-button', deleteCard);
  $cardContainer.on('click', 'li .upvote-button', upVote);
  $cardContainer.on('click', 'li .downvote-button', downVote);
  $cardContainer.on('blur', 'li .card-title', editText);
  $cardContainer.on('blur', 'li .card-body', editText);

  function IdeaCard(object) {
    this.id = object.id;
    this.title = object.title;
    this.body = object.body;
    this.quality = object.quality;
  }


  function getIdeaTitleBody(event) {
    event.preventDefault();
    id = $.now();
    title = $titleInput.val();
    body = $bodyInput.val();
    quality = 'swill';

    var card = new IdeaCard({id: id, title: title, body: body, quality: quality});

    appendCard(card);
    sendToLocalStorage(card,id);
    };

  function appendCard(object) {
    $cardContainer.append(`
      <li id=${object.id}>
        <h1 contenteditable="true" class="card-title">${object.title}</h1>
        <button class="delete-button buttons-style"></button>
        <p contenteditable="true" class="card-body">${object.body}</p>
        <button class="upvote-button buttons-style up-down-style"></button>
        <button class="downvote-button buttons-style up-down-style"></button>
        <p class="quality">quality:<span class="quality-value">swill</span></p>
        <hr>
      </li>
    `);
  };

  function upVote() {
    pullFromLocalStorage(this);

    var quality = $(this).siblings('p').children('span');

    if ( quality.html() === 'swill') {
        $(this).siblings('p').children('span').html('plausible');
        quality = $(this).siblings('p').children('span').html('plausible')
        object.quality = 'plausible';
    } else if (quality.html() === 'plausible') {
        $(this).siblings('p').children('span').html('Genius');
        object.quality = 'Genius';
    };

    updateLocalStorage(object);
  };

  function downVote() {
    pullFromLocalStorage(this);

    var quality = $(this).siblings('p').children('span');

    if ( quality.html() === 'Genius') {
        $(this).siblings('p').children('span').html('plausible');
        quality = $(this).siblings('p').children('span').html('plausible')
        object.quality = 'plausible';
    } else if (quality.html() === 'plausible') {
        $(this).siblings('p').children('span').html('swill');
        object.quality = 'swill';
    };

    updateLocalStorage(object);
  };

  function deleteCard() {
    deleteCardStorage(this);

    $(this).closest('li').remove()
  };

  function toggleSaveButton() {

    if ($titleInput.val() && $bodyInput.val())
      $saveButton.prop('disabled', false);
    else {
      $saveButton.prop('disabled', true);
    };
  };

  function editText() {
    title = $(this).text();
    body = $(this).text();

    pullFromLocalStorage(this);

    object.title = title;
    object.body = body;

    updateLocalStorage(object);
  };

  function initPageLoad() {
    for (var i = 0; i < localStorage.length; i++) {
      string = localStorage.getItem(localStorage.key(i));
      object = JSON.parse(string);

      appendCard(object);
    };
  };

  function sendToLocalStorage(card,id) {
    var cardToStore = card;
    var stringifiedCard = JSON.stringify(cardToStore);

    localStorage.setItem(id, stringifiedCard);
  };

  function deleteCardStorage(that) {
    var id = $(that).closest('li').attr('id');
 
    string = localStorage.removeItem(id);   
  };

  function pullFromLocalStorage(that) {
    var id = $(that).closest('li').attr('id');
 
    string = localStorage.getItem(id);
    object = JSON.parse(string);
  };

  function updateLocalStorage(object) {
    string = JSON.stringify(object);

    localStorage.setItem(object.id, string)
  };

  initPageLoad();
};

