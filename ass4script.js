const calculatePrice = () => {
    let name = document.getElementById('name').value;
    const startingBid = document.getElementById("startingBid"); 
    let price = Number(startingBid.value);

    if (!name || !price) {
        alert("Please provide both the name and starting bid!");
        return;
    }

    const education = parseFloat(document.getElementById('education').value) || 1;
    const networth = parseFloat(document.getElementById('networth').value) || 1;
    const caste = parseFloat(document.getElementById('caste').value) || 0;

    price *= education;
    price *= networth;
    price += caste;

    const skills = document.querySelectorAll("input[type=checkbox][id=skills]");
    price = getCheckboxValuesFilterReduce(skills, price);

    const age = document.getElementsByName("age");
    price = getRadioValue(age, price);

    const reputations = document.querySelectorAll("input[type=checkbox][id=reputation]");
    price = getCheckboxValuesForLoop(reputations, price);

    const loveLetter = document.getElementById('loveLetter').value;

    let person = {
        groom_name: name,
        groom_price: price,
        love_letter: loveLetter
    };

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>The price for ${person.groom_name} is ${person.groom_price.toFixed(2)}$. Your love letter: "${person.love_letter}"</p>`;
};

// Function for checkbox skills with filter and reduce
const getCheckboxValuesFilterReduce = (html_collection, price) => { 
    let list = Array.from(html_collection).filter(item => item.checked);
    let result = list.reduce((acc, item) => acc + Number(item.value), price);
    return result;
};

// Function for radio age with arrayForeach
const getRadioValue = (node_list, price) => {
    node_list.forEach(item => {
        if (item.checked) {
            price *= Number(item.value);
        }
    });
    return price;
};

// Function for reputation with for loop
const getCheckboxValuesForLoop = (html_collection, price) => {
    for (let i = 0; i < html_collection.length; i++) {
        if (html_collection[i].checked) {
            if (Number.isInteger(Number(html_collection[i].value))) {
                price += Number(html_collection[i].value);
            } else {
                price *= Number(html_collection[i].value);
            }
        }
    }
    return price;
};

// Add event listener to button
document.getElementById('calculateBtn').addEventListener('click', calculatePrice);
