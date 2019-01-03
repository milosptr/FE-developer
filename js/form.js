jQuery(document).ready(function(){

    // active label
    jQuery('input').focus(function(){
        jQuery(this).closest('div').find('label').addClass('active');
    }).blur(function(){
        if(jQuery(this).val().length === 0)
            jQuery(this).closest('div').find('label').removeClass('active');
        else
           { var progress = jQuery('label.active').length*25;
            var currProgress = parseInt(document.querySelector('.form-progress').innerText.slice(0,-1));
            //progress = progress - currProgress;

            progressCounter(currProgress, progress);
            //document.querySelector('.form-progress').innerText =  progress+currProgress+ "%";
                    }
    });

    // Progress function (counter)
    function progressCounter(start, end){
        var diff = end - start;
        var curr = start;
        var inc = end > start ? 1 : -1;

        var timer = setInterval(function(){
            curr += inc;
            var el = document.querySelector('.form-progress');
            el.innerText = curr + "%";
            if( curr == end) clearInterval(timer);
        }, 100);
    }   
});