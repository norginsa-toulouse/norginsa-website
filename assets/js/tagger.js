/* Fargene til taggene, ett sted.
 *
 * Én farge per tema, hentet fra Toulouse: pastellblå etter vaidplanten byen
 * ble rik på, sandstein, murstein og violette de Toulouse.
 *
 * Fargen betyr HVILKET tema. På filterknappene betyr fylt mot tonet om
 * taggen er valgt. Det er to forskjellige ting, og de må ikke blandes -
 * gjør man det, ser en ufiltrert liste ut som om noe allerede er valgt.
 */
window.TAGGFARGE = {
  "Studiet": "t-blaa",
  "Praktisk": "t-sand",
  "Livet i Toulouse": "t-tegl",
  "Studenthistorier": "t-violett",
};

window.taggKlasse = function (tagg) {
  return window.TAGGFARGE[tagg] || "t-noytral";
};
