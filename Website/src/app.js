
import $ from 'jquery';
window.$ = $;

// Logic
$(document).ready(Begin);

function Begin(){
    console.log('Begin');
    $('form').trigger('reset');         // Clear the forms.
    $('.active').removeClass('active'); // Clear buttons
    $('button[type="submit"]')
        .on('click',
            function(e){
                e.preventDefault();
                let form_id = $(e.target).attr('form_id');
                LogResponses(form_id);
            })
    // Hide follow-up questions untill needed.
    setup_consent(); // Disable Begin button until consent given
    prepare_followup('tested', 'yes', 'tested-followup');
    prepare_followup('fever', 'yes', 'fever-followup');
    prepare_followup('fever_still', 'no', 'fever_still-followup');
    prepare_followup('cough', 'yes', 'cough-followup');
    prepare_followup('cough_still', 'no', 'cough_still-followup');
    // Disable Back button
    // TODO: Use
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
        window.history.pushState(null, "", window.location.href);
    };

    window.stage = 0;
    window.session_id = random_string();
    // Ready to begin.
    $('body').show();
    AskStage(window.stage);
}

function AskStage(stage){
    // Stage is an integer, stored as `window.stage`,
    // e.g. you should only ever call `AskStage(window.stage)`
    console.log('AskStage: ' + stage);
    $('form').hide();
    $('#form' + stage).show();
}

function LogResponses(form_id){
    // Log responses to this stage of the form,
    // and show the next one.
    if(form_id != 'form0'){
        // Form 0 is just instructions, nothing to log.
        console.log('LogResponses: ' + form_id);
        let form = $('#' + form_id);
        let data = serial_array_to_object(form.serializeArray());
        data['session_id'] = window.session_id;
        data['form'] = form_id;
        console.log(data);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: './log.php',
            success: function(resp) {
                console.log(resp);
            }
        });
    }
    window.stage += 1;
    AskStage(window.stage);
}




// Utilities
function serial_array_to_object(array){
    // Useful for dealing with serialise form data.
    let out = {};
    $.map(array, function(n, i){
        out[n['name']] = n['value'];
    });
    return(out);
}

function prepare_followup(q1_name, q1_value, q2_id){
    // When the value of the input named `q1_name` is `q1_value`,
    // show the elemented labelled `q2_id`.
    // Otherwise, hide it.
    let target_id = `input[name="${q1_name}"]`;
    let q2_div = $('#' + q2_id);
    q2_div.hide();
    console.log(target_id);
    $(target_id).on('click tap', function(){
        let val = $(target_id + ':checked').val()
        console.log(val);
        if(val == q1_value) {
            q2_div.show();
        } else {
            q2_div.hide();
        };
    });
}

function random_string(){
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

function setup_consent(){
    let box = $('#consent');
    let btn = $('#button_form0')
    box.on('change', function(){
        if(box.is(':checked')){
            btn.prop('disabled', false)
        } else {
            btn.prop('disabled', true)
        }
    })
};
