(function () {
    $('document').ready(function () {
        var canvas = this.__canvas = new fabric.Canvas('c',{
            background: 'red'
        });
        var f = fabric.Image.filters;

        canvas.setHeight(650);
        canvas.setWidth(900);

        function applyFilter(index, filter) {
            var obj = canvas.getActiveObject();
            obj.filters[index] = filter;
            obj.applyFilters();
            canvas.renderAll();
        }

        function getFilter(index) {
            var obj = canvas.getActiveObject();
            return obj.filters[index];
        }

        function applyFilterValue(index, prop, value) {
            var obj = canvas.getActiveObject();
            if (obj.filters[index]) {
                obj.filters[index][prop] = value;
                obj.applyFilters();
                canvas.renderAll();
            }
        }


        canvas.on({
            'object:selected': function() {
                var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
                    'brightness', 'contrast', 'saturation', 'noise', 'vintage',
                    'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
                    'polaroid', 'blend-color', 'gamma', 'kodachrome',
                    'blackwhite', 'blend-image', 'hue', 'resize'];

            }
        });

        var canvasImage;

        $('img').on('click', function () {
            canvas.clear();
            $('#image-modal').modal('show');
            canvasImage = this;
            fabric.Image.fromURL(canvasImage.src, function(oImg) {
                mantainAspectRatio(oImg);
                canvas.add(oImg);
                //canvas.sendToBack(oImg);
            });
        });


        /*
           Color Matrix filters
         */

        $('.brownie').on('click', function() {
            debugger;
            applyFilter(4, this.checked && new f.Brownie());
        });
        $('.vintage').on('click',function() {
            applyFilter(9, this.checked && new f.Vintage());
        });
        $('.technicolor').on('click', function() {
            applyFilter(14, this.checked && new f.Technicolor());
        });
        $('.polaroid').on('click', function() {
            applyFilter(15, this.checked && new f.Polaroid());
        });
        $('.kodachrome').on('click', function() {
            applyFilter(18, this.checked && new f.Kodachrome());
        });
        $('.blackwhite').on('click', function() {
            applyFilter(19, this.checked && new f.BlackWhite());
        });

        $('.invert').on('click', function() {
            applyFilter(1, this.checked && new f.Invert());
        });

        $('.grayscale').on('click', function() {
            applyFilter(0, this.checked && new f.Grayscale());
        });
        $('#average').on('click', function() {
            applyFilterValue(0, 'mode', 'average');
        });
        $('#luminosity').on('click', function() {
            applyFilterValue(0, 'mode', 'luminosity');
        });
        $('#lightness').on('click', function() {
            applyFilterValue(0, 'mode', 'lightness');
        });
        /*
        ---------------------------------------------------------------
        ---------------------------------------------------------------
         */

        /*
            Brightness
         */
        $('#cbx-brightness').on('click', function () {
            debugger;
            applyFilter(5, this.checked && new f.Brightness({
                brightness: parseFloat($('#brightness-value').val())
            }));
        });
        $('#brightness-value').on('input',function() {
            applyFilterValue(5, 'brightness', parseFloat(this.value));
        });

        $('#distance-value').on('input', function() {
            applyFilterValue(2, 'distance', this.value);
        });

        $('#cbx-gamma').on('click', function () {
            var v1 = parseFloat($('#gamma-red').val());
            var v2 = parseFloat($('#gamma-green').val());
            var v3 = parseFloat($('#gamma-blue').val());
            applyFilter(17, this.checked && new f.Gamma({
                gamma: [v1, v2, v3]
            }));
        });
        $('#gamma-red').on('input', function() {
            var current = getFilter(17).gamma;
            current[0] = parseFloat(this.value);
            applyFilterValue(17, 'gamma', current);
        });
        $('#gamma-green').on('input',function() {
            var current = getFilter(17).gamma;
            current[1] = parseFloat(this.value);
            applyFilterValue(17, 'gamma', current);
        });
        $('#gamma-blue').on('input',function() {
            var current = getFilter(17).gamma;
            current[2] = parseFloat(this.value);
            applyFilterValue(17, 'gamma', current);
        });

        $('#cbx-contrast').on('click', function () {
            applyFilter(6, this.checked && new f.Contrast({
                contrast: parseFloat($('#contrast-value').val())
            }));
        });
        $('#contrast-value').on('input',function() {
            applyFilterValue(6, 'contrast', parseFloat(this.value));
        });

        $('#cbx-saturation').on('click', function () {
            applyFilter(7, this.checked && new f.Saturation({
                saturation: parseFloat($('#saturation-value').val())
            }));
        });
        $('#saturation-value').on('input', function() {
            applyFilterValue(7, 'saturation', parseFloat(this.value));
        });
        $('#cbx-noise').on('click', function () {
            applyFilter(8, this.checked && new f.Noise({
                noise: parseInt($('#noise-value').val(), 10)
            }));
        });

        $('#noise-value').on('input', function() {
            applyFilterValue(8, 'noise', parseInt(this.value, 10));
        });

        $('#cbx-pixelate').on('click', function() {
            applyFilter(10, this.checked && new f.Pixelate({
                blocksize: parseInt($('#pixelate-value').val(), 10)
            }));
        });

        $('#pixelate-value').on('input', function() {
            applyFilterValue(10, 'blocksize', parseInt(this.value, 10));
        });

        $('#cbx-blur').on('click', function() {
            applyFilter(11, this.checked && new f.Blur({
                value: parseFloat($('#blur-value').val())
            }));
        });

        $('#blur-value').on('input', function() {
            applyFilterValue(11, 'blur', parseFloat(this.value, 10));
        });

        $('#add-text').on('click',function () {
            canvas.add(new fabric.IText('Tap and Type', {
                fontFamily: 'Comic Sans',
                borderColor: 'black',
                fill: 'black',
                shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'

            }));
        });

        function mantainAspectRatio(image){
            image.scaleToWidth(canvas.getWidth());
            image.scaleToHeight(canvas.getHeight());
        }

        $('#reset').on('click',function () {
            canvas.clear();
            fabric.Image.fromURL(canvasImage.src,function (img) {
                mantainAspectRatio(img);
                canvas.add(img);
                canvas.renderAll();
            });
        })
    //    TODO: add cancel to modal and clear the canvas
    });
})();