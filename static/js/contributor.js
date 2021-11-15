// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        application_title: "",
        categories: [],
        subcategories: [],
        application_category: '',
        application_subcategory: '',
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.status_message = function () {
        stat_msgs = [
            "Application under review",
            "Application Rejected",
            "Application Approved, Please prepare your page",
            "Page Active",
            "Suspended",
            "Page Inactive"
        ]
        return "Not a contributor";
    };

    app.get_categories = function () {
        axios.get(get_categories_url, {
            body: 'null',
        }).then(function (response) {
            app.vue.categories = app.enumerate(response.data.rows);
        });
    };

    app.category_set = function () {
        id = -1;
        for (c in app.vue.categories) {
            if (app.vue.categories[c].name == app.vue.application_category) {
                id = app.vue.categories[c].id;
            }
        }
        axios.get(get_subcategories_url, {
            params: {id: id},
        }).then(function (response) {
            app.vue.subcategories = app.enumerate(response.data.rows);
        });
    }

    app.methods = {
        status_message: app.status_message,
        get_categories: app.get_categories,
        category_set: app.category_set,
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        // Do any initializations (e.g. networks calls) here.
        app.get_categories();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
