// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        logged_in:false,
        admin:false,
        adding: false,
        category_name: "",
        categories: [],
        subcategories: [],
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.toggle_add = function () {
        app.vue.category_name = "";
        app.vue.adding = !app.vue.adding;
    }

    app.get_categories = function () {
        axios.get(get_categories_url, {
            body: 'null',
        }).then(function (response) {
            app.vue.categories = app.enumerate(response.data.rows);
        });
    }

    app.get_subcategories = function () {
        id = category_id
        axios.get(get_subcategories_url, {
            params: {id: id},
        }).then(function (response) {
            app.vue.subcategories = app.enumerate(response.data.rows);
            console.log(app.vue.subcategories);
        });
    }

    app.add_category = function () {
        axios.post(add_category_url, {
            name: app.vue.category_name,
        }).then(function (response) {
            app.toggle_add();
            app.get_categories()
        });
    }

    app.get_category_url = function (branch) {
        return base_url+branch;
    }

    app.methods = {
        add_category: app.add_category,
        toggle_add: app.toggle_add,
        get_categories: app.get_categories,
        get_subcategories: app.get_subcategories,
        get_category_url: app.get_category_url,
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        // Do any initializations (e.g. networks calls) here.
        if (check_admin_url != undefined){
            axios.get(check_admin_url).then(function (response) {
                if (response.data.admin == 1){
                    app.vue.admin = true;
                }
            });
        }
        app.get_categories();
        app.get_subcategories();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
