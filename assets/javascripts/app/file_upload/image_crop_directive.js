(function(angular) {

  var
    definitions;

  definitions = [
    '$document',
    'FILE_EVENTS',
    pcImageCrop
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageCrop', definitions);

  function pcImageCrop($document, FILE_EVENTS) {
    var
      croppedImageDimensions = {},
      jcrop;

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      scope.$on('imagePreviewHasImage', createJcrop);

      function createJcrop() {
        var jcropHolder = elem.next();
        if (jcropHolder.length > 0) {
          jcrop.destroy();
          createCropper();
        }
        else {
          createCropper();
        }
      }

      function createCropper() {
        $(elem).Jcrop({
          onSelect: showCoords,
          onChange: showCoords,
          bgColor: 'black',
          bgOpacity: .60,
          minSize: [50, 50],
          aspectRatio: 15 / 9,
          boxWidth: 300,
          allowMove: true
        }, function() {
          jcrop = this;
        });
      }

      function showCoords(c) {
        croppedImageDimensions["x"] = Math.floor(c.x);
        croppedImageDimensions["y"] = Math.floor(c.y);
        croppedImageDimensions["x2"] = Math.floor(c.x2);
        croppedImageDimensions["y2"] = Math.floor(c.y2);
        croppedImageDimensions["w"] = Math.floor(c.w);
        croppedImageDimensions["h"] = Math.floor(c.h);
      }
    }

  }

})(angular);