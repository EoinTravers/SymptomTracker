
import $ from 'jquery';
window.$ = $;
window.other_symptoms = [];

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
                NextStage(form_id);
            })
    $('#other_symptom_submit') // Special rules for this form.
        .on('click',
            function(e){
                e.preventDefault();
                let form_id = $(e.target).attr('form_id');
                prepare_followup('other', 'yes', 'other-followup', 'other-no-followup');
                prepare_followup('other_still', 'no', 'other_still-followup');
                NextStage(form_id, true); // Repeat this stage
            })
    // Hide follow-up questions untill needed.
    setup_consent(); // Disable Begin button until consent given
    prepare_followup('tested', 'yes', 'tested-followup');
    prepare_followup('fever', 'yes', 'fever-followup');
    prepare_followup('fever_still', 'no', 'fever_still-followup');
    prepare_followup('cough', 'yes', 'cough-followup');
    prepare_followup('cough_still', 'no', 'cough_still-followup');
    prepare_followup('other', 'yes', 'other-followup', 'other-no-followup');
    prepare_followup('other_still', 'no', 'other_still-followup');
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
    $('form').trigger('reset');         // Clear the forms.
    $('.active').removeClass('active'); // Clear buttons
    $('form').hide();
    $('#form' + stage).show();
    window.scrollTo(0, 0);
    if(stage == 4){
        let others = window.other_symptoms;
        if(others.length > 0){
            let div = $('#list-of-symptoms').empty();
            others
                .map( function(symptom) {
                    let btn = $(`<button type="button" class="btn btn-secondary">${symptom}</button>`)
                    div.append(btn)
                })
            $('#other-symptoms-added').show()
        }
    }
}

function NextStage(form_id, repeat = false){
    console.log(repeat)
    if (repeat){
        //
    } else {
        window.stage += 1;
    }
    if(form_id == 'form4'){
        let other = $('#other-name').val()
        window.other_symptoms.push(other);
    }
    if(form_id != 'form0'){
        LogResponses(form_id,
                     x => AskStage(window.stage));
    } else{
        AskStage(window.stage)
    };
}

function LogResponses(form_id, callback=false){
    // Log responses to this stage of the form,
    // and show the next one.
    // Form 0 is just instructions, nothing to log.
    console.log('LogResponses: ' + form_id);
    let form = $('#' + form_id);
    let data = serial_array_to_object(form.serializeArray());
    data['session_id'] = window.session_id;
    data['form'] = form_id;
    console.log(data);
    callback();
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



// Utilities
function serial_array_to_object(array){
    // Useful for dealing with serialise form data.
    let out = {};
    $.map(array, function(n, i){
        out[n['name']] = n['value'];
    });
    return(out);
}

function prepare_followup(q1_name, q1_value,
                          id_to_show, id_to_hide){
    // When the value of the input named `q1_name` is `q1_value`,
    // show the elemented labelled `id_to_show`.
    // Otherwise, hide it.
    let target_id = `input[name="${q1_name}"]`;
    let div_to_show = $('#' + id_to_show);
    let div_to_hide = $('#' + id_to_hide);
    div_to_show.hide();
    console.log(target_id);
    $(target_id).on('click tap', function(){
        let val = $(target_id + ':checked').val()
        console.log(val);
        if(val == q1_value) {
            div_to_show.show();
            div_to_hide.hide();
        } else {
            div_to_show.hide();
            div_to_hide.show();
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
    btn.prop('disabled', true)
    box.on('change', function(){
        if(box.is(':checked')){
            btn.prop('disabled', false);
        } else {
            btn.prop('disabled', true);
        }
    })
};
