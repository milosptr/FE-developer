jQuery(document).ready(function(){

    // active label
    jQuery('input').focus(function(){
        jQuery(this).closest('div').addClass('active border');
    })
    .blur(function(){
        if(jQuery(this).val().length === 0)
            jQuery(this).closest('div').removeClass('active');
        jQuery(this).closest('div').removeClass('border');
    });

    jQuery('input').change(function(){
        var numValid = 0;
        
        var currProgress = parseInt(document.querySelector('.progress-circle').getAttribute('data-progress'));

        jQuery(".form-body input[required]").each(function() {
            if(this.type == "radio" && this.validity.valid){
                numValid = numValid + 0.5;
            }
            else if(this.validity.valid) {
                numValid++;
            }
        });

        // Validity animation
        if(this.validity.valid)
            jQuery(this).parents('.form-group').find('svg').removeClass('hide');
        else    
            jQuery(this).parents('.form-group').find('svg').addClass('hide');
        

        progressCounter(currProgress, numValid*25);
    });


    jQuery('form').submit(function(e){
            e.preventDefault();
            var btn = $('form button');
            btn.addClass('loading').removeClass('success');
            
            setTimeout(function(){
                btn.removeClass('loading').addClass('success');
                btn.text("");
            },2000);
    });
});

// Progress function (counter)
function progressCounter(start, end){
    var diff = end - start;
    var curr = start;
    var inc = end > start ? 1 : -1;
    if(diff)
        var timer = setInterval(function(){
            curr += inc;
            var el = document.querySelector('.progress-circle');
            var elimg = document.querySelector('.progress-circle img');
            if(curr == 100){
                el.setAttribute('data-progress', curr);
                elimg.classList.remove('hide');
            } else {
                el.setAttribute('data-progress', curr);
                elimg.classList.add('hide');
            }
            if( curr == end) clearInterval(timer);
        }, 20);
}   