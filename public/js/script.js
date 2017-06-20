  $(document).ready(() => {
      console.log('scripts loaded');
      // button to get my searches from the API going.
      $('.gameB').click('submit', e => {
          e.preventDefault();

          //start of ajax call

          $.ajax({
              method: 'GET',
              url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=49&offset=0&order=release_dates.date%3Adesc&search=' + $('.nameInput').val(),
              headers: { 'X-Mashape-Key': 'rUfQ14viiSmshLTbHI0tLcLsX3hOp1coLC3jsnr5wHHnC6Mi7h' },
              success: response => {
                  // console.log(response);
                  response.forEach((response) => {
                      // console.log(response.name);
                      // console.log(response.cover ? response.cover : "https://s-media-cache-ak0.pinimg.com/564x/29/fa/14/29fa1441f2a0446e9aa45cee74495a83.jpg");
                      // console.log(response.release_dates[0].human);
                      // console.log(response.summary);
                      // console.log(response.id);
                      handleResponse(response);
                  });
              },
              error: msg => {
                  console.log(msg);
              }
          }); //end of ajx call
      }); //end of submit form
// getting responses from the API and appending them to the dom. after the on click.
      const handleResponse = function(response) {
          const gid = response.id;
          const name = response.name;
          const image = function() {
              if (response.cover) {
                  return response.cover.url
              } else {
                  return "https://s-media-cache-ak0.pinimg.com/564x/29/fa/14/29fa1441f2a0446e9aa45cee74495a83.jpg"
              }
          };

          const releaseText = response.release_dates[0].human ? response.release_dates[0].human : "data not available";

          const summary = response.summary ? response.summary : "Summary not Availible";
          // console.log(summary);


          const comments = ('Insert Comment Here');

          appendGame(gid, name, image, releaseText, summary, comments);
          // console.log(comments);
      }; //end of handle responses

      const appendGame = function(gid, name, image, release, summary, comments) {
          const $gameL = $('#gameList');
          const $gameDiv = $('<div class="game-div" id= ' + gid + '>');
          // console.log($gameDiv + "=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================");

          const $gameId = $('<p>' + gid + '</p>');
          const $newName = $('<h2 class="welHead">' + name + '</h2>');
          const $newRelease = $('<h3 class="blogin">' + release + '</h3>');
          const $newImage = $('<img>');
          const $newSummary = $('<p class="blogin">' + summary + '</p>');
          const $newComments = $('<p class="comField">' + comments + '<p>');

          // save button that saves users games to their wishlist
          const $newButton = $('<button  id="blogin" class = "saveButton">').on('click', function(e) {
              // console.log(e)
              let m = $(e.target).parent();
              let children = m.children();
              let name = $(children[0]).text(),
                  gid2 = $(children[1]).text(),
                  image = $(children[2]).attr('src'),
                  summary = $(children[3]).text(),
                  release = $(children[4]).text(),
                  comments = $(children[5]).text();

              const newGameData = { gid: gid2, name: name, image: image, release: release, summary: summary, comments: comments };
              // console.log(newGameData);
              $.ajax({
                  method: 'POST',
                  url: '/api/games',
                  data: newGameData,
                  success: response => {
                      // console.log(response.user_id);
                      // console.log(repo)
                      window.location.replace('/games/saved/' + response.user_id);
                  },
                  error: function(error) {
                      // console.log('error on line 108');
                  }
              }); //end of post ajax call

              $newComments.css('display', 'block');
          }); //end of save button click method.
          // console.log($newButton);
          $newImage.attr('src', image);
          $newButton.text('Save');
          $gameId.css('display', 'none');
          $newComments.css('display', 'none');
          $gameDiv.append($newName);
          $gameDiv.append($gameId);
          $gameDiv.append($newImage);
          $gameDiv.append($newRelease);
          $gameDiv.append($newSummary);
          $gameDiv.append($newComments);
          $gameDiv.append($newButton);
          $('article').append($gameDiv);

      }; //end of append game

      $('.edit-game-form').on('submit', e => {
          e.preventDefault(); // stops default behavior of page refresh
          const comments = $('.game-comments-input').val(),
              id = $('.game-id-input').val();
          // create new object to send form data in
          const newComData = { comments: comments, id: id };
          // console.log(newComData);
          // start of ajax put method.
          $.ajax({
              method: 'PUT',
              url: '/api/games/' + id,
              data: newComData,
              success: response => {
                  // console.log(response);
                  window.location.replace('/games/saved/' + response.user_id);
              },
              error: msg => {
                  // console.log(msg);
              }
          }); // ends ajax method
      }); // ends of edit form

      $('.deleteGame').on('click', function(e) {
          // console.log(e);
          // console.log('inside delete game');
          const gameId = $(this).data('id');
          // console.log(gameId);
          $.ajax({
              method: 'DELETE',
              url: '/api/games/' + gameId,
              success: response => {
                  // console.log('success');
                  // console.log("========" + $(this).user_id);
                  console.log(response);
                  window.location.replace('/games/saved/' + response.user_id);
              },
              error: msg => {
                  console.log('error', msg)
              }
          }); // ends ajax method
      }); // end of delete form
  }); //end of doc ready
