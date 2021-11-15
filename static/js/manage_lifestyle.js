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
        adding_category: false,
        adding_subcategory: false,
        category_name: "",
        subcategory_name: "",
        categories: [],
        subcategories: [],
        modal_state: "modal",
        category_id: -1,
        adding_subs_idx: -1,
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.toggle_add_cat = function () {
        app.vue.category_name = "";
        app.vue.adding_category = !app.vue.adding_category;
    }

    app.toggle_add_sub = function () {
        app.vue.subcategory_name = "";
        app.vue.adding_subcategory = !app.vue.adding_subcategory;
    }

    app.toggle_modal = function () {
        if (app.vue.modal_state == "modal"){
            app.vue.modal_state = "modal is-active";
        } else {
            app.vue.modal_state = "modal";
        }
    }

    app.get_categories = function () {
        axios.get(get_categories_url, {
            body: 'null',
        }).then(function (response) {
            app.vue.categories = app.enumerate(response.data.rows);
        });
    }

    app.get_subcategories = function (_idx) {
        id = app.vue.categories[_idx].id
        axios.get(get_subcategories_url, {
            params: {id: id},
        }).then(function (response) {
            app.vue.subcategories = app.enumerate(response.data.rows);
        });
    }
    
    app.cancel_delete = function () {
        app.vue.category = -1;
        app.vue.category_name = "";
        app.toggle_modal();
    }

    app.delete_category = function () {
        if (app.vue.category_id == -1) {
            app.toggle_modal();
        }
        category = app.vue.categories[app.vue.category_id];
        axios.post(delete_category_url, {
            id: category.id,
        }).then(function (response) {
            app.get_categories();
            app.vue.category_id = -1;
            app.toggle_modal();
        });
    }

    app.add_category = function () {
        axios.post(add_category_url, {
            name: app.vue.category_name,
        }).then(function (response) {
            app.toggle_add_cat();
            app.get_categories()
        });
    }

    app.add_subcategory = function () {
        id = app.vue.categories[app.vue.adding_subs_idx].id
        axios.post(add_subcategory_url, {
            name: app.vue.subcategory_name,
            cat_id: id
        }).then(function (response) {
            app.toggle_add_sub();
            app.get_subcategories(app.vue.adding_subs_idx);
        });
    }

    app.prep_delete = function (_idx) {
        app.vue.category_id = _idx;
        app.vue.category_name = app.vue.categories[_idx].name;
        app.toggle_modal();
    }

    app.manage_subs = function (_idx) {
        app.vue.adding_subs_idx = _idx;
        app.get_subcategories(_idx);
    }

    app.methods = {
        add_category: app.add_category,
        toggle_add_cat: app.toggle_add_cat,
        toggle_add_sub: app.toggle_add_sub,
        get_categories: app.get_categories,
        delete_category: app.delete_category,
        toggle_modal: app.toggle_modal,
        prep_delete: app.prep_delete,
        cancel_delete: app.cancel_delete,
        manage_subs: app.manage_subs,
        add_subcategory: app.add_subcategory,
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
        app.get_categories()
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
