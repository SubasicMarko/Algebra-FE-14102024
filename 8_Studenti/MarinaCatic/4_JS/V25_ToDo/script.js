(function() {

    function ToDo() {

        const input = document.querySelector("#input-text");
        const addButton = document.querySelector("#input-add");
        const list = document.querySelector("ul");
        const allButton = document.querySelector("#button-all");
        const activeButton = document.querySelector("#button-active");
        const completedButton = document.querySelector("#button-completed");
        const clearCompletedButton = document.querySelector("#button-clear-completed");


        function addListItem() {
            let text = input.value;

            if (text.trim().length !== 0) {
                // Kreiraj novi list item
                const newItem = createListItem(text);
                // Dodaj list item
                list.appendChild(newItem);
                input.value = "";
            } else {
                alert("Please enter todo");
            }
        }

        function createListItem(text) {
            const listItem = document.createElement("li");
            const div = document.createElement("div");
            const intDiv = document.createElement("div");
            div.classList.add("li-container");
            intDiv.classList.add("li-container-int");
            intDiv.innerText = text;
            addCheckBox(intDiv);
            div.appendChild(intDiv);
            addRemoveButton(div);
            listItem.appendChild(div);
            return listItem;
        }

        function addCheckBox(element) {
            const checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.addEventListener("click", checkListItem);
            element.insertBefore(checkBox, element.firstChild);
        }

        function addRemoveButton(element) {
            const removeButton = document.createElement("div");
            removeButton.innerText = "X";
            removeButton.className = "removeButton";
            removeButton.addEventListener("click", removeListItem);
            element.appendChild(removeButton);
        }

        function checkListItem(event) {
            const checkBox = event.target;

            if (checkBox.checked) {
                checkBox.parentNode.style.textDecoration = "line-through";
            } else {
                checkBox.parentNode.style.textDecoration = "";
            }
        }

        function removeListItem(event) {
            const removeButton = event.target;
            removeButton.parentNode.parentNode.remove();
        }

        function showAll() {
            const listItems = list.getElementsByTagName("li");

            for (let i = 0; i < listItems.length; i++) {
                listItems[i].style.display = "";
            }

            allButton.disabled = true;
            activeButton.disabled = false;
            completedButton.disabled = false;
        }

        function showActive() {
            const listItems = list.getElementsByTagName("li");

            for (let i = 0; i < listItems.length; i++) {
                const check = listItems[i].getElementsByTagName("input");

                if (check[0].checked) {
                    listItems[i].style.display = "none";
                } else {
                    listItems[i].style.display = "";
                }
            }

            allButton.disabled = false;
            activeButton.disabled = true;
            completedButton.disabled = false;
        }

        function showCompleted() {
            const listItems = list.getElementsByTagName("li");

            for (let i = 0; i < listItems.length; i++) {
                const check = listItems[i].getElementsByTagName("input");

                if (!check[0].checked) {
                    listItems[i].style.display = "none";
                } else {
                    listItems[i].style.display = "";
                }
            }

            allButton.disabled = false;
            activeButton.disabled = false;
            completedButton.disabled = true;
        }

        function clearCompleted() {
            const listItems = list.getElementsByTagName("li");

            for (let i = listItems.length-1; i >= 0; i--) {
                const check = listItems[i].getElementsByTagName("input");
                if (check[0].checked) {
                    listItems[i].remove();
                }
            }
        }

        this.addListeners = function() {
            addButton.addEventListener("click", addListItem);
            allButton.addEventListener("click", showAll);
            activeButton.addEventListener("click", showActive);
            completedButton.addEventListener("click", showCompleted);
            clearCompletedButton.addEventListener("click", clearCompleted);
        }

    }

    ToDo.prototype.init = function() {
        this.addListeners();
    }

    const todo = new ToDo();
    
    window.addEventListener("load", todo.init());

})();