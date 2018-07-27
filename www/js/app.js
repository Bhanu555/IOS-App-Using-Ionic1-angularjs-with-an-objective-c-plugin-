
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
                          if(window.cordova && window.Keyboard) {
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          window.Keyboard.hideKeyboardAccessoryBar(true);
                          
                          // Don't remove this line unless you know what you are doing. It stops the viewport
                          // from snapping when text inputs are focused. Ionic handles this internally for
                          // a much nicer keyboard experience.
                          window.Keyboard.disableScroll(true);
                          }
                          if(window.StatusBar) {
                          StatusBar.styleDefault();
                          }
                          });
     })
.controller("ExampleController", ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
                                  
                                  // instantiate Twilio Programmable Video library
                                  const Video = Twilio.Video;
                                  
                                  // setup some vars
                                  var activeRoom;
                                  var previewTracks;
                                  var identity = "bhanu";
                                  var roomName;
                                  
                                  // Attach the Tracks to the DOM.
                                  function attachTracks(tracks, container) {
                                  tracks.forEach(function(track) {
                                                 container.appendChild(track.attach());
                                                 });
                                  }
                                  
                                  // Attach the Participant's Tracks to the DOM.
                                  function attachParticipantTracks(participant, container) {
                                  var tracks = Array.from(participant.tracks.values());
                                  attachTracks(tracks, container);
                                  }
                                  
                                  // Detach the Tracks from the DOM.
                                  function detachTracks(tracks) {
                                  tracks.forEach(function(track) {
                                                 track.detach().forEach(function(detachedElement) {
                                                                        detachedElement.remove();
                                                                        });
                                                 });
                                  }
                                  
                                  // Detach the Participant's Tracks from the DOM.
                                  function detachParticipantTracks(participant) {
                                  var tracks = Array.from(participant.tracks.values());
                                  detachTracks(tracks);
                                  }
                                  
                                  // When we are about to transition away from this page, disconnect
                                  // from the room, if joined.
                                  window.addEventListener('beforeunload', leaveRoomIfJoined);
                                  
                                  $rootScope.$on('$stateChangeSuccess',
                                                 function(event, toState, toParams, fromState, fromParams) {
                                                 leaveRoomIfJoined();
                                                 }
                                                 );
                                  
                                  
                                  // $http.get('TOKEN_URL', function(data) {
                                  
                                  // }).then(function(data) {
                                  //     console.log(data);
                                  //     debugger;
                                  //     console.log("Token = " + data.data.token);
                                  
                                  //     //document.getElementById('room-controls').style.display = 'block';
                                  
                                  //     // Bind click event and add token to data attribute
                                  //     document.getElementById('button-call').addEventListener('click', connect);
                                  //     document.getElementById('button-call').setAttribute('data-token', data.data.token);
                                  
                                  //     // Connect
                                  //     connect();
                                  
                                  //     // Bind button to leave Room.
                                  document.getElementById('LeaveRoom').onclick = function() {
                                  log('Disconnecting...');
                                  document.getElementById('call-connected').style.display = 'none';
                                  document.getElementById('spin-wrapper').style.display = 'none';
                                  document.getElementById('button-preview').style.display = 'block';
                                  document.getElementById('video-overlay').style.display = 'none';
                                  activeRoom.disconnect();
                                  };
                                  
                                  
                                  document.getElementById('JoinRoom').onclick =  function connect() {
                                  roomName = 'Anu';
                                  
                                  log("Joining room '" + roomName + "'...");
                                  
                                  
                                  
                                  var connectOptions = {
                                  name: 'Anu',
                                  logLevel: 'debug'
                                  };
                                  
                                  if (previewTracks) {
                                  connectOptions.tracks = previewTracks;
                                  }
                                  
                                  // Join the Room with the token from the server and the
                                  // LocalParticipant's Tracks.
                                  //Video.connect(token, connectOptions).then(roomJoined, function(error) {
                                  //                      log('Could not connect to Twilio: ' + //error.message);
                                  //
                                  cordova.videoconversation.open(RoomName = "Anu",Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdiYzNiODZlYTFiZjU3MDQ4MzUyZjNmYTY4NjlmMzQ5LTE1MzI3Mjk5ODYiLCJpc3MiOiJTSzdiYzNiODZlYTFiZjU3MDQ4MzUyZjNmYTY4NjlmMzQ5Iiwic3ViIjoiQUM2MjlkMTIzM2VhZDY0YjUzNDFkMjcyOGY1ZWIxNjBkYyIsImV4cCI6MTUzMjczMzU4NiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYmhhbnVzaHJlZSIsInZpZGVvIjp7InJvb20iOiJBbnUifX19._Qq9UXm70v_tnFzNiKFbkGyHO41E1XSklRu0IUoi0IE");
                                  //});
                                  document.getElementById('call-connected').style.display = 'block';
                                  document.getElementById('spin-wrapper').style.display = 'inline-flex';
                                  document.getElementById('button-preview').style.display = 'none';
                                  }
                                  
                                  // Successfully connected!
                                  function roomJoined(room) {
                                  window.room = activeRoom = room;
                                  
                                  log("Joined as '" + identity + "'");
                                  document.getElementById('button-call').style.display = 'none';
                                  document.getElementById('button-call-end').style.display = 'inline';
                                  
                                  // Attach LocalParticipant's Tracks, if not already attached.
                                  var previewContainer = document.getElementById('local-media');
                                  if (!previewContainer.querySelector('video')) {
                                  attachParticipantTracks(room.localParticipant, previewContainer);
                                  }
                                  
                                  // Attach the Tracks of the Room's Participants.
                                  room.participants.forEach(function(participant) {
                                                            log("Already in Room: '" + participant.identity + "'");
                                                            var previewContainer = document.getElementById('remote-media');
                                                            attachParticipantTracks(participant, previewContainer);
                                                            });
                                  
                                  // When a Participant joins the Room, log the event.
                                  room.on('participantConnected', function(participant) {
                                          //document.getElementById('remote-media').style.display = 'inline';
                                          log("Joining: '" + participant.identity + "'");
                                          });
                                  
                                  // When a Participant adds a Track, attach it to the DOM.
                                  room.on('trackAdded', function(track, participant) {
                                          log(participant.identity + " added track: " + track.kind);
                                          var previewContainer = document.getElementById('remote-media');
                                          document.getElementById('spin-wrapper').style.display = 'none';
                                          document.getElementById('video-overlay').style.display = 'flex';
                                          attachTracks([track], previewContainer);
                                          });
                                  
                                  // When a Participant removes a Track, detach it from the DOM.
                                  room.on('trackRemoved', function(track, participant) {
                                          log(participant.identity + " removed track: " + track.kind);
                                          detachTracks([track]);
                                          });
                                  
                                  // When a Participant leaves the Room, detach its Tracks.
                                  room.on('participantDisconnected', function(participant) {
                                          log("Participant '" + participant.identity + "' left the room");
                                          detachParticipantTracks(participant);
                                          });
                                  
                                  // Once the LocalParticipant leaves the room, detach the Tracks
                                  // of all Participants, including that of the LocalParticipant.
                                  room.on('disconnected', function() {
                                          log('Left');
                                          if (previewTracks) {
                                          previewTracks.forEach(function(track) {
                                                                track.stop();
                                                                });
                                          }
                                          detachParticipantTracks(room.localParticipant);
                                          room.participants.forEach(detachParticipantTracks);
                                          activeRoom = null;
                                          document.getElementById('button-call').style.display = 'inline';
                                          document.getElementById('button-call-end').style.display = 'none';
                                          document.getElementById('spin-wrapper').style.display = 'none';
                                          });
                                  }
                                  
                                  // Preview LocalParticipant's Tracks.
                                  document.getElementById('button-preview').onclick = function() {
                                  var localTracksPromise = previewTracks
                                  ? Promise.resolve(previewTracks)
                                  : Video.createLocalTracks();
                                  
                                  localTracksPromise.then(function(tracks) {
                                                          window.previewTracks = previewTracks = tracks;
                                                          var previewContainer = document.getElementById('local-media');
                                                          if (!previewContainer.querySelector('video')) {
                                                          attachTracks(tracks, previewContainer);
                                                          }
                                                          }, function(error) {
                                                          console.error('Unable to access local media', error);
                                                          log('Unable to access Camera and Microphone');
                                                          });
                                  };
                                  
                                  // document.getElementById('mute').onclick = function() {
                                  //     console.dir(room.localParticipant);
                                  //     room.localParticipant.audioTracks.disable();
                                  // };
                                  
                                  // Activity log.
                                  function log(message) {
                                  console.dir(message);
                                  return false;
                                  var logDiv = document.getElementById('log');
                                  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
                                  logDiv.scrollTop = logDiv.scrollHeight;
                                  }
                                  
                                  // Leave Room.
                                  function leaveRoomIfJoined() {
                                  if (activeRoom) {
                                  activeRoom.disconnect();
                                  }
                                  }
                                  
                                  }]);
