document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');
    const resultSection = document.createElement('section');
    resultSection.id = 'result';
    resultSection.style.marginTop = '20px';
    resultSection.style.padding = '20px';
    resultSection.style.backgroundColor = '#f9f9f9';
    resultSection.style.border = '1px solid #ddd';
    resultSection.style.borderRadius = '5px';
    resultSection.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

    // Réponses correctes
    const correctAnswers = {
        q1: 'D',
        q2: 'B',
        q3: 'B',
        q4: 'B',
        q5: 'B',
        q6: 'B',
        q7: 'A',
        q8: 'B',
        q9: 'B',
        q10: 'A',
        q11: 'B',
        q12: 'A',
        q13: 'C',
        q14: 'C',
        q15: 'A',
        q16: 'B',
        q17: 'B',
        q18: 'B',
        q19: 'C',
        q20: 'B',
        // Ajouter les bonnes réponses ici pour chaque question ajoutée
    };

    // Fonction pour valider les réponses
    function validateAnswers() {
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;
        let incorrectQuestions = [];
        let userAnswers = {};

        for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            userAnswers[question] = selectedOption ? selectedOption.value : null;

            if (selectedOption && selectedOption.value === correctAnswer) {
                score++;
            } else {
                incorrectQuestions.push(question);
            }
        }

        return { score, totalQuestions, incorrectQuestions, userAnswers };
    }

    // Fonction pour afficher les résultats
    function displayResults(score, totalQuestions, incorrectQuestions, userAnswers) {
        const noteSur20 = (score / totalQuestions) * 20;
        resultSection.innerHTML = `<h3>Résultats</h3>
                                    <p>Vous avez obtenu ${score}/${totalQuestions} bonnes réponses.</p>
                                    <p>Votre note est : ${noteSur20.toFixed(2)}/20</p>`;

        if (incorrectQuestions.length > 0) {
            resultSection.innerHTML += `<h4>Questions incorrectes :</h4>
                                        <ul>`;
            incorrectQuestions.forEach(question => {
                resultSection.innerHTML += `<li>${question} - Votre réponse : ${userAnswers[question]}, Réponse correcte : ${correctAnswers[question]}</li>`;
            });
            resultSection.innerHTML += `</ul>`;
        }

        form.appendChild(resultSection);
    }

    // Fonction pour valider les champs obligatoires
    function validateRequiredFields() {
        const requiredFields = document.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    // Écouter l'événement de soumission
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        if (!validateRequiredFields()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const { score, totalQuestions, incorrectQuestions, userAnswers } = validateAnswers();

        // Affiche le résultat
        displayResults(score, totalQuestions, incorrectQuestions, userAnswers);

        // Rediriger vers la section des résultats
        window.location.hash = '#result';

        // Optionnel : Réinitialiser le formulaire après la validation
        form.reset();
    });
});
