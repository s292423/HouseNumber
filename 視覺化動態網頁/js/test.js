var popup = elem_id('popup');
var popup_closer = elem_id('popup-closer');
var popup_content = elem_id('popup-content');
var olpopup = new ol.Overlay({
    element: popup,
    autoPan: false
});
map.addOverlay(olpopup);
popup_closer.onclick = function () {
    olpopup.setPosition(undefined);
    return false;
};
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
        if (feature) {
            var coord = map.getCoordinateFromPixel(evt.pixel);
            if (typeof feature.get('features') === 'undefined') {
                popup_content.innerHTML = '<h5><b>' + feature.get('name') + '</b></h5><i>this is an <b>unclustered</b> feature</i>';
            } else {
                var cfeatures = feature.get('features');
                if (cfeatures.length > 1) {
                    popup_content.innerHTML = '<h5><strong>all "Sub-Features"</strong></h5>';
                    for (var i = 0; i < cfeatures.length; i++) {
                        $(popup_content).append('<article><strong>' + cfeatures[i].get('name') + '</article>');
                    }
                }
                if (cfeatures.length == 1) {
                    popup_content.innerHTML = '<h5><strong>' + cfeatures[0].get('name') + '</strong></h5><i>this is a single, but <b>clustered</b> feature</i>';
                }
            }
            olpopup.setPosition(coord);
        } else {
            olpopup.setPosition(undefined);
        }
    });
});