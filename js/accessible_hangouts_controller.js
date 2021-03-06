/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
 
function AccessibleHangoutsController() {
  var version = new VersionManager(this);
  version.init();
  this.volume = settings.volume;
  this.pitch = settings.pitch;
  this.speed = settings.speed;
}

/**
 * Setup the events for this controller.
 */
AccessibleHangoutsController.prototype.init = function() {
  chrome.extension.onRequest.addListener(this.onExternalRequest.bind(this));
};

/**
 * Listen on requests coming from content scripts.
 *
 * @param {object} request The request object to match data.
 * @param {object} sender The sender object to know what the source it.
 * @param {Function} sendResponse The response callback.
 */
AccessibleHangoutsController.prototype.onExternalRequest = function(request, sender, sendResponse) {
  if (request.method == 'Speak') {
    this.speak(request.data);
  }
  sendResponse({});
};

/**
 * Uses the Chrome TTS API to use native OS speech, to talk back to the user.
 *
 * @param {string} text The speech to speak.
 * @param {Object} opt Optional parameters to set.
 */
AccessibleHangoutsController.prototype.speak = function(text, opt) {
  var optional = opt || {};
  var volume = optional.volume || this.volume;
  var pitch = optional.pitch || this.pitch;
  var speed = optional.speed || this.speed;
  chrome.tts.speak(text, {enqueue: true, volume: volume, pitch: pitch, rate: speed});
};