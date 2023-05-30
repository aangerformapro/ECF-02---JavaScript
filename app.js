

const

    ERROR_MESSAGES = {

        INITIAL: {
            score: '0',
            infos: "En attente de résultats"
        },

        EMPTY: {
            score: 'OOPS',
            infos: '<span style="color: red;">Merci de remplir tous les champs.</span>'
        },

        ZERO: {
            score: 'OOPS',
            infos: '<span style="color: red;">Les champs ne peuvent pas etre inférieurs ou egaux à 0.</span>'
        },



    },


    STATES = [

        [
            x => x < 18.5,
            'Poids insuffisant et pouvant occasionner certains risques pour la santé.'
        ],

        [
            x => x <= 24.9,
            "Poids santé qui n'augmente pas les risques pour la santé."
        ],

        [
            x => x <= 29.9,
            "Excès de poids pouvant occasionner certains risques pour la santé."
        ],

        [
            x => x > 30,
            "Obésité, risque accru de développer certaines maladies."
        ]

    ],

    style = document.createElement('style'),


    inputs = Object.fromEntries(
        [...document.querySelectorAll('input[name]')]
            .map(elem =>
            {

                elem.required = true;
                return [
                    elem.getAttribute('name'),
                    elem
                ];
            }).concat([['button', document.querySelector('#calculateIMC')]])),

    outputs = {
        score: document.querySelector('.resultsScore'),
        infos: document.querySelector('.resultsInformations')
    };

document.head.appendChild(style);

function checkInputs()
{


    let values = [inputs.weight.value, inputs.size.value];

    if (values.some(val => val === ''))
    {
        throw new Error('EMPTY');
    }


    values = values.map(x => JSON.parse(x));


    if (values.some(val => val <= 0))
    {
        throw new Error('ZERO');
    }

    return values;

}


function renderResults(weight, size)
{


    let value = weight / ((size / 100) ^ 2);

    for (let item of STATES)
    {
        let [test, message] = item;

        if (test(value))
        {
            outputs.score.innerHTML = value.toFixed(2);
            outputs.infos.innerHTML = message;
            return;
        }

    }



}


function listenToInputs(e)
{

    try
    {
        if (e.type === 'click')
        {
            e.preventDefault();
        }

        let [weight, size] = checkInputs();
        renderResults(weight, size);

    } catch (err)
    {
        // click/change boutton
        if (['click', 'change'].includes(e.type))
        {
            let item = ERROR_MESSAGES[err.message];

            if (item)
            {
                for (let key in item)
                {
                    outputs[key].innerHTML = item[key];
                }
            }
        }
        //  keyup
        else if (e.type === 'keyup')
        {
            const item = ERROR_MESSAGES.INITIAL;
            [outputs.score.innerHTML, outputs.infos.innerHTML] = [item.score, item.infos];
        }

    }

}

// reactif
for (let input of [inputs.weight, inputs.size])
{
    input.addEventListener('change', listenToInputs);
    input.addEventListener('keyup', listenToInputs);
}

inputs.button.addEventListener('click', listenToInputs);

// override styles

style.innerHTML = `.imcInputs input[type="button"]{
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid transparent;
}
.imcInputs input[type="button"]:active{
    border: 2px solid blue;
}`;
