const slider = document.getElementById("sliderRange");
const sliderValue = document.getElementById("passwordLength");
const strengthText = document.getElementById("strengthText");
const strengthBox1 = document.getElementById("strengthBox1");
const strengthBox2 = document.getElementById("strengthBox2");
const strengthBox3 = document.getElementById("strengthBox3");
const strengthBox4 = document.getElementById("strengthBox4");

const generateButton = document.getElementById("generateButton");
const lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
const uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const symbolsCheckbox = document.getElementById("symbolsCheckbox");

const generatedPassword = document.getElementById("generatedPassword");
const copyImage = document.getElementById("copyImage");
const copyText = document.getElementById("copyText");

// Show realtime slider value and password strength.
slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value;
    switch (true) {
        case slider.value <= 6:
            strengthText.textContent = "TOO WEAK!";
            strengthBox1.style.backgroundColor = "var(--clr-red--)";
            strengthBox1.style.border = "2px solid var(--clr-red--)";
            strengthBox2.style.backgroundColor = "transparent";
            strengthBox2.style.border = "2px solid var(--clr-white-75--)";
            strengthBox3.style.backgroundColor = "transparent";
            strengthBox3.style.border = "2px solid var(--clr-white-75--)";
            strengthBox4.style.backgroundColor = "transparent";
            strengthBox4.style.border = "2px solid var(--clr-white-75--)";
            break;
        case slider.value > 6 && slider.value < 10:
            strengthText.textContent = "WEAK";
            strengthBox1.style.backgroundColor = "var(--clr-orange--)";
            strengthBox1.style.border = "2px solid var(--clr-orange--)";
            strengthBox2.style.backgroundColor = "var(--clr-orange--)";
            strengthBox2.style.border = "2px solid var(--clr-orange--)";
            strengthBox3.style.backgroundColor = "transparent";
            strengthBox3.style.border = "2px solid var(--clr-white-75--)";
            strengthBox4.style.backgroundColor = "transparent";
            strengthBox4.style.border = "2px solid var(--clr-white-75--)";
            break;
        case slider.value >= 10 && slider.value < 14:
            strengthText.textContent = "MEDIUM";
            strengthBox1.style.backgroundColor = "var(--clr-yellow--)";
            strengthBox1.style.border = "2px solid var(--clr-yellow--)";
            strengthBox2.style.backgroundColor = "var(--clr-yellow--)";
            strengthBox2.style.border = "2px solid var(--clr-yellow--)";
            strengthBox3.style.backgroundColor = "var(--clr-yellow--)";
            strengthBox3.style.border = "2px solid var(--clr-yellow--)";
            strengthBox4.style.backgroundColor = "transparent";
            strengthBox4.style.border = "2px solid var(--clr-white-75--)";
            break;
        case slider.value >= 14:
            strengthText.textContent = "STRONG";
            strengthBox1.style.backgroundColor = "var(--clr-green--)";
            strengthBox1.style.border = "2px solid var(--clr-green--)";
            strengthBox2.style.backgroundColor = "var(--clr-green--)";
            strengthBox2.style.border = "2px solid var(--clr-green--)";
            strengthBox3.style.backgroundColor = "var(--clr-green--)";
            strengthBox3.style.border = "2px solid var(--clr-green--)";
            strengthBox4.style.backgroundColor = "var(--clr-green--)";
            strengthBox4.style.border = "2px solid var(--clr-green--)";
            break;
    }
});

// Generate password. First store the password length and selected checkboxes in constants then run generatePassword function.
generateButton.addEventListener("click", function () {
    const passwordLength = +slider.value;
    const options = {
        includeLowercase: lowercaseCheckbox.checked,
        includeUppercase: uppercaseCheckbox.checked,
        includeNumbers: numbersCheckbox.checked,
        includeSpecialChars: symbolsCheckbox.checked,
    };

    generatePassword(passwordLength, options);
});

function generatePassword(length, options) {
    let charset = "";

    if (options.includeLowercase) {
        charset += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.includeUppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.includeNumbers) {
        charset += "0123456789";
    }

    if (options.includeSpecialChars) {
        charset += "!@#$%^&*()_-+=<>?";
    }
    if (
        !options.includeLowercase &&
        !options.includeUppercase &&
        !options.includeNumbers &&
        !options.includeSpecialChars
    ) {
        generatedPassword.value = "No options selected";
        generatedPassword.style.color = "#F64A4A"
    } else {
        const charsetLength = charset.length;
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            password += charset[randomIndex];
        }
        generatedPassword.style.color = "#E6E5EA"
        generatedPassword.value = password;
    }
}

// Copy the generated Password.
copyImage.addEventListener("click", function () {
    generatedPassword.select();
    generatedPassword.setSelectionRange(0, 99999);
    document.execCommand("copy");

    copyText.style.display = "block";
    setTimeout(function () {
        copyText.style.display = "none";
        window.getSelection().removeAllRanges();
    }, 500);
});
