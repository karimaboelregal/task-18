model = {
    items: [
        { "name": "Captain America", "img": "https://www.sideshow.com/storage/product-images/904685/captain-america_marvel_square.jpg", "counter": 0 },
        { "name": "Hulk", "img": "https://www.looper.com/img/gallery/our-hulk-expert-answers-the-worlds-most-difficult-hulk-questions/intro-1611178512.jpg", "counter": 0 },
        { "name": "Ironman", "img": "https://cdn.alza.cz/Foto/ImgGalery/Image/marvel-iron-man-hra-od-electronic-arts-key-art.jpg", "counter": 0 },
    ],
    selected: 0
}


view = {
    render: function () {
        this.clearImages();
        let parent = document.getElementsByClassName("add-image")[0];
        for (let i = 0; i < model.items.length; i++) {
            this.addImage(i, parent);
            if (i == model.selected) {

                let img = document.getElementById("img");
                let name = document.getElementById("name");
                let counter = document.getElementById("counter");
                img.value = model.items[model.selected]["img"];
                name.value = model.items[model.selected]["name"];
                counter.value = model.items[model.selected]["counter"];

                this.changeBottomText(i);
                this.addSelectedImg();
            }
        }
    },
    clearImages: function () {
        $(".add-image").empty();
        $(".counter-name").empty();
    },

    addSelectedImg: function() {
        let selectedParent = document.getElementById("clickable-image");
        selectedParent.src = model.items[model.selected]["img"];


    },

    changeBottomText: function (i) {
        let avengerName = document.createElement("span");
        let clicks = document.createElement("span");
        let parent2 = document.getElementsByClassName("counter-name")[0];
        avengerName.innerHTML = model.items[i]["name"];
        clicks.innerHTML = "Counter: " + model.items[i]["counter"];
        parent2.append(avengerName, clicks);
    },

    addImage: function (i, parent) {
        let img = document.createElement("img");
        img.src = model.items[i]["img"];
        img.className = "img-fluid h-150"
        img.addEventListener("click", function () {
            view.changeImage(i);
        });
        parent.append(img);
    },

    changeImage: function (i) {
        let selectedimg = document.getElementById("clickable-image");
        selectedimg.src = model.items[i]["img"];
        model.selected = i;
        this.render();
        
    },


    toggleAdmin: function() {
        let adminPanel = document.getElementById("admin-panel");
        if (adminPanel.classList.contains("d-none")) {
            adminPanel.classList.remove("d-none");
        } else {
            adminPanel.classList.add("d-none");
        }
        
    },

    applyChanges: function() {
        let img = document.getElementById("img");
        let name = document.getElementById("name");
        let counter = document.getElementById("counter");
        controller.updateData(name.value, img.value, counter.value);
    }


}


controller = {
    init: function () {
        data = this.getData();
        if (data != null) {
            model.items = data;
        } else {
            this.saveData();
        }

        view.render()
        document.getElementById("clickable-image").onclick = this.incrementCounter
        document.getElementById("admin").onclick = view.toggleAdmin
        document.getElementById("apply").onclick = view.applyChanges
    },

    incrementCounter: function () {
        model.items[model.selected]["counter"] = model.items[model.selected]["counter"] + 1;
        controller.saveData();
        view.render();
    },

    updateData: function(name, img, counter) {
        controller.saveData();
        model.items[model.selected]["name"] = name
        model.items[model.selected]["img"] = img
        model.items[model.selected]["counter"] = parseInt(counter)
        view.render()
    },

    getData: function() {
        var existingEntries = JSON.parse(localStorage.getItem("data"));
        return existingEntries
    },
    saveData: function() {
        localStorage.setItem("data", JSON.stringify(model.items));
    }

}


controller.init();